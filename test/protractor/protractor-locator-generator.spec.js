'use strict';

const expect = require('chai').expect;
const parse5 = require('parse5');
const select = require('css-select');
const ButtonTextLocatorStrategy = require('../../lib/protractor/locator/button-text-locator-strategy');
const CssLocatorStrategy = require('../../lib/protractor/locator/css-locator-strategy');
const ExpressionTextLocatorStrategy = require('../../lib/protractor/locator/expression-text-locator-strategy');
const IdLocatorStrategy = require('../../lib/protractor/locator/id-locator-strategy');
const LinkTextLocatorStrategy = require('../../lib/protractor/locator/link-text-locator-strategy');
const NameLocatorStrategy = require('../../lib/protractor/locator/name-locator-strategy');
const NgBindHtmlLocatorStrategy = require('../../lib/protractor/locator/ng-bind-html-locator-strategy');
const NgBindLocatorStrategy = require('../../lib/protractor/locator/ng-bind-locator-strategy');
const NgBindTemplateLocatorStrategy = require('../../lib/protractor/locator/ng-bind-template-locator-strategy');
const NgModelLocatorStrategy = require('../../lib/protractor/locator/ng-model-locator-strategy');
const NgOptionsLocatorStrategy = require('../../lib/protractor/locator/ng-options-locator-strategy');
const NgRepeatLocatorStrategy = require('../../lib/protractor/locator/ng-repeat-locator-strategy');
const ProtractorLocatorGenerator = require('../../lib/protractor/protractor-locator-generator');
const Page = require('../../lib/page/page');
const NG_FOR = require('../../lib/types').NG_FOR;
const NG_REPEAT = require('../../lib/types').NG_REPEAT;
const RADIO = require('../../lib/types').RADIO;

describe('ProtractorLocatorGenerator', () => {

  const locatorStrategies = [new NgRepeatLocatorStrategy(),
                             new NgOptionsLocatorStrategy(),
                             new IdLocatorStrategy(),
                             new NameLocatorStrategy(),
                             new NgModelLocatorStrategy(),
                             new NgBindLocatorStrategy(),
                             new NgBindHtmlLocatorStrategy(),
                             new NgBindTemplateLocatorStrategy(),
                             new ExpressionTextLocatorStrategy(),
                             new ButtonTextLocatorStrategy(),
                             new LinkTextLocatorStrategy(),
                             new CssLocatorStrategy()];

  it('should generate locator for single regular element', () => {
    let document = getDocument('<div id="id"></div>');

    let divs = select('div', document);
    let div = divs[0];

    let page = new Page(true);
    let element = page.addElement(div);

    let generator = new ProtractorLocatorGenerator(locatorStrategies);
    let locator = generator.generate(element);

    expect(locator.selector).to.equal('element(by.id(\'id\'))');
    expect(locator.strategy).to.be.an.instanceof(IdLocatorStrategy);
  });

  it('should generate locator for single ng-repeat element', () => {
    let document = getDocument('<div ng-repeat="item in items"></div>');

    let divs = select('div', document);
    let div = divs[0];

    let page = new Page(true);
    let element = page.addElement(div);
    element.addTypes(NG_REPEAT);

    let generator = new ProtractorLocatorGenerator(locatorStrategies);
    let locator = generator.generate(element);

    expect(locator.selector).to.equal('element.all(by.exactRepeater(\'item in items\'))');
    expect(locator.strategy).to.be.an.instanceof(NgRepeatLocatorStrategy);
  });

  it('should generate locator for single ngFor element', () => {
    let document = getDocument('<div *ngFor="item of items"></div>');

    let divs = select('div', document);
    let div = divs[0];

    let page = new Page(true);
    let element = page.addElement(div);
    element.addTypes(NG_FOR);

    let generator = new ProtractorLocatorGenerator(locatorStrategies);
    let locator = generator.generate(element);

    expect(locator.selector).to.equal('element.all(by.css(\'div\'))');
    expect(locator.strategy).to.be.an.instanceof(CssLocatorStrategy);
  });

  it('should generate locator for single radio element', () => {
    let document = getDocument('<input type="radio" ng-model="color" value="red"/>');

    let inputs = select('input', document);
    let input = inputs[0];

    let page = new Page(true);
    let element = page.addElement(input);
    element.addTypes(RADIO);

    let generator = new ProtractorLocatorGenerator(locatorStrategies);
    let locator = generator.generate(element);

    expect(locator.selector).to.equal('element.all(by.model(\'color\'))');
    expect(locator.strategy).to.be.an.instanceof(NgModelLocatorStrategy);
  });

  it('should generate locator for nested regular element in ng-repeat', () => {
    let document = getDocument('<div ng-repeat="item in items"><div id="id"></div></div>');

    let divs = select('div', document);
    let div0 = divs[0];
    let div1 = divs[1];

    let page = new Page(true);
    let section = page.addSection(div0);
    section.name = 'items';
    section.addTypes(NG_REPEAT);

    let element = section.addElement(div1);

    let generator = new ProtractorLocatorGenerator(locatorStrategies);
    let locator = generator.generate(element);

    expect(locator.selector).to.equal('this.items.get(rowIndex1).element(by.id(\'id\'))');
    expect(locator.strategy).to.be.an.instanceof(IdLocatorStrategy);
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

    let generator = new ProtractorLocatorGenerator(locatorStrategies);
    let locator = generator.generate(element);

    expect(locator.selector).to.equal('this.items.get(rowIndex1).element(by.id(\'id\'))');
    expect(locator.strategy).to.be.an.instanceof(IdLocatorStrategy);
  });

  it('should generate locator for nested ng-repeat element', () => {
    let document = getDocument('<div ng-repeat="item in items"><div ng-repeat="element in elements"></div></div>');

    let divs = select('div', document);
    let div0 = divs[0];
    let div1 = divs[1];

    let page = new Page(true);
    let section = page.addSection(div0);
    section.name = 'items';
    section.addTypes(NG_REPEAT);

    let element = section.addElement(div1);
    element.addTypes(NG_REPEAT);

    let generator = new ProtractorLocatorGenerator(locatorStrategies);
    let locator = generator.generate(element);

    expect(locator.selector).to.equal('this.items.get(rowIndex1).all(by.exactRepeater(\'element in elements\'))');
    expect(locator.strategy).to.be.an.instanceof(NgRepeatLocatorStrategy);
  });

  it('should generate locator for nested ngFor element', () => {
    let document = getDocument('<div *ngFor="item of items"><div *ngFor="element of elements"></div></div>');

    let divs = select('div', document);
    let div0 = divs[0];
    let div1 = divs[1];

    let page = new Page(true);
    let section = page.addSection(div0);
    section.name = 'items';
    section.addTypes(NG_FOR);

    let element = section.addElement(div1);
    element.addTypes(NG_FOR);

    let generator = new ProtractorLocatorGenerator(locatorStrategies);
    let locator = generator.generate(element);

    expect(locator.selector).to.equal('this.items.get(rowIndex1).all(by.css(\'div\'))');
    expect(locator.strategy).to.be.an.instanceof(CssLocatorStrategy);
  });

  it('should generate locator for nested radio element in ng-repeat', () => {
    let document = getDocument('<div ng-repeat="item in items"><input type="radio" ng-model="color" value="red"/></div>');

    let divs = select('div', document);
    let div0 = divs[0];
    let inputs = select('input', document);
    let input = inputs[0];

    let page = new Page(true);
    let section = page.addSection(div0);
    section.name = 'items';
    section.addTypes(NG_REPEAT);

    let element = section.addElement(input);
    element.addTypes(RADIO);

    let generator = new ProtractorLocatorGenerator(locatorStrategies);
    let locator = generator.generate(element);

    expect(locator.selector).to.equal('this.items.get(rowIndex1).all(by.model(\'color\'))');
    expect(locator.strategy).to.be.an.instanceof(NgModelLocatorStrategy);
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

    let generator = new ProtractorLocatorGenerator(locatorStrategies);
    let locator = generator.generate(element);

    expect(locator.selector).to.equal('this.items.get(rowIndex1).all(by.model(\'color\'))');
    expect(locator.strategy).to.be.an.instanceof(NgModelLocatorStrategy);
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

    let generator = new ProtractorLocatorGenerator(locatorStrategies);
    let locator = generator.generate(element);

    expect(locator.selector)
      .to
      .equal(
        'this.items.get(rowIndex1).all(by.css(\'div.elements\')).get(rowIndex2).all(by.css(\'div.pieces\')).get(rowIndex3).element(by.id(\'id\'))');
    expect(locator.strategy).to.be.an.instanceof(IdLocatorStrategy);
  });

  it('should generate locator for deeply nested regular element in ng-repeat', () => {
    let document = getDocument('<div ng-repeat="item in items"><div ng-repeat="element in elements">' +
                               '<div ng-repeat="piece in pieces"><div id="id"></div></div></div></div>');

    let divs = select('div', document);
    let div0 = divs[0];
    let div1 = divs[1];
    let div2 = divs[2];
    let div3 = divs[3];

    let page = new Page(true);
    let section0 = page.addSection(div0);
    section0.name = 'items';
    section0.addTypes(NG_REPEAT);

    let section1 = section0.addSection(div1);
    section1.name = 'elements';
    section1.addTypes(NG_REPEAT);

    let section2 = section1.addSection(div2);
    section2.name = 'pieces';
    section2.addTypes(NG_REPEAT);

    let element = section2.addElement(div3);

    let generator = new ProtractorLocatorGenerator(locatorStrategies);
    let locator = generator.generate(element);

    expect(locator.selector)
      .to
      .equal('this.items.get(rowIndex1).element(by.exactRepeater(\'element in elements\').row(rowIndex2))' +
             '.element(by.exactRepeater(\'piece in pieces\').row(rowIndex3)).element(by.id(\'id\'))');
    expect(locator.strategy).to.be.an.instanceof(IdLocatorStrategy);
  });

  it('should not use same locator twice', () => {
    let document = getDocument('<input type="text" name="name"><input type="text" name="name" ng-model="model">');

    let inputs = select('input', document);
    let input1 = inputs[0];
    let input2 = inputs[1];

    let page = new Page(true);
    let element1 = page.addElement(input1);
    let element2 = page.addElement(input2);

    let generator = new ProtractorLocatorGenerator(locatorStrategies);
    let locator = generator.generate(element1);

    expect(locator.selector).to.equal('element(by.name(\'name\'))');
    expect(locator.strategy).to.be.an.instanceof(NameLocatorStrategy);

    locator = generator.generate(element2);

    expect(locator.selector).to.equal('element(by.model(\'model\'))');
    expect(locator.strategy).to.be.an.instanceof(NgModelLocatorStrategy);
  });

  it('should return null if it cannot find a locator for a single element', () => {
    let document = getDocument('<div><div ng-repeat="a">A</div><div>B</div></div>');

    let divs = select('div', document);
    let divB = divs[2];

    let page = new Page(true);
    let element = page.addElement(divB);

    let generator = new ProtractorLocatorGenerator(locatorStrategies);
    let locator = generator.generate(element);

    expect(locator).to.be.null;
  });

  it('should return null if it cannot find a locator for first part', () => {
    let document = getDocument('<div ng-repeat="item in items"><div class="a"></div></div>');

    let divs = select('div', document);
    let div1 = divs[0];
    let div2 = divs[1];

    let page = new Page(true);

    let section = page.addSection(div1);
    section.addTypes(NG_REPEAT);

    let element = section.addElement(div2);

    let generator = new ProtractorLocatorGenerator(locatorStrategies);
    let locator = generator.generate(element);
    locator = generator.generate(element);

    expect(locator).to.be.null;
  });

  it('should generate locator for nested element in repeater that is also present higher up in the DOM', () => {
    let document1 = getDocument(
      '<div ng-repeat="element in elements"><div class="a"></div></div>');

    let divs = select('div', document1);
    let div1 = divs[0];
    let div2 = divs[1];

    let page = new Page(true);

    let section = page.addSection(div1);
    section.addTypes(NG_REPEAT);
    section.name = 'elements';  

    let element = section.addElement(div2);

    let generator = new ProtractorLocatorGenerator(locatorStrategies);
    let locator = generator.generate(element);

    let document2 = getDocument(
      '<div ng-repeat="item in items"><div ng-repeat="element in elements"><div class="a"></div></div></div>');

    divs = select('div', document2);
    div1 = divs[0];
    div2 = divs[1];
    let div3 = divs[2];

    page = new Page(true);

    let section1 = page.addSection(div1);
    section1.addTypes(NG_REPEAT);
    section1.name = 'items';

    let section2 = section1.addSection(div2);
    section2.addTypes(NG_REPEAT);
    section2.name = 'elements';

    element = section2.addElement(div3);

    locator = generator.generate(element);

    expect(locator.selector).to.equal('this.items.get(rowIndex1).element(by.exactRepeater(\'element in elements\').row(rowIndex2)).element(by.css(\'div.a\'))');
    expect(locator.strategy).to.be.an.instanceof(CssLocatorStrategy);
  });

  it('should generate locator for nested element that is also present higher up in the DOM', () => {
    let document = getDocument('<div class="a"></div><div ng-repeat="item in items"><div class="a"></div></div>');

    let divs = select('div', document);
    let div1 = divs[0];
    let div2 = divs[1];
    let div3 = divs[2];

    let page = new Page(true);

    let outerElement = page.addElement(div1);

    let section = page.addSection(div2);
    section.addTypes(NG_REPEAT);
    section.name = 'items';

    let innerElement = section.addElement(div3);

    let generator = new ProtractorLocatorGenerator(locatorStrategies);
    let locator = generator.generate(outerElement);
    locator = generator.generate(innerElement);

    expect(locator.selector).to.equal('this.items.get(rowIndex1).element(by.css(\'div.a\'))');
    expect(locator.strategy).to.be.an.instanceof(CssLocatorStrategy);
  });

  function getDocument(source) {
    return parse5.parse(source, {treeAdapter: parse5.treeAdapters.htmlparser2});
  }
});