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
fs.writeFileSync("./dist/package.json", JSON.stringify(package,null,2));