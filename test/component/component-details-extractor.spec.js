'use strict';

const expect = require('chai').expect;
const fs = require('fs');
const ComponentDetailsExtractor = require('../../lib/component/component-details-extractor');

describe('ComponentDetailsExtractor', () => {

  it('should extract component name when class extending other class and implements interface', () => {
    let extractor = new ComponentDetailsExtractor(loadFixture('component-with-exports-and-implements'), '/path/to/file');
    expect(extractor.getComponentName()).to.equal('TestModalComponent');
  });

  it('should extract component name when class extending other class', () => {
    let extractor = new ComponentDetailsExtractor(loadFixture('component-with-export'), '/path/to/file');
    expect(extractor.getComponentName()).to.equal('TestModalComponent');
  });

  it('should extract component name when class implements interface', () => {
    let extractor = new ComponentDetailsExtractor(loadFixture('component-with-implements'), '/path/to/file');
    expect(extractor.getComponentName()).to.equal('TestModalComponent');
  });

  it('should extract component name without parent class or interface', () => {
    let extractor = new ComponentDetailsExtractor(loadFixture('component-name-simple'), '/path/to/file');
    expect(extractor.getComponentName()).to.equal('TestModalComponent');
  });

  it('should extract component name when class body starts in a new line', () => {
    let extractor = new ComponentDetailsExtractor(loadFixture('component-name-new-line-style'), '/path/to/file');
    expect(extractor.getComponentName()).to.equal('TestModalComponent');
  });

  it('should not extract component name when class is invalid', () => {
    let extractor = new ComponentDetailsExtractor(loadFixture('component-name-invalid'), '/path/to/file');
    expect(function() {
      extractor.getComponentName();
    }).to.throw('Cannot find component name in typescript source. Is it really a typescript file?');
  });

  function loadFixture(sourceFile) {
    return fs.readFileSync('./test/component/' + sourceFile + '.fixture', 'utf8');
  }

});