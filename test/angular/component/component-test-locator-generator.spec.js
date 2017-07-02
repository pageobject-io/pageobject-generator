'use strict';

const expect = require('chai').expect;
const parse5 = require('parse5');
const select = require('css-select');
const NativeCssLocatorStrategy = require('../../../lib/angular/angular/locator/native-css-locator-strategy');
const ComponentTestLocatorGenerator = require('../../../lib/angular/angular/component-test-locator-generator');
const Page = require('../../../lib/page/page');
const NG_FOR = require('../../../lib/types').NG_FOR;
const RADIO = require('../../../lib/types').RADIO;

describe('ComponentTestLocatorGenerator', () => {

  const locatorStrategies = [new NativeCssLocatorStrategy()];

  it('should generate locator for single regular element', () => {
    let document = getDocument('<div id="id"></div>');

    let divs = select('div', document);
    let div = divs[0];

    let page = new Page(true);
    let element = page.addElement(div);

    let generator = new ComponentTestLocatorGenerator(locatorStrategies);
    let locator = generator.generate(element);

    expect(locator.selector).to.equal('this.debugElement.nativeElement.querySelector(\'#id\')');
    expect(locator.strategy).to.be.an.instanceof(NativeCssLocatorStrategy);
  });

  it('should generate locator for single ngFor element', () => {
    let document = getDocument('<div *ngFor="item of items"></div>');

    let divs = select('div', document);
    let div = divs[0];

    let page = new Page(true);
    let element = page.addElement(div);
    element.addTypes(NG_FOR);

    let generator = new ComponentTestLocatorGenerator(locatorStrategies);
    let locator = generator.generate(element);

    expect(locator.selector).to.equal('this.debugElement.nativeElement.querySelectorAll(\'div\')');
    expect(locator.strategy).to.be.an.instanceof(NativeCssLocatorStrategy);
  });

  it('should generate locator for single radio element', () => {
    let document = getDocument('<input class="color" type="radio" [(ngModel)]="color" value="red"/>');

    let inputs = select('input', document);
    let input = inputs[0];

    let page = new Page(true);
    let element = page.addElement(input);
    element.addTypes(RADIO);

    let generator = new ComponentTestLocatorGenerator(locatorStrategies);
    let locator = generator.generate(element);

    expect(locator.selector).to.equal('this.debugElement.nativeElement.querySelectorAll(\'input.color\')');
    expect(locator.strategy).to.be.an.instanceof(NativeCssLocatorStrategy);
  });

  it('should generate locator for nested regular element in ngFor', () => {
    let document = getDocument('<div *ngFor="item of items"><div id="id"></div></div>');

    let divs = select('div', document);
    let div0 = divs[0];
    let div1 = divs[1];

    let page = new Page(true);
    let section = page.addSection(div0);
    section.name = 'items';
    section.addTypes(NG_FOR);

    let element = section.addElement(div1);

    let generator = new ComponentTestLocatorGenerator(locatorStrategies);
    let locator = generator.generate(element);

    expect(locator.selector).to.equal('this.items[rowIndex1].querySelector(\'#id\')');
    expect(locator.strategy).to.be.an.instanceof(NativeCssLocatorStrategy);
  });

  it('should generate locator for nested ngFor element', () => {
    let document = getDocument('<div *ngFor="item of items"><div class="nestedFor" *ngFor="element of elements"></div></div>');

    let divs = select('div', document);
    let div0 = divs[0];
    let div1 = divs[1];

    let page = new Page(true);
    let section = page.addSection(div0);
    section.name = 'items';
    section.addTypes(NG_FOR);

    let element = section.addElement(div1);
    element.addTypes(NG_FOR);

    let generator = new ComponentTestLocatorGenerator(locatorStrategies);
    let locator = generator.generate(element);

    expect(locator.selector).to.equal('this.items[rowIndex1].querySelectorAll(\'div.nestedFor\')');
    expect(locator.strategy).to.be.an.instanceof(NativeCssLocatorStrategy);
  });

  it('should generate locator for nested radio element in ngFor', () => {
    let document = getDocument('<div *ngFor="item of items"><input type="radio" ng-model="color" value="red"/></div>');

    let divs = select('div', document);
    let div0 = divs[0];
    let inputs = select('input', document);
    let input = inputs[0];

    let page = new Page(true);
    let section = page.addSection(div0);
    section.name = 'items';
    section.addTypes(NG_FOR);

    let element = section.addElement(input);
    element.addTypes(RADIO);

    let generator = new ComponentTestLocatorGenerator(locatorStrategies);
    let locator = generator.generate(element);

    expect(locator.selector).to.equal('this.items[rowIndex1].querySelectorAll(\'input\')');
    expect(locator.strategy).to.be.an.instanceof(NativeCssLocatorStrategy);
  });

  it('should generate locator for deeply nested regular element in ngFor', () => {
    let document = getDocument(
      '<div class="items" *ngFor="item of items"><div class="elements" *ngFor="element of elements">' +
      '<div class="pieces" *ngFor="piece of pieces"><div id="id"></div></div></div></div>');

    let divs = select('div', document);
    let div0 = divs[0];
    let div1 = divs[1];
    let div2 = divs[2];
    let div3 = divs[3];

    let page = new Page(true);
    let section0 = page.addSection(div0);
    section0.name = 'items';
    section0.addTypes(NG_FOR);

    let section1 = section0.addSection(div1);
    section1.name = 'elements';
    section1.addTypes(NG_FOR);

    let section2 = section1.addSection(div2);
    section2.name = 'pieces';
    section2.addTypes(NG_FOR);

    let element = section2.addElement(div3);

    let generator = new ComponentTestLocatorGenerator(locatorStrategies);
    let locator = generator.generate(element);

    expect(locator.selector)
      .to
      .equal(
        'this.items[rowIndex1].querySelectorAll(\'div.elements\')[rowIndex2].querySelectorAll(\'div.pieces\')[rowIndex3].querySelector(\'#id\')');
    expect(locator.strategy).to.be.an.instanceof(NativeCssLocatorStrategy);
  });

  it('should not use same locator twice', () => {
    let document = getDocument('<input type="text" name="name"><input type="text" name="name">');

    let inputs = select('input', document);
    let input1 = inputs[0];
    let input2 = inputs[1];

    let page = new Page(true);
    let element1 = page.addElement(input1);
    let element2 = page.addElement(input2);

    let generator = new ComponentTestLocatorGenerator(locatorStrategies);
    let locator = generator.generate(element1);

    expect(locator.selector).to.equal('this.debugElement.nativeElement.querySelector(\'input\')');
    expect(locator.strategy).to.be.an.instanceof(NativeCssLocatorStrategy);

    locator = generator.generate(element2);

    expect(locator).to.be.null;
  });

  it('should return null if it cannot find a locator for a single element', () => {
    let document = getDocument('<div><div *ngFor="a">A</div><div>B</div></div>');

    let divs = select('div', document);
    let divB = divs[2];

    let page = new Page(true);
    let element = page.addElement(divB);

    let generator = new ComponentTestLocatorGenerator(locatorStrategies);
    let locator = generator.generate(element);

    expect(locator).to.be.null;
  });

  it('should return null if it cannot find a locator for first part', () => {
    let document = getDocument('<div *ngFor="item of items"><div class="a"></div></div>');

    let divs = select('div', document);
    let div1 = divs[0];
    let div2 = divs[1];

    let page = new Page(true);

    let section = page.addSection(div1);
    section.addTypes(NG_FOR);

    let element = section.addElement(div2);

    let generator = new ComponentTestLocatorGenerator(locatorStrategies);
    let locator = generator.generate(element);
    locator = generator.generate(element);

    expect(locator).to.be.null;
  });

  it('should return null if it cannot find a locator for middle part', () => {
    // generate once to use up the locator for elements
    let document1 = getDocument(
      '<div *ngFor="element of elements"><div class="a"></div></div>');

    let divs = select('div', document1);
    let div1 = divs[0];
    let div2 = divs[1];

    let page = new Page(true);

    let section = page.addSection(div1);
    section.addTypes(NG_FOR);

    let element = section.addElement(div2);

    let generator = new ComponentTestLocatorGenerator(locatorStrategies);
    let locator = generator.generate(element);

    let document2 = getDocument(
      '<div *ngFor="item of items"><div *ngFor="element of elements"><div class="a"></div></div></div>');

    divs = select('div', document2);
    div1 = divs[0];
    div2 = divs[1];
    let div3 = divs[2];

    page = new Page(true);

    let section1 = page.addSection(div1);
    section1.addTypes(NG_FOR);

    let section2 = section1.addSection(div2);
    section2.addTypes(NG_FOR);

    element = section2.addElement(div3);

    locator = generator.generate(element);

    expect(locator).to.be.null;
  });

  it('should return null if it cannot find a locator for last part', () => {
    let document = getDocument('<div class="a"></div><div *ngFor="item of items"><div class="a"></div></div>');

    let divs = select('div', document);
    let div1 = divs[0];
    let div2 = divs[1];
    let div3 = divs[2];

    let page = new Page(true);

    let outerElement = page.addElement(div1);

    let section = page.addSection(div2);
    section.addTypes(NG_FOR);

    let innerElement = section.addElement(div3);

    let generator = new ComponentTestLocatorGenerator(locatorStrategies);
    let locator = generator.generate(outerElement);
    locator = generator.generate(innerElement);

    expect(locator).to.be.null;
  });

  function getDocument(source) {
    return parse5.parse(source, {treeAdapter: parse5.treeAdapters.htmlparser2});
  }
});