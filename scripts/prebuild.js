const fs = require('fs')
const package = require('../package.json')

let data = package

Object.keys(data.dependencies).map(dep => {
    if(
        dep.startsWith('@types/') ||
        dep.startsWith('@typescript-eslint/') ||
        dep.startsWith('clean')
    ) {
        data.devDependencies = { ...data.devDependencies, [dep]: data.dependencies[dep] }
        delete data.dependencies[dep]
    }
});

data.devDependencies = Object.keys(data.devDependencies).sort().reduce(
    (obj, key) => {
        obj[key] = data.devDependencies[key]
        return obj
    }, {}
)

fs.writeFile('package.json', JSON.stringify(data, null, 2), (err) => {
    if(err) console.log(err)
    else console.log('Prebuild Process Completed')
})