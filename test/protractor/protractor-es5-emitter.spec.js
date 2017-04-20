'use strict';

const expect = require('chai').expect;
const parse5 = require('parse5');
const select = require('css-select');
const Page = require('../../lib/page/page');
const ProtractorEs5Emitter = require('../../lib/protractor/protractor-es5-emitter');
const EmitTraverser = require('../../lib/emit-traverser');
const Locator = require('../../lib/locator/locator');
const IdLocatorStrategy = require('../../lib/protractor/locator/id-locator-strategy');
const NgRepeatLocatorStrategy = require('../../lib/protractor/locator/ng-repeat-locator-strategy');
const ButtonTextLocatorStrategy = require('../../lib/protractor/locator/button-text-locator-strategy');
const CLICK = require('../../lib/actions').CLICK;
const NG_REPEAT = require('../../lib/types').NG_REPEAT;
const COUNT = require('../../lib/assertions').COUNT;

describe('ProtractorEs5Emitter', () => {

  let config = {
    pageObject: {
      keepElementAndMethodsTogether: false,
      order: ['elements', 'actions', 'assertions'],
      elementsOrder: 'alphabetical',
      actionsOrder: 'alphabetical',
      assertionsOrder: 'alphabetical',
      indentStyle: 'space',
      indentSize: 3,
      endOfLine: 'lf',
      newLineCharacter: '\n',
      keepMaximumBlankLines: 1
    }
  };

  let emitter = new ProtractorEs5Emitter(config);
  config.emitter = emitter;

  it('should emit', () => {
    let document = getDocument('<button id="saveButton">Save</button><button id="cancelButton">Cancel</button>' +
                               '<div ng-repeat="item in items">' +
                               '<button>Save Me</button>' +
                               '<div ng-repeat="piece in pieces"><button>Deep save</button></div>' +
                               '</div>' +
                               '<button ng-repeat="element in elements">Repeated</button>');

    let buttons = select('button', document);
    let saveButton = buttons[0];
    let cancelButton = buttons[1];
    let nestedButton = buttons[2];
    let deeplyNestedButton = buttons[3];
    let repeatedButton = buttons[4];

    let divs = select('div', document);
    let itemsRepeater = divs[0];
    let piecesRepeater = divs[1];

    let page = new Page(true);
    page.name = 'PageObject';

    let saveButtonElement = page.addElement(saveButton);
    saveButtonElement.name = 'saveButton';
    saveButtonElement.locator = new Locator('element(by.id(\'saveButton\'))', new IdLocatorStrategy());
    saveButtonElement.addActions(CLICK);

    let cancelButtonElement = page.addElement(cancelButton);
    cancelButtonElement.name = 'cancelButton';
    cancelButtonElement.locator = new Locator('element(by.id(\'cancelButton\'))', new IdLocatorStrategy());
    cancelButtonElement.addActions(CLICK);

    let itemsRepeaterSection = page.addSection(itemsRepeater);
    itemsRepeaterSection.name = 'items';
    itemsRepeaterSection.locator = new Locator('element.all(by.exactRepeater(\'item in items\')', new NgRepeatLocatorStrategy());
    itemsRepeaterSection.addTypes(NG_REPEAT);
    itemsRepeaterSection.addAssertions(COUNT);

    let nestedButtonElement = itemsRepeaterSection.addElement(nestedButton);
    nestedButtonElement.name = 'saveMeButton';
    nestedButtonElement.locator = new Locator('this.items.get(rowIndex1).element(by.buttonText(\'Save Me\')', new ButtonTextLocatorStrategy());
    nestedButtonElement.addActions(CLICK);

    let piecesRepeaterSection = itemsRepeaterSection.addSection(piecesRepeater);
    piecesRepeaterSection.name = 'pieces';
    piecesRepeaterSection.locator = new Locator('his.items.get(rowIndex1).all(by.exactRepeater(\'piece in pieces\')', new NgRepeatLocatorStrategy());
    piecesRepeaterSection.addTypes(NG_REPEAT);
    piecesRepeaterSection.addAssertions(COUNT);

    let deeplyNestedButtonElement = piecesRepeaterSection.addElement(deeplyNestedButton);
    deeplyNestedButtonElement.name = 'deepSaveButton';
    deeplyNestedButtonElement.locator = new Locator('this.items.get(rowIndex1).all(by.exactRepeater(\'piece in pieces\').get(rowIndex2).element(by.buttonText(\'Deep save\')', new ButtonTextLocatorStrategy());
    deeplyNestedButtonElement.addActions(CLICK);

    let repeatedButtonSection = page.addSection(repeatedButton);
    repeatedButtonSection.name = 'elements';
    repeatedButtonSection.locator = new Locator('element.all(by.exactRepeater(\'element in elements\')', new NgRepeatLocatorStrategy());
    repeatedButtonSection.addTypes(NG_REPEAT);
    repeatedButtonSection.addAssertions(COUNT);
    repeatedButtonSection.addActions(CLICK);

    let traverser = new EmitTraverser(page, config);
    expect(traverser.emitPageObject()).to.equal(`var PageObject = function () {
   
   this.cancelButton = element(by.id('cancelButton'));
   this.elements = element.all(by.exactRepeater('element in elements');
   this.items = element.all(by.exactRepeater('item in items');
   this.saveButton = element(by.id('saveButton'));
   
   this.clickCancelButton = function () {
      this.cancelButton.click();
   };
   
   this.clickDeepSaveButton = function (rowIndex1, rowIndex2) {
      this.items.get(rowIndex1).all(by.exactRepeater('piece in pieces').get(rowIndex2).element(by.buttonText('Deep save').click();
   };
   
   this.clickElements = function (rowIndex1) {
      this.elements.get(rowIndex1).click();
   };
   
   this.clickSaveButton = function () {
      this.saveButton.click();
   };
   
   this.clickSaveMeButton = function (rowIndex1) {
      this.items.get(rowIndex1).element(by.buttonText('Save Me').click();
   };
   
   this.elementsCountShouldBe = function (count) {
      expect(this.elements.count()).toBe(count);
   };
   
   this.itemsCountShouldBe = function (count) {
      expect(this.items.count()).toBe(count);
   };
   
   this.piecesCountShouldBe = function (rowIndex1, count) {
      expect(his.items.get(rowIndex1).all(by.exactRepeater('piece in pieces').count()).toBe(count);
   };
   
};

module.exports = PageObject;
`);
  });

  function getDocument(source) {
    return parse5.parse(source, {treeAdapter: parse5.treeAdapters.htmlparser2});
  }
});