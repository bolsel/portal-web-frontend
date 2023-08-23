import {
  addProjectConfiguration,
  formatFiles,
  generateFiles,
  Tree,
} from '@nx/devkit';
import * as path from 'path';
import { DockerGeneratorSchema } from './schema';

export async function dockerGenerator(
  tree: Tree,
  options: DockerGeneratorSchema
) {
  const projectRoot = `libs/${options.path}`;
  // addProjectConfiguration(tree, options.name, {
  //   root: projectRoot,
  //   projectType: 'library',
  //   sourceRoot: `${projectRoot}/src`,
  //   targets: {},
  // });
  generateFiles(tree, path.join(__dirname, 'files'), options.path, {
    ...options,
    IMAGE: options.imageName,
    IMAGE_BASE: options.imageNameBase
      ? options.imageNameBase
      : `${options.imageName}-base`,
  });
  await formatFiles(tree);
}

export default dockerGenerator;
