'use strict';

const expect = require('chai').expect;
const fs = require('fs');
const path = require('path');
const ComponentDetailsExtractor = require('../../../lib/angular/component/component-details-extractor');

describe('ComponentDetailsExtractor', () => {

  describe('component name', () => {

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

  });

  describe('component template', () => {

    it('should fail when no component decorator found on class', () => {
      let extractor = new ComponentDetailsExtractor(loadFixture('component-decorator-not-found'), '/path/to/file');
      expect(function() {
        extractor.findComponentTemplate();
      }).to.throw('Cannot extract meta from component. Does this file contain @Component decorator?');
    });

    it('should fail when component decorator has no template', () => {
      let extractor = new ComponentDetailsExtractor(loadFixture('component-decorator-without-template'), '/path/to/file');
      expect(function() {
        extractor.findComponentTemplate();
      }).to.throw('Cannot extract html template from component meta. Is it a valid Angular component?');
    });

    it('should extract html when template meta is provided', () => {
      let extractor = new ComponentDetailsExtractor(loadFixture('component-decorator-with-template-back-tick'), '/path/to/file');
      expect(extractor.findComponentTemplate()).to.equal('<div bsModal #modal="bs-modal" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true"> hello! </div>');

      extractor = new ComponentDetailsExtractor(loadFixture('component-decorator-with-template-single-quote'), '/path/to/file');
      expect(extractor.findComponentTemplate()).to.equal('<div bsModal #modal="bs-modal" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true"> hello! </div>');

      extractor = new ComponentDetailsExtractor(loadFixture('component-decorator-with-template-double-quote'), '/path/to/file');
      expect(extractor.findComponentTemplate()).to.equal('<div bsModal #modal="bs-modal" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true"> hello! </div>');
    });

    it('should extract html when template is not the last meta', () => {
      let extractor = new ComponentDetailsExtractor(loadFixture('component-decorator-with-template-back-tick-meta-order'), '/path/to/file');
      expect(extractor.findComponentTemplate()).to.equal('<div bsModal #modal="bs-modal" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true"> hello! </div>');
    });

    it('should extract html from templateUrl', () => {
      let extractor = new ComponentDetailsExtractor(loadFixture('component-template-from-template-url-single-quote'), path.resolve(__dirname, 'component'));
      expect(extractor.findComponentTemplate()).to.equal('<div bsModal #modal="bs-modal" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true"> hello! </div>');

      extractor = new ComponentDetailsExtractor(loadFixture('component-template-from-template-url-double-quote'), path.resolve(__dirname, 'component'));
      expect(extractor.findComponentTemplate()).to.equal('<div bsModal #modal="bs-modal" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true"> hello! </div>');

      extractor = new ComponentDetailsExtractor(loadFixture('component-template-from-template-url-back-tick'), path.resolve(__dirname, 'component'));
      expect(extractor.findComponentTemplate()).to.equal('<div bsModal #modal="bs-modal" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true"> hello! </div>');
    });

  });

  function loadFixture(sourceFile) {
    return fs.readFileSync('./test/angular/component/' + sourceFile + '.fixture', 'utf8');
  }

});