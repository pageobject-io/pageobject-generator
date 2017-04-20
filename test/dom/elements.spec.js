'use strict';

const expect = require('chai').expect;
const parse5 = require('parse5');
const select = require('css-select');
const Elements = require('../../lib/dom/elements');
const Page = require('../../lib/page/page');
const NG_REPEAT = require('../../lib/types').NG_REPEAT;


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
      let document = getDocument('<div>A <div>B <div>C</div></div></div>');

      let divs = select('div', document);
      let divA = divs[0];
      let divB = divs[1];
      let divC = divs[2];

      let page = new Page(true);
      let elementA = page.addElement(divA);
      let elementB = page.addElement(divB);
      let elementC = page.addElement(divC);

      expect(Elements.generateCssSelector(elementA)).to.equal('div');
      expect(Elements.generateCssSelector(elementB)).to.equal('div > div');
      expect(Elements.generateCssSelector(elementC)).to.equal('div > div > div');
    });

    it('should generate selector with ID', () => {
      let document = getDocument('<div><div id="id1">A <div>B <div>C</div></div></div></div>');

      let divs = select('div', document);
      let divA = divs[1];
      let divB = divs[2];
      let divC = divs[3];

      let page = new Page(true);
      let elementA = page.addElement(divA);
      let elementB = page.addElement(divB);
      let elementC = page.addElement(divC);

      expect(Elements.generateCssSelector(elementA)).to.equal('#id1');
      expect(Elements.generateCssSelector(elementB)).to.equal('#id1 > div');
      expect(Elements.generateCssSelector(elementC)).to.equal('#id1 > div > div');
    });

    it('should generate selector with classes', () => {
      let document = getDocument('<div><div class="a b">A <div class="c">B <div>C</div></div></div></div>');

      let divs = select('div', document);
      let divA = divs[1];
      let divB = divs[2];
      let divC = divs[3];

      let page = new Page(true);
      let elementA = page.addElement(divA);
      let elementB = page.addElement(divB);
      let elementC = page.addElement(divC);

      expect(Elements.generateCssSelector(elementA)).to.equal('div > div.a.b');
      expect(Elements.generateCssSelector(elementB)).to.equal('div > div.a.b > div.c');
      expect(Elements.generateCssSelector(elementC)).to.equal('div > div.a.b > div.c > div');
    });

    it('should generate selector with namespaced elements', () => {
      let document = getDocument('<html xmlns:fb="https://www.facebook.com/2008/fbml"><body><fb:comments /></body></html>');

      let comments = select('fb\\:comments', document);

      let page = new Page(false);
      let element = page.addElement(comments[0]);

      expect(Elements.generateCssSelector(element)).to.equal('body > fb|comments');
    });

    it('should generate selector with multiple children', () => {
      let document = getDocument('<div><div>A</div><div>B</div><span></span><div class="a">C</div><div class="a">D</div></div>');

      let divs = select('div', document);
      let divA = divs[1];
      let divB = divs[2];
      let divC = divs[3];
      let divD = divs[4];

      let page = new Page(true);
      let elementA = page.addElement(divA);
      let elementB = page.addElement(divB);
      let elementC = page.addElement(divC);
      let elementD = page.addElement(divD);

      expect(Elements.generateCssSelector(elementA)).to.equal('div > div:nth-of-type(1)');
      expect(Elements.generateCssSelector(elementB)).to.equal('div > div:nth-of-type(2)');
      expect(Elements.generateCssSelector(elementC)).to.equal('div > div.a:nth-of-type(3)');
      expect(Elements.generateCssSelector(elementD)).to.equal('div > div.a:nth-of-type(4)');
    });

    it('should stop at repeater', () => {
      let document = getDocument('<div>A <div ng-repeat="item in items">B <div class="a">C <div>D</div></div></div></div>');

      let divs = select('div', document);
      let divB = divs[1];
      let divC = divs[2];
      let divD = divs[3];

      let page = new Page(true);
      let elementB = page.addSection(divB);
      elementB.addTypes(NG_REPEAT);
      let elementC = elementB.addElement(divC);
      let elementD = elementB.addElement(divD);

      expect(Elements.generateCssSelector(elementC)).to.equal('div.a');
      expect(Elements.generateCssSelector(elementD)).to.equal('div.a > div');
    });

    it('should not generate selector if nested repeater has similar elements', () => {
      let document = getDocument('<div ng-repeat="item in items">A <div class="a">B <div ng-repeat="element in elements">C <div class="a">D</div></div></div></div>');

      let divs = select('div', document);
      let divA = divs[0];
      let divB = divs[1];
      let divC = divs[2];
      let divD = divs[3];

      let page = new Page(true);
      let elementA = page.addSection(divA);
      elementA.addTypes(NG_REPEAT);
      let elementB = elementA.addElement(divB);
      let elementC = elementA.addSection(divC);
      elementC.addTypes(NG_REPEAT);
      let elementD = elementC.addElement(divD);

      expect(Elements.generateCssSelector(elementB)).to.be.null;
      expect(Elements.generateCssSelector(elementD)).to.equal('div.a');
    });

    it('should generate selector for fragment', () => {
      let source = '<div>A <div>B <div>C</div></div></div>';
      let documentFragment = parse5.parseFragment(source, {treeAdapter: parse5.treeAdapters.htmlparser2});

      let divs = select('div', documentFragment);
      let divA = divs[0];
      let divB = divs[1];
      let divC = divs[2];

      let page = new Page(true);
      let elementA = page.addElement(divA);
      let elementB = page.addElement(divB);
      let elementC = page.addElement(divC);

      expect(Elements.generateCssSelector(elementA)).to.equal('div');
      expect(Elements.generateCssSelector(elementB)).to.equal('div > div');
      expect(Elements.generateCssSelector(elementC)).to.equal('div > div > div');
    });

    it('should not generate anything if preceeding sibling has stop attribute', () => {
      tryStopElement('ng-if');
      tryStopElement('ng-repeat');
      tryStopElement('*ngIf');
      tryStopElement('*ngFor');
    });

    function tryStopElement(attribute) {
      let document = getDocument('<div><div>A</div><div ' + attribute + '="a">B</div><div>C</div></div>');

      let divs = select('div', document);
      let divA = divs[1];
      let divB = divs[2];
      let divC = divs[3];

      let page = new Page(true);
      let elementA = page.addElement(divA);
      let elementB = page.addElement(divB);
      let elementC = page.addElement(divC);

      expect(Elements.generateCssSelector(elementA)).to.equal('div > div:nth-of-type(1)');
      expect(Elements.generateCssSelector(elementB)).to.be.null;
      expect(Elements.generateCssSelector(elementC)).to.be.null;
    }

    function getDocument(source) {
      return parse5.parse(source, {treeAdapter: parse5.treeAdapters.htmlparser2});
    }

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
      return Elements.text(documentFragment.childNodes[0]);
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
      return Elements.ownText(documentFragment.childNodes[0]);
    }
  });

});