'use strict';

const expect = require('chai').expect;
const DomHelpers = require('../lib/dom-helpers');
const parse5 = require('parse5');

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

  describe('text', function () {
    it('should return text for simple element', () => {
      expect(text('<p>text</p>')).to.equal('text');
    });

    it('should return children text', () => {
      expect(text('<div>text<b>not mine</b><p>other child<p>nested</p></p> own</div>')).to.equal('textnot mine other child nested own');
    });

    it('should ignore comments', () => {
      expect(text('<p>text<!--not mine --> own</p>')).to.equal('text own');
    });

    it('should handle brs', () => {
      expect(text('<p>text<br>multi<br /> line</p>')).to.equal('text multi line');
    });

    it('should handle whitespaces', () => {
      expect(text(`<p>text
            <br>multi    line</p>`)).to.equal('text multi line');
    });

    function text(fragment) {
      let documentFragment = parse5.parseFragment(fragment, {treeAdapter: parse5.treeAdapters.htmlparser2});
      return DomHelpers.text(documentFragment.childNodes[0]);
    }
  });

  describe('ownText', function () {
    it('should return text for simple element', () => {
      expect(ownText('<p>text</p>')).to.equal('text');
    });

    it('should only return own text', () => {
      expect(ownText('<p>text<b>not mine</b> own</p>')).to.equal('text own');
    });

    it('should ignore comments', () => {
      expect(ownText('<p>text<!--not mine --> own</p>')).to.equal('text own');
    });

    it('should handle brs', () => {
      expect(ownText('<p>text<br>multi<br /> line</p>')).to.equal('text multi line');
    });

    it('should handle whitespaces', () => {
      expect(ownText(`<p>text
            <br>multi    line</p>`)).to.equal('text multi line');
    });

    function ownText(fragment) {
      let documentFragment = parse5.parseFragment(fragment, {treeAdapter: parse5.treeAdapters.htmlparser2});
      return DomHelpers.ownText(documentFragment.childNodes[0]);
    }
  });

});
