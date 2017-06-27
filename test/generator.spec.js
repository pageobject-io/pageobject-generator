'use strict';

const expect = require('chai').expect;
const Generator = require('../lib/generator');
const fs = require('fs');
const eol = require('eol');

describe('Generator', () => {

  it('should generate binding po', () => {
    runTest('binding', 'bindingPageObject');
  });

  it('should generate button po', () => {
    runTest('button', 'buttonPageObject');
  });

  it('should generate checkbox po', () => {
    runTest('checkboxes', 'checkboxPageObject');
  });

  it('should generate css po', () => {
    runTest('css', 'cssPageObject');
  });

  it('should generate date po', () => {
    runTest('date', 'datePageObject');
  });

  it('should generate link po', () => {
    runTest('link', 'linkPageObject');
  });

  it('should generate ng2Component po', () => {
    runTest('ng2Component', 'ng2ComponentPageObject', {appFramework: 'angular'});
  });

  it('should generate ngClick po', () => {
    runTest('ngclick', 'ngClickPageObject');
  });

  it('should generate radio po', () => {
    runTest('radio', 'radioPageObject');
  });

  it('should generate repeater po', () => {
    runTest('repeater', 'repeaterPageObject');
  });

  it('should generate select po', () => {
    runTest('select', 'selectPageObject');
  });

  it('should generate text po', () => {
    runTest('text', 'textPageObject');
  });

  it('should generate textarea po', () => {
    runTest('textarea', 'textareaPageObject');
  });

  function runTest(sourceFile, expectedPageObjectFile, options) {
    let source = fs.readFileSync('./test/fixtures/' + sourceFile + '.html', 'utf8');
    let expectedPageObject = fs.readFileSync('./test/fixtures/' + expectedPageObjectFile + '.po', 'utf8');
    expectedPageObject = eol.crlf(expectedPageObject);

    let generator = new Generator();
    let pageObject = generator.generate(source, options || {});

    expect(pageObject).to.equal(expectedPageObject);
  }
});