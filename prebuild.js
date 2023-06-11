const p1 = require('./dist/portal-main/package.json');
const p2 = require('./dist/websites/package.json');
const _merge = require('lodash/merge');
const fs = require('fs');
const dependenciesMerged = _merge(p1.dependencies, p2.dependencies);
const package = {
    name: "bolsel-portal-web-app",
    dependencies: dependenciesMerged,
    scripts: {
    start: "next start"
  }
}
p1.dependencies = dependenciesMerged;
p2.dependencies = dependenciesMerged;
fs.writeFileSync("./dist/portal-main/package.json", JSON.stringify(p1,null,2));
fs.writeFileSync("./dist/websites/package.json", JSON.stringify(p2,null,2));
fs.writeFileSync("./dist/package.json", JSON.stringify(package,null,2));
fs.copyFileSync('./Dockerfile-app', './dist/portal-main/Dockerfile')
fs.copyFileSync('./.dockerignore', './dist/portal-main/.dockerignore')
fs.copyFileSync('./Dockerfile-app', './dist/websites/Dockerfile')
fs.copyFileSync('./.dockerignore', './dist/websites/.dockerignore')
