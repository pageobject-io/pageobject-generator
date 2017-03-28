var fs = require('fs');
var program = require('commander');

program
    .version(require('../package.json').version, '-v, --version')
    .usage('[command] [options]');