const fs = require('fs');
const path = require('path');

const api = new Map();

fs.readdir(path.join(__dirname, '..', 'api'), (err, files) => {
    if (err) console.log(new Error('error'));
    for (const file of files) {
        api[file] = require(`../api/${file}`);
    }
    console.dir(api);
})
