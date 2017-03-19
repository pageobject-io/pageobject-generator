'use strict';

const expect = require('chai').expect;
const parse5 = require('parse5');
const select = require('css-select');
const Elements = require('../../lib/element/elements');
const GeneratorContext = require('../../lib/generator-context');
const angularJs = require('../../lib/application-types').angularJs;
const ProtractorConfig = require('../../lib/protractor-config');
const SingleElementLocatorPartGenerator = require('../../lib/locator/single-element-locator-part-generator');
const IdLocatorSource = require('../../lib/locator/protractor/id-locator-source');

describe('Elements', () => {
  it('should recognise buttons', () => {
    expect(Elements.isButton(element('<button id="name1"></button>'))).to.be.true;
    expect(Elements.isButton(element('<input type="button" />'))).to.be.true;
    expect(Elements.isButton(element('<input type="submit" />'))).to.be.true;
    expect(Elements.isButton(element('<a id="name1"></a>'))).to.be.false;
  });

  it('should recognise links', () => {
    expect(Elements.isLink(element('<a id="name1"></a>'))).to.be.true;
    expect(Elements.isLink(element('<button id="name1"></button>'))).to.be.false;
  });

  function element(fragment) {
    let documentFragment = parse5.parseFragment(fragment, {treeAdapter: parse5.treeAdapters.htmlparser2});
    return documentFragment.childNodes[0];
  }

  describe('generateCssSelector', () => {

    it('should generate selector with regular elements', () => {
      let context = getContext('<div>A <div>B <div>C</div></div></div>');
      let document = context.document;

      let divs = select('div', document);
      let divA = divs[0];
      let divB = divs[1];
      let divC = divs[2];

      expect(Elements.generateCssSelector(divA, context)).to.equal('div');
      expect(Elements.generateCssSelector(divB, context)).to.equal('div > div');
      expect(Elements.generateCssSelector(divC, context)).to.equal('div > div > div');
    });

    it('should generate selector with ID', () => {
      let context = getContext('<div><div id="id1">A <div>B <div>C</div></div></div></div>');
      let document = context.document;

      let divs = select('div', document);
      let divA = divs[1];
      let divB = divs[2];
      let divC = divs[3];

      expect(Elements.generateCssSelector(divA, context)).to.equal('#id1');
      expect(Elements.generateCssSelector(divB, context)).to.equal('#id1 > div');
      expect(Elements.generateCssSelector(divC, context)).to.equal('#id1 > div > div');
    });

    it('should generate selector with classes', () => {
      let context = getContext('<div><div class="a b">A <div class="c">B <div>C</div></div></div></div>');
      let document = context.document;

      let divs = select('div', document);
      let divA = divs[1];
      let divB = divs[2];
      let divC = divs[3];

      expect(Elements.generateCssSelector(divA, context)).to.equal('div > div.a.b');
      expect(Elements.generateCssSelector(divB, context)).to.equal('div > div.a.b > div.c');
      expect(Elements.generateCssSelector(divC, context)).to.equal('div > div.a.b > div.c > div');
    });

    it('should generate selector with namespaced elements', () => {
      let context = getContext('<html xmlns:fb="https://www.facebook.com/2008/fbml"><body><fb:comments /></body></html>');
      let document = context.document;

      let comments = select('fb\\:comments', document);

      expect(Elements.generateCssSelector(comments[0], context)).to.equal('body > fb|comments');
    });

    it('should generate selector with multiple children', () => {
      let context = getContext('<div><div>A</div><div>B</div><span></span><div class="a">C</div><div class="a">D</div></div>');
      let document = context.document;

      let divs = select('div', document);
      let divA = divs[1];
      let divB = divs[2];
      let divC = divs[3];
      let divD = divs[4];

      expect(Elements.generateCssSelector(divA, context)).to.equal('div > div:nth-of-type(1)');
      expect(Elements.generateCssSelector(divB, context)).to.equal('div > div:nth-of-type(2)');
      expect(Elements.generateCssSelector(divC, context)).to.equal('div > div.a:nth-of-type(3)');
      expect(Elements.generateCssSelector(divD, context)).to.equal('div > div.a:nth-of-type(4)');
    });

    it('should stop at repeater', () => {
      let context = getContext('<div>A <div ng-repeat="item in items">B <div class="a">C <div>D</div></div></div></div>');
      let document = context.document;

      let divs = select('div', document);
      let divB = divs[1];
      let divC = divs[2];
      let divD = divs[3];

      context.pushNgRepeat(divB, 'item in items');
      context.pushLocatorPartGenerator(new SingleElementLocatorPartGenerator(divC, new IdLocatorSource()));

      expect(Elements.generateCssSelector(divC, context)).to.equal('div.a');
      expect(Elements.generateCssSelector(divD, context)).to.equal('div.a > div');
    });

    it('should not generate selector if nested repeater has similar elements', () => {
      let context = getContext('<div ng-repeat="item in items">A <div class="a">B <div ng-repeat="element in elements">C <div class="a">D</div></div></div></div>');
      let document = context.document;

      let divs = select('div', document);
      let divA = divs[0];
      let divB = divs[1];
      let divC = divs[2];
      let divD = divs[3];

      context.pushNgRepeat(divA, 'item in items');
      context.pushLocatorPartGenerator(new SingleElementLocatorPartGenerator(divC, new IdLocatorSource()));

      expect(Elements.generateCssSelector(divB, context)).to.be.null;

      context.popLocatorPartGenerator();
      context.pushNgRepeat(divC, 'element in elements');
      context.pushLocatorPartGenerator(new SingleElementLocatorPartGenerator(divC, new IdLocatorSource()));

      expect(Elements.generateCssSelector(divD, context)).to.equal('div.a');
    });

    it('should generate selector for fragment', () => {
      let source = '<div>A <div>B <div>C</div></div></div>';
      let documentFragment = parse5.parseFragment(source, {treeAdapter: parse5.treeAdapters.htmlparser2});
      let context = new GeneratorContext(documentFragment, source, angularJs, new ProtractorConfig());

      let divs = select('div', documentFragment);
      let divA = divs[0];
      let divB = divs[1];
      let divC = divs[2];

      expect(Elements.generateCssSelector(divA, context)).to.equal('div');
      expect(Elements.generateCssSelector(divB, context)).to.equal('div > div');
      expect(Elements.generateCssSelector(divC, context)).to.equal('div > div > div');
    });

    it('should not generate anything if preceeding sibling has stop attribute', () => {
      tryStopElement('ng-if');
      tryStopElement('ng-repeat');
      tryStopElement('*ngIf');
      tryStopElement('*ngFor');
    });

    function tryStopElement(attribute) {
      let context = getContext('<div><div>A</div><div ' + attribute + '="a">B</div><div>C</div></div>');
      let document = context.document;

      let divs = select('div', document);
      let divA = divs[1];
      let divB = divs[2];
      let divC = divs[3];

      expect(Elements.generateCssSelector(divA, context)).to.equal('div > div:nth-of-type(1)');
      expect(Elements.generateCssSelector(divB, context)).to.be.null;
      expect(Elements.generateCssSelector(divC, context)).to.be.null;
    }

    function getContext(source) {
      let document = parse5.parse(source, {treeAdapter: parse5.treeAdapters.htmlparser2});
      return new GeneratorContext(document, source, angularJs, new ProtractorConfig());
    }

  });
});