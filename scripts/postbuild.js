const fs = require('fs')
const package = require('../package.json')

let data = package

Object.keys(data.devDependencies).map(dep => {
    if(
        dep.startsWith('@types/') ||
        dep.startsWith('@typescript-eslint/') ||
        dep.startsWith('clean')
    ) {
        data.dependencies = { ...data.dependencies, [dep]: data.devDependencies[dep] };
        delete data.devDependencies[dep]
    }
});

data.dependencies = Object.keys(data.dependencies).sort().reduce(
    (obj, key) => {
        obj[key] = data.dependencies[key]
        return obj
    }, {}
)

fs.writeFile('package.json', JSON.stringify(data, null, 2), (err) => {
    if(err) console.log(err)
    else console.log('Postbuild Process Completed')
})