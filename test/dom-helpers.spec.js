'use strict';

const expect = require('chai').expect;
const DomHelpers = require('../lib/dom-helpers');

describe('DomHelpers', function () {

  describe('getAttribute', function () {
    it('should return attribute', function () {
      let element = {attribs: {}};
      element.attribs.test = 'value';

      expect(DomHelpers.getAttribute(element, 'test')).to.equal('value');
      expect(DomHelpers.getAttribute(element, 'tEst')).to.equal('value');
      expect(DomHelpers.getAttribute(element, 'TEST')).to.equal('value');
    });

    it('should return empty string for missing attribute', function () {
      let element = {attribs: {}};
      element.attribs.test = 'value';

      expect(DomHelpers.getAttribute(element, 'test1')).to.equal('');

      element = {};
      expect(DomHelpers.getAttribute(element, 'test1')).to.equal('');
    });
  });

  describe('hasAttribute', function () {
    it('should return true if attribute is present', function () {
      let element = {attribs: {}};
      element.attribs.test = 'value';

      expect(DomHelpers.hasAttribute(element, 'test')).to.be.true;
      expect(DomHelpers.hasAttribute(element, 'tEst')).to.be.true;
      expect(DomHelpers.hasAttribute(element, 'TEST')).to.be.true;
    });

    it('should return false for missing attribute', function () {
      let element = {attribs: {}};
      element.attribs.test = 'value';

      expect(DomHelpers.hasAttribute(element, 'test1')).to.be.false;

      element = {};
      expect(DomHelpers.hasAttribute(element, 'test1')).to.be.false;
    });
  });

});
