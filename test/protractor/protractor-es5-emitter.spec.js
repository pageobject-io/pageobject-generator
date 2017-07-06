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
const NgModelLocatorStrategy = require('../../lib/protractor/locator/ng-model-locator-strategy');
const ButtonTextLocatorStrategy = require('../../lib/protractor/locator/button-text-locator-strategy');
const CLICK = require('../../lib/actions').CLICK;
const NG_REPEAT = require('../../lib/types').NG_REPEAT;
const COUNT = require('../../lib/assertions').COUNT;

describe('ProtractorEs5Emitter', () => {

  let config = {
    pageObject: {
      keepElementAndMethodsTogether: false,
      order: ['elements', 'navigator', 'actions', 'assertions'],
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
                               '<div ng-repeat="item in items">' + '<button>Save Me</button>' +
                               '<div ng-repeat="piece in pieces"><button>Deep save</button></div>' + '</div>' +
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

   this.get = function () {
      browser.get('');
   };

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

  describe('click by index action', () => {
    it('should emit for simple element', () => {
      expect(emitter.emitClickByIndexAction(simpleElement(true))).to.equal(`this.clickColorByIndex = function (index) {
   this.color.get(index).click();
};
`);
    });

    it('should emit for nested element', () => {
      expect(emitter.emitClickByIndexAction(nestedElement(true))).to.equal(`this.clickColorByIndex = function (rowIndex1, index) {
   this.items.get(rowIndex1).all(by.model('color')).get(index).click();
};
`);
    });
  });

  describe('click by value action', () => {
    it('should emit for simple element', () => {
      expect(emitter.emitClickByValueAction(simpleElement(true))).to.equal(`this.clickColorByValue = function (value) {
   this.color.filter(function (elem) {
      return elem.getAttribute('value').then(function (attribute) {
         return attribute === value;
      });
   }).then(function (filteredElements) {
      filteredElements[0].click();
   });
};
`);
    });

    it('should emit for nested element', () => {
      expect(emitter.emitClickByValueAction(nestedElement(true))).to.equal(`this.clickColorByValue = function (rowIndex1, value) {
   this.items.get(rowIndex1).all(by.model('color')).filter(function (elem) {
      return elem.getAttribute('value').then(function (attribute) {
         return attribute === value;
      });
   }).then(function (filteredElements) {
      filteredElements[0].click();
   });
};
`);
    });
  });

  describe('enabled assertion', () => {
    it('should emit for simple element', () => {
      expect(emitter.emitEnabledAssertion(simpleElement())).to.equal(`this.colorShouldBeEnabled = function () {
   expect(this.color.isEnabled()).toBe(true);
};

this.colorShouldNotBeEnabled = function () {
   expect(this.color.isEnabled()).toBe(false);
};
`);
    });

    it('should emit for nested element', () => {
      expect(emitter.emitEnabledAssertion(nestedElement())).to.equal(`this.colorShouldBeEnabled = function (rowIndex1) {
   expect(this.items.get(rowIndex1).element(by.model('color')).isEnabled()).toBe(true);
};

this.colorShouldNotBeEnabled = function (rowIndex1) {
   expect(this.items.get(rowIndex1).element(by.model('color')).isEnabled()).toBe(false);
};
`);
    });
  });

  describe('enabled by index assertion', () => {
    it('should emit for simple element', () => {
      expect(emitter.emitEnabledByIndexAssertion(simpleElement(true))).to.equal(`this.colorByIndexShouldBeEnabled = function (index) {
   expect(this.color.get(index).isEnabled()).toBe(true);
};

this.colorByIndexShouldNotBeEnabled = function (index) {
   expect(this.color.get(index).isEnabled()).toBe(false);
};
`);
    });

    it('should emit for nested element', () => {
      expect(emitter.emitEnabledByIndexAssertion(nestedElement(true))).to.equal(`this.colorByIndexShouldBeEnabled = function (rowIndex1, index) {
   expect(this.items.get(rowIndex1).all(by.model('color')).get(index).isEnabled()).toBe(true);
};

this.colorByIndexShouldNotBeEnabled = function (rowIndex1, index) {
   expect(this.items.get(rowIndex1).all(by.model('color')).get(index).isEnabled()).toBe(false);
};
`);
    });
  });

  describe('has class assertion', () => {
    it('should emit for simple element', () => {
      expect(emitter.emitHasClassAssertion(simpleElement())).to.equal(`this.colorShouldHaveClass = function (className) {
   this.color.getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) !== -1).toBe(true);
   });
};

this.colorShouldNotHaveClass = function (className) {
   this.color.getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) === -1).toBe(true);
   });
};
`);
    });

    it('should emit for nested element', () => {
      expect(emitter.emitHasClassAssertion(nestedElement())).to.equal(`this.colorShouldHaveClass = function (rowIndex1, className) {
   this.items.get(rowIndex1).element(by.model('color')).getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) !== -1).toBe(true);
   });
};

this.colorShouldNotHaveClass = function (rowIndex1, className) {
   this.items.get(rowIndex1).element(by.model('color')).getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) === -1).toBe(true);
   });
};
`);
    });
  });

  describe('selected assertion', () => {
    it('should emit for simple element', () => {
      expect(emitter.emitSelectedAssertion(simpleElement())).to.equal(`this.colorShouldBeSelected = function () {
   expect(this.color.isSelected()).toBe(true);
};

this.colorShouldNotBeSelected = function () {
   expect(this.color.isSelected()).toBe(false);
};
`);
    });

    it('should emit for nested element', () => {
      expect(emitter.emitSelectedAssertion(nestedElement())).to.equal(`this.colorShouldBeSelected = function (rowIndex1) {
   expect(this.items.get(rowIndex1).element(by.model('color')).isSelected()).toBe(true);
};

this.colorShouldNotBeSelected = function (rowIndex1) {
   expect(this.items.get(rowIndex1).element(by.model('color')).isSelected()).toBe(false);
};
`);
    });
  });

  describe('selected by index assertion', () => {
    it('should emit for simple element', () => {
      expect(emitter.emitSelectedByIndexAssertion(simpleElement(true))).to.equal(`this.colorByIndexShouldBeSelected = function (index) {
   expect(this.color.get(index).isSelected()).toBe(true);
};

this.colorByIndexShouldNotBeSelected = function (index) {
   expect(this.color.get(index).isSelected()).toBe(false);
};
`);
    });

    it('should emit for nested element', () => {
      expect(emitter.emitSelectedByIndexAssertion(nestedElement(true))).to.equal(`this.colorByIndexShouldBeSelected = function (rowIndex1, index) {
   expect(this.items.get(rowIndex1).all(by.model('color')).get(index).isSelected()).toBe(true);
};

this.colorByIndexShouldNotBeSelected = function (rowIndex1, index) {
   expect(this.items.get(rowIndex1).all(by.model('color')).get(index).isSelected()).toBe(false);
};
`);
    });
  });

  describe('selected by value assertion', () => {
    it('should emit for simple element', () => {
      expect(emitter.emitSelectedByValueAssertion(simpleElement(true))).to.equal(`this.colorByValueShouldBeSelected = function (value) {
   this.color.filter(function (elem) {
      return elem.isSelected();
   }).then(function (filteredElements) {
      expect(filteredElements[0].getAttribute('value')).toEqual(value);
   });
};

this.colorByValueShouldNotBeSelected = function (value) {
   this.color.filter(function (elem) {
      return elem.isSelected();
   }).then(function (filteredElements) {
      if (filteredElements.length > 0) {
         expect(filteredElements[0].getAttribute('value')).not.toEqual(value);
      }
   });
};
`);
    });

    it('should emit for nested element', () => {
      expect(emitter.emitSelectedByValueAssertion(nestedElement(true))).to.equal(`this.colorByValueShouldBeSelected = function (rowIndex1, value) {
   this.items.get(rowIndex1).all(by.model('color')).filter(function (elem) {
      return elem.isSelected();
   }).then(function (filteredElements) {
      expect(filteredElements[0].getAttribute('value')).toEqual(value);
   });
};

this.colorByValueShouldNotBeSelected = function (rowIndex1, value) {
   this.items.get(rowIndex1).all(by.model('color')).filter(function (elem) {
      return elem.isSelected();
   }).then(function (filteredElements) {
      if (filteredElements.length > 0) {
         expect(filteredElements[0].getAttribute('value')).not.toEqual(value);
      }
   });
};
`);
    });
  });

  describe('text assertion', () => {
    it('should emit for simple element', () => {
      expect(emitter.emitTextAssertion(simpleElement())).to.equal(`this.colorShouldHaveText = function (value) {
   expect(this.color.getText()).toBe(value);
};
`);
    });

    it('should emit for nested element', () => {
      expect(emitter.emitTextAssertion(nestedElement())).to.equal(`this.colorShouldHaveText = function (rowIndex1, value) {
   expect(this.items.get(rowIndex1).element(by.model('color')).getText()).toBe(value);
};
`);
    });
  });

  describe('visibility assertion', () => {
    it('should emit for simple element', () => {
      expect(emitter.emitVisibilityAssertion(simpleElement())).to.equal(`this.colorShouldBeVisible = function () {
   expect(this.color.isDisplayed()).toBe(true);
};

this.colorShouldNotBeVisible = function () {
   expect(this.color.isDisplayed()).toBe(false);
};
`);
    });

    it('should emit for nested element', () => {
      expect(emitter.emitVisibilityAssertion(nestedElement())).to.equal(`this.colorShouldBeVisible = function (rowIndex1) {
   expect(this.items.get(rowIndex1).element(by.model('color')).isDisplayed()).toBe(true);
};

this.colorShouldNotBeVisible = function (rowIndex1) {
   expect(this.items.get(rowIndex1).element(by.model('color')).isDisplayed()).toBe(false);
};
`);
    });
  });

  describe('visibility by index assertion', () => {
    it('should emit for simple element', () => {
      expect(emitter.emitVisibilityByIndexAssertion(simpleElement(true))).to.equal(`this.colorByIndexShouldBeVisible = function (index) {
   expect(this.color.get(index).isDisplayed()).toBe(true);
};

this.colorByIndexShouldNotBeVisible = function (index) {
   expect(this.color.get(index).isDisplayed()).toBe(false);
};
`);
    });

    it('should emit for nested element', () => {
      expect(emitter.emitVisibilityByIndexAssertion(nestedElement(true))).to.equal(`this.colorByIndexShouldBeVisible = function (rowIndex1, index) {
   expect(this.items.get(rowIndex1).all(by.model('color')).get(index).isDisplayed()).toBe(true);
};

this.colorByIndexShouldNotBeVisible = function (rowIndex1, index) {
   expect(this.items.get(rowIndex1).all(by.model('color')).get(index).isDisplayed()).toBe(false);
};
`);
    });
  });

  describe('date mutator action', () => {
    it('should emit for simple element', () => {
      expect(emitter.emitDateMutatorAction(simpleElement())).to.equal(`this.setColor = function (value) {
   // https://github.com/angular/protractor/issues/562
   var element = this.color;
   element.getAttribute('value').then(function (text) {
      var backspaceSeries = Array(text.length + 1).join(protractor.Key.BACK_SPACE);
      element.sendKeys(backspaceSeries);
      element.sendKeys(value);
   });
};
`);
    });

    it('should emit for nested element', () => {
      expect(emitter.emitDateMutatorAction(nestedElement())).to.equal(`this.setColor = function (rowIndex1, value) {
   // https://github.com/angular/protractor/issues/562
   var element = this.items.get(rowIndex1).element(by.model('color'));
   element.getAttribute('value').then(function (text) {
      var backspaceSeries = Array(text.length + 1).join(protractor.Key.BACK_SPACE);
      element.sendKeys(backspaceSeries);
      element.sendKeys(value);
   });
};
`);
    });
  });

  describe('option selected by partial text assertion', () => {
    it('should emit for simple element', () => {
      expect(emitter.emitOptionSelectedByPartialTextAssertion(simpleElement())).to.equal(`this.colorByPartialTextShouldBeSelected = function () {
   var expectedOptions = [];
   for (var i = 0; i < arguments.length; i++) {
      expectedOptions = expectedOptions.concat(arguments[i]);
   }
   
   for (i = 0; i < expectedOptions.length; i++) {
      var options = this.color.all(by.cssContainingText('option', expectedOptions[i]));
   
      options.each(function (option) {
         expect(option.isSelected()).toBe(true);
      });
   
      expect(options.count()).toBeGreaterThan(0);
   }
};

this.colorByPartialTextShouldNotBeSelected = function () {
   var expectedOptions = [];
   for (var i = 0; i < arguments.length; i++) {
      expectedOptions = expectedOptions.concat(arguments[i]);
   }
   
   for (i = 0; i < expectedOptions.length; i++) {
      this.color.all(by.cssContainingText('option', expectedOptions[i])).each(function (option) {
         expect(option.isSelected()).toBe(false);
      });
   }
};
`);
    });

    it('should emit for nested element', () => {
      expect(emitter.emitOptionSelectedByPartialTextAssertion(nestedElement())).to.equal(`this.colorByPartialTextShouldBeSelected = function (rowIndex1) {
   var expectedOptions = [];
   for (var i = 1; i < arguments.length; i++) {
      expectedOptions = expectedOptions.concat(arguments[i]);
   }
   
   for (i = 0; i < expectedOptions.length; i++) {
      var options = this.items.get(rowIndex1).element(by.model('color')).all(by.cssContainingText('option', expectedOptions[i]));
   
      options.each(function (option) {
         expect(option.isSelected()).toBe(true);
      });
   
      expect(options.count()).toBeGreaterThan(0);
   }
};

this.colorByPartialTextShouldNotBeSelected = function (rowIndex1) {
   var expectedOptions = [];
   for (var i = 1; i < arguments.length; i++) {
      expectedOptions = expectedOptions.concat(arguments[i]);
   }
   
   for (i = 0; i < expectedOptions.length; i++) {
      this.items.get(rowIndex1).element(by.model('color')).all(by.cssContainingText('option', expectedOptions[i])).each(function (option) {
         expect(option.isSelected()).toBe(false);
      });
   }
};
`);
    });
  });

  describe('option selected by text assertion', () => {
    it('should emit for simple element', () => {
      expect(emitter.emitOptionSelectedByTextAssertion(simpleElement())).to.equal(`this.colorByTextShouldBeSelected = function () {
   var expectedOptions = [];
   for (var i = 0; i < arguments.length; i++) {
      expectedOptions = expectedOptions.concat(arguments[i]);
   }
   
   for (i = 0; i < expectedOptions.length; i++) {
      var options = this.color.all(by.xpath('option[.="' + expectedOptions[i] + '"]'));
   
      options.each(function (option) {
         expect(option.isSelected()).toBe(true);
      });
   
      expect(options.count()).toBeGreaterThan(0);
   }
};

this.colorByTextShouldNotBeSelected = function () {
   var expectedOptions = [];
   for (var i = 0; i < arguments.length; i++) {
      expectedOptions = expectedOptions.concat(arguments[i]);
   }
   
   for (i = 0; i < expectedOptions.length; i++) {
      this.color.all(by.xpath('option[.="' + expectedOptions[i] + '"]')).each(function(option) {
         expect(option.isSelected()).toBe(false);
      });
   }
};
`);
    });

    it('should emit for nested element', () => {
      expect(emitter.emitOptionSelectedByTextAssertion(nestedElement())).to.equal(`this.colorByTextShouldBeSelected = function (rowIndex1) {
   var expectedOptions = [];
   for (var i = 1; i < arguments.length; i++) {
      expectedOptions = expectedOptions.concat(arguments[i]);
   }
   
   for (i = 0; i < expectedOptions.length; i++) {
      var options = this.items.get(rowIndex1).element(by.model('color')).all(by.xpath('option[.="' + expectedOptions[i] + '"]'));
   
      options.each(function (option) {
         expect(option.isSelected()).toBe(true);
      });
   
      expect(options.count()).toBeGreaterThan(0);
   }
};

this.colorByTextShouldNotBeSelected = function (rowIndex1) {
   var expectedOptions = [];
   for (var i = 1; i < arguments.length; i++) {
      expectedOptions = expectedOptions.concat(arguments[i]);
   }
   
   for (i = 0; i < expectedOptions.length; i++) {
      this.items.get(rowIndex1).element(by.model('color')).all(by.xpath('option[.="' + expectedOptions[i] + '"]')).each(function(option) {
         expect(option.isSelected()).toBe(false);
      });
   }
};
`);
    });
  });

  describe('option selected by value assertion', () => {
    it('should emit for simple element', () => {
      expect(emitter.emitOptionSelectedByValueAssertion(simpleElement())).to.equal(`this.colorByValueShouldBeSelected = function () {
   var expectedOptions = [];
   for (var i = 0; i < arguments.length; i++) {
      expectedOptions = expectedOptions.concat(arguments[i]);
   }
   
   for (i = 0; i < expectedOptions.length; i++) {
      var options = this.color.all(by.css('option[value="' + expectedOptions[i] + '"]'));
   
      options.each(function (option) {
         expect(option.isSelected()).toBe(true);
      });
   
      expect(options.count()).toBeGreaterThan(0);
   }
};

this.colorByValueShouldNotBeSelected = function () {
   var expectedOptions = [];
   for (var i = 0; i < arguments.length; i++) {
      expectedOptions = expectedOptions.concat(arguments[i]);
   }
   
   for (i = 0; i < expectedOptions.length; i++) {
      this.color.all(by.css('option[value="' + expectedOptions[i] + '"]')).each(function(option) {
         expect(option.isSelected()).toBe(false);
      });
   }
};
`);
    });

    it('should emit for nested element', () => {
      expect(emitter.emitOptionSelectedByValueAssertion(nestedElement())).to.equal(`this.colorByValueShouldBeSelected = function (rowIndex1) {
   var expectedOptions = [];
   for (var i = 1; i < arguments.length; i++) {
      expectedOptions = expectedOptions.concat(arguments[i]);
   }
   
   for (i = 0; i < expectedOptions.length; i++) {
      var options = this.items.get(rowIndex1).element(by.model('color')).all(by.css('option[value="' + expectedOptions[i] + '"]'));
   
      options.each(function (option) {
         expect(option.isSelected()).toBe(true);
      });
   
      expect(options.count()).toBeGreaterThan(0);
   }
};

this.colorByValueShouldNotBeSelected = function (rowIndex1) {
   var expectedOptions = [];
   for (var i = 1; i < arguments.length; i++) {
      expectedOptions = expectedOptions.concat(arguments[i]);
   }
   
   for (i = 0; i < expectedOptions.length; i++) {
      this.items.get(rowIndex1).element(by.model('color')).all(by.css('option[value="' + expectedOptions[i] + '"]')).each(function(option) {
         expect(option.isSelected()).toBe(false);
      });
   }
};
`);
    });
  });

  describe('select option by partial text action', () => {
    it('should emit for simple element', () => {
      expect(emitter.emitSelectOptionByPartialTextAction(simpleElement())).to.equal(`this.selectColorByPartialText = function (text) {
   this.color.all(by.cssContainingText('option', text)).click();
};
`);
    });

    it('should emit for nested element', () => {
      expect(emitter.emitSelectOptionByPartialTextAction(nestedElement())).to.equal(`this.selectColorByPartialText = function (rowIndex1, text) {
   this.items.get(rowIndex1).element(by.model('color')).all(by.cssContainingText('option', text)).click();
};
`);
    });
  });

  describe('select option by text action', () => {
    it('should emit for simple element', () => {
      expect(emitter.emitSelectOptionByTextAction(simpleElement())).to.equal(`this.selectColorByText = function (text) {
   this.color.all(by.xpath('option[.="' + text + '"]')).click();
};
`);
    });

    it('should emit for nested element', () => {
      expect(emitter.emitSelectOptionByTextAction(nestedElement())).to.equal(`this.selectColorByText = function (rowIndex1, text) {
   this.items.get(rowIndex1).element(by.model('color')).all(by.xpath('option[.="' + text + '"]')).click();
};
`);
    });
  });

  describe('select option by value action', () => {
    it('should emit for simple element', () => {
      expect(emitter.emitSelectOptionByValueAction(simpleElement())).to.equal(`this.selectColorByValue = function (value) {
   this.color.all(by.css('option[value="' + value + '"]')).click();
};
`);
    });

    it('should emit for nested element', () => {
      expect(emitter.emitSelectOptionByValueAction(nestedElement())).to.equal(`this.selectColorByValue = function (rowIndex1, value) {
   this.items.get(rowIndex1).element(by.model('color')).all(by.css('option[value="' + value + '"]')).click();
};
`);
    });
  });

  describe('value assertion', () => {
    it('should emit for simple element', () => {
      expect(emitter.emitValueAssertion(simpleElement())).to.equal(`this.shouldHaveColor = function (value) {
   expect(this.color.getAttribute('value')).toEqual(value);
};
`);
    });

    it('should emit for nested element', () => {
      expect(emitter.emitValueAssertion(nestedElement())).to.equal(`this.shouldHaveColor = function (rowIndex1, value) {
   expect(this.items.get(rowIndex1).element(by.model('color')).getAttribute('value')).toEqual(value);
};
`);
    });
  });

  describe('text mutator action', () => {
    it('should emit for simple element', () => {
      expect(emitter.emitTextMutatorAction(simpleElement())).to.equal(`this.setColor = function (value) {
   this.color.clear();
   this.color.sendKeys(value);
};
`);
    });

    it('should emit for nested element', () => {
      expect(emitter.emitTextMutatorAction(nestedElement())).to.equal(`this.setColor = function (rowIndex1, value) {
   this.items.get(rowIndex1).element(by.model('color')).clear();
   this.items.get(rowIndex1).element(by.model('color')).sendKeys(value);
};
`);
    });
  });

  function getDocument(source) {
    return parse5.parse(source, {treeAdapter: parse5.treeAdapters.htmlparser2});
  }

  function simpleElement(multiple = false) {
    let page = new Page(true);

    let element = page.addElement();
    element.name = 'color';
    element.locator = new Locator(`element${multiple ? '.all' : ''}(by.model('color'))`, new NgModelLocatorStrategy());

    let traverser = new EmitTraverser(null, config);
    traverser._element = element;

    return traverser;
  }

  function nestedElement(multiple = false) {
    let page = new Page(true);

    let repeater = page.addSection();
    repeater.name = 'items';
    repeater.locator = new Locator('element.all(by.exactRepeater(\'item in items\')', new NgRepeatLocatorStrategy());
    repeater.addTypes(NG_REPEAT);

    let nestedElement = repeater.addElement();
    nestedElement.name = 'color';
    nestedElement.locator = new Locator(`this.items.get(rowIndex1).${multiple ? 'all' : 'element'}(by.model('color'))`, new NgModelLocatorStrategy());

    let traverser = new EmitTraverser(null, config);
    traverser._element = nestedElement;

    return traverser;
  }
});