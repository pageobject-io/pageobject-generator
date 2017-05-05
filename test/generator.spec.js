'use strict';

const expect = require('chai').expect;
const Generator = require('../lib/generator');
const fs = require('fs');
const eol = require('eol');

describe('Generator', () => {
    it('should generate', () => {
      runTest('binding', 'bindingPageObject');
    });

    function runTest(sourceFile, expectedPageObjectFile) {
      let source = fs.readFileSync('./test/fixtures/' + sourceFile + '.html', 'utf8');
      let expectedPageObject = fs.readFileSync('./test/fixtures/' + expectedPageObjectFile + '.po', 'utf8');
      expectedPageObject = eol.crlf(expectedPageObject);

      let generator = new Generator();
      let pageObject = generator.generate(source);
      
      expect(pageObject).to.equal(expectedPageObject);
    }
});