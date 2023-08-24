import { BuildAppImageExecutorSchema } from './schema';
import { ExecutorContext, runExecutor, writeJsonFile } from '@nx/devkit';
import * as path from 'path';
import * as fs from 'fs';
import { merge } from 'lodash';
import * as execa from 'execa';
import * as crypto from 'crypto';

export default async function ciBuildExecutor(
  options: BuildAppImageExecutorSchema,
  context: ExecutorContext
) {
  const appName = context.projectName;
  const pluginPath = path.join(path.dirname(__dirname), '..', '..');
  const distBuildPath = path.join('dist', `build/${appName}`);
  const distBuildAppPath = path.join(distBuildPath, 'app');
  const distBuildBasePath = path.join(distBuildPath, 'base');
  const appImageName = `bolsel/portalweb-${appName}-app`;
  const appImageNameBase = `${appImageName}-base`;
  execa.commandSync(
    `yarn nx g @portalweb/plugin:docker --path=${distBuildPath} --imageName=${appImageName} --imageNameBase=${appImageNameBase} ${appName}`,
    {
      stdio: ['inherit', 'inherit', 'inherit'],
    }
  );
  await runExecutor(
    { project: appName, target: 'build' },
    { outputPath: distBuildAppPath },
    context
  );

  const packageJson = await import(`${distBuildAppPath}/package.json`);

  const base_package_json = merge(packageJson, {
    name: `portalweb-${appName}-base`,
    license: 'MIT',
    dependencies: {
      '@newrelic/next': '^0.5.1',
      newrelic: '^10.3.1',
    },
    scripts: {
      start: 'next start',
    },
  });
  writeJsonFile(`${distBuildBasePath}/package.json`, base_package_json);

  let buildIdBaseLast = '';
  if (fs.existsSync(`${distBuildBasePath}/BUILD_ID`)) {
    buildIdBaseLast = fs
      .readFileSync(`${distBuildBasePath}/BUILD_ID`)
      .toString();
  }
  const buildIdBaseCurrent = crypto
    .createHash('md5')
    .update(fs.readFileSync(`${distBuildBasePath}/package.json`))
    .digest('hex');
  if (buildIdBaseLast !== buildIdBaseCurrent) {
    // build base image
    execa.commandSync(`docker build -t ${appImageNameBase} .`, {
      cwd: distBuildBasePath,
      stdio: ['inherit', 'inherit', 'inherit'],
    });

    // push base image
    if (options.push) {
      execa.commandSync(`docker push ${appImageNameBase}`, {
        stdio: ['inherit', 'inherit', 'inherit'],
      });
    }
    // save build id
    fs.writeFileSync(`${distBuildBasePath}/BUILD_ID`, buildIdBaseCurrent);
  }

  // build app image
  execa.commandSync(`docker build -t ${appImageName} .`, {
    cwd: distBuildAppPath,
    stdio: ['inherit', 'inherit', 'inherit'],
  });
  if (options.push) {
    execa.commandSync(`docker push ${appImageName}`, {
      stdio: ['inherit', 'inherit', 'inherit'],
    });
  }
  return {
    success: true,
  };
}
