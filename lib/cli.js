const fs = require('fs');
const program = require('commander');
const Generator = require('./generator');

program
    .option('-p --path <path>', 'home directory of the UI elements')
    .option('-c --config <config>', 'pageobject.io config file')

    .parse(process.argv);

let generator = new Generator();
console.log(generator.generate(program.path, { testFramework: 'angular-component-test' }));
