var fs = require('fs');
var program = require('commander');

program
    .option('-p --path <path>', 'home directory of the UI elements')
    .option('-c --config <config>', 'pageobject.io config file')

    .parse(process.argv);


config = require(program.config);
console.log(config);

console.log(fs.readdirSync(program.path));
