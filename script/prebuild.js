const fs = require('fs')
const package = require('../package.json')

let data = package

Object.keys(data.dependencies).map(dep => {
    if(dep.startsWith('@types/')) {
        data.devDependencies = { ...data.devDependencies, [dep]: data.dependencies[dep] };
        delete data.dependencies[dep]
    }
});

fs.writeFile('package.json', JSON.stringify(data, null, 2), (err) => {
    if(err) console.log(err)
    else console.log('Parsing Complete')
})