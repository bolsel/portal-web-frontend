const _merge = require('lodash/merge');
const fs = require('fs');
const crypto = require('crypto');
const DIST_PATH = './dist';
// apps dir
const APPS = ['main', 'websites'];
const CURRENT_BUILD_IDS = {};
const PREV_BUILD_IDS = {
    _base: ''
};
const apps_packages_json = {};
const base_package_json = {
    name: "bolsel-portal-web-app",
    dependencies: {},
    scripts: {
    start: "next start"
  }
}
APPS.forEach((app)=>{
    apps_packages_json[app] = require(`${DIST_PATH}/${app}/package.json`);
    base_package_json.dependencies = _merge(base_package_json.dependencies, apps_packages_json[app].dependencies);
    fs.copyFileSync('./_docker/app/Dockerfile', `${DIST_PATH}/${app}/Dockerfile`);
    fs.copyFileSync('./_docker/app/.dockerignore', `${DIST_PATH}/${app}/.dockerignore`);
    CURRENT_BUILD_IDS[app] = fs.readFileSync(`${DIST_PATH}/${app}/.next/BUILD_ID`).toString();
});

// write base package.json
fs.writeFileSync(`${DIST_PATH}/package.json`, JSON.stringify(base_package_json,null,2));
fs.copyFileSync('./_docker/base/Dockerfile', `${DIST_PATH}/Dockerfile`);

CURRENT_BUILD_IDS['_base'] = crypto.createHash("md5").update(fs.readFileSync(`${DIST_PATH}/package.json`)).digest("hex");
const CURRENT_BUILD_IDS_ORDERED = Object.keys(CURRENT_BUILD_IDS).sort().reduce(
    (obj, key) => { 
      obj[key] = CURRENT_BUILD_IDS[key]; 
      return obj;
    }, 
    {}
  );

// read build ids
for(let i in CURRENT_BUILD_IDS_ORDERED){
    const _build_id_file = `${DIST_PATH}/__BUILD_ID_${i.toUpperCase()}`
    if(fs.existsSync(_build_id_file)){
        PREV_BUILD_IDS[i] = fs.readFileSync( _build_id_file).toString();
    }else{
        PREV_BUILD_IDS[i] = '';
    }
    // write current build_id to file
    fs.writeFileSync(`${_build_id_file}`, CURRENT_BUILD_IDS[i]);
}
const _include_to_build = [];
for(let i in PREV_BUILD_IDS){
    const _prev_build_id = PREV_BUILD_IDS[i];
    if(CURRENT_BUILD_IDS[i] !== _prev_build_id){
        const context = i === '_base' ? '.' : `./${i}`;
        const image = i === '_base' ? 'bolsel/portal-web-base' : `bolsel/portal-web-${i}-app`
        _include_to_build.push({
            id: i,
            context,
            image
        })
    }
}
const matrix = {
    include: _include_to_build
}
console.log(JSON.stringify(matrix))