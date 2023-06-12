const p1 = require('./dist/main/package.json');
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
fs.writeFileSync("./dist/main/package.json", JSON.stringify(p1,null,2));
fs.writeFileSync("./dist/websites/package.json", JSON.stringify(p2,null,2));
fs.writeFileSync("./dist/package.json", JSON.stringify(package,null,2));
fs.copyFileSync('./Dockerfile-app', './dist/main/Dockerfile')
fs.copyFileSync('./.dockerignore', './dist/main/.dockerignore')
fs.copyFileSync('./Dockerfile-app', './dist/websites/Dockerfile')
fs.copyFileSync('./.dockerignore', './dist/websites/.dockerignore')
const crypto = require("crypto");
const buff = fs.readFileSync("./dist/package.json");
const hashPackage = crypto.createHash("sha256").update(buff).digest("hex");
fs.writeFileSync("./dist/package.json.sha256", hashPackage);
