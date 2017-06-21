'use strict';

const expect = require('chai').expect;
const parse5 = require('parse5');
const select = require('css-select');
const Page = require('../../../lib/page/page');
const ComponentTestTypescriptEmitter = require('../../../lib/angular/component/component-test-typescript-emitter');
const EmitTraverser = require('../../../lib/emit-traverser');
const Locator = require('../../../lib/locator/locator');
const NativeCssLocatorStrategy = require('../../../lib/angular/angular/locator/native-css-locator-strategy');
const CLICK = require('../../../lib/actions').CLICK;
const NG_FOR = require('../../../lib/types').NG_FOR;
const COUNT = require('../../../lib/assertions').COUNT;
const ParseResult = require('../../../lib/parser/parse-result');

describe('ComponentTestTypescriptEmitter', () => {

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

  let emitter = new ComponentTestTypescriptEmitter(config);
  config.emitter = emitter;

  it('should emit', () => {
    let document = getDocument('<button id="saveButton">Save</button><button id="cancelButton">Cancel</button>' +
      '<div class="items" *ngFor="item of items">' + '<button id="saveMeButton">Save Me</button>' +
      '<div class="pieces" *ngFor="piece of pieces"><button id="deepSave">Deep save</button></div>' + '</div>' +
      '<button class="elements" *ngFor="element of elements">Repeated</button>');

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
    saveButtonElement.locator = new Locator('this.debugElement.nativeElement.querySelector(\'#saveButton\')', new NativeCssLocatorStrategy());
    saveButtonElement.addActions(CLICK);

    let cancelButtonElement = page.addElement(cancelButton);
    cancelButtonElement.name = 'cancelButton';
    cancelButtonElement.locator = new Locator('this.debugElement.nativeElement.querySelector(\'#cancelButton\')', new NativeCssLocatorStrategy());
    cancelButtonElement.addActions(CLICK);

    let itemsRepeaterSection = page.addSection(itemsRepeater);
    itemsRepeaterSection.name = 'items';
    itemsRepeaterSection.locator = new Locator('this.debugElement.nativeElement.querySelectorAll(\'.items\')', new NativeCssLocatorStrategy());
    itemsRepeaterSection.addTypes(NG_FOR);
    itemsRepeaterSection.addAssertions(COUNT);

    let nestedButtonElement = itemsRepeaterSection.addElement(nestedButton);
    nestedButtonElement.name = 'saveMeButton';
    nestedButtonElement.locator = new Locator('this.items[rowIndex1].querySelector(\'#saveMeButton\')', new NativeCssLocatorStrategy());
    nestedButtonElement.addActions(CLICK);

    let piecesRepeaterSection = itemsRepeaterSection.addSection(piecesRepeater);
    piecesRepeaterSection.name = 'pieces';
    piecesRepeaterSection.locator = new Locator('this.items[rowIndex1].querySelectorAll(\'.pieces\')', new NativeCssLocatorStrategy());
    piecesRepeaterSection.addTypes(NG_FOR);
    piecesRepeaterSection.addAssertions(COUNT);

    let deeplyNestedButtonElement = piecesRepeaterSection.addElement(deeplyNestedButton);
    deeplyNestedButtonElement.name = 'deepSaveButton';
    deeplyNestedButtonElement.locator = new Locator('this.items[rowIndex1].querySelectorAll(\'.pieces\')[rowIndex2].querySelector(\'#deepSave\')', new NativeCssLocatorStrategy());
    deeplyNestedButtonElement.addActions(CLICK);

    let repeatedButtonSection = page.addSection(repeatedButton);
    repeatedButtonSection.name = 'elements';
    repeatedButtonSection.locator = new Locator('this.debugElement.nativeElement.querySelectorAll(\'.elements\')', new NativeCssLocatorStrategy());
    repeatedButtonSection.addTypes(NG_FOR);
    repeatedButtonSection.addAssertions(COUNT);
    repeatedButtonSection.addActions(CLICK);

    let traverser = new EmitTraverser(page, config, new ParseResult(document, 'TestComponent'));
    expect(traverser.emitPageObject()).to.equal(`import {ComponentPageBase} from 'angular-component-test-support/dist';
// We assume you put page object files to the same folder where your component is placed. Change it if it's not true in your case.
import {TestComponent} from './test-component.component';

export class TestComponentPage extends ComponentPageBase {

   constructor() {
      super(TestComponent);
   }

   this.cancelButton = this.debugElement.nativeElement.querySelector('#cancelButton');
   this.elements = this.debugElement.nativeElement.querySelectorAll('.elements');
   this.items = this.debugElement.nativeElement.querySelectorAll('.items');
   this.saveButton = this.debugElement.nativeElement.querySelector('#saveButton');

   public clickCancelButton(): void  {
      this.cancelButton.click();
   }

   public clickDeepSaveButton(rowIndex1, rowIndex2): void  {
      this.items[rowIndex1].querySelectorAll('.pieces')[rowIndex2].querySelector('#deepSave').click();
   }

   public clickElements(rowIndex1): void  {
      this.elements[rowIndex1].click();
   }

   public clickSaveButton(): void  {
      this.saveButton.click();
   }

   public clickSaveMeButton(rowIndex1): void  {
      this.items[rowIndex1].querySelector('#saveMeButton').click();
   }

   public elementsCountShouldBe(count): void  {
      expect(this.elements.length).toBe(count);
   }

   public itemsCountShouldBe(count): void  {
      expect(this.items.length).toBe(count);
   }

   public piecesCountShouldBe(rowIndex1, count): void  {
      expect(this.items[rowIndex1].querySelectorAll('.pieces').length).toBe(count);
   }

}
`);
  });

  describe('click by index action', () => {

    it('should emit for simple element', () => {
      expect(emitter.emitClickByIndexAction(simpleElement(true))).to.equal(`public clickColorByIndex(index): void  {
   this.color[index].click();
}
`);
    });

    it('should emit for nested element', () => {
      expect(emitter.emitClickByIndexAction(nestedElement(true))).to.equal(`public clickColorByIndex(rowIndex1, index): void  {
   this.items[rowIndex1].querySelectorAll('.color')[index].click();
}
`);
    });
  });

  describe('click by value action', () => {
    it('should emit for simple element', () => {
      expect(emitter.emitClickByValueAction(simpleElement(true))).to.equal(`public clickColorByValue(value): void  {
      if (this.color.value === value) {
         this.color.click();
      }
}
`);
    });

    it('should emit for nested element', () => {
      expect(emitter.emitClickByValueAction(nestedElement(true))).to.equal(`public clickColorByValue(rowIndex1, value): void  {
   const items: any = this.items[rowIndex1].querySelectorAll('.color');
   for (let i = 0; i < items.length; i++) {
      if (items[i].value === value) {
         items[i].click();
      }
   }
}
`);
    });
  });

  describe('enabled assertion', () => {
    it('should emit for simple element', () => {
      expect(emitter.emitEnabledAssertion(simpleElement())).to.equal(`public colorShouldBeEnabled(): void  {
   expect(this.color.disabled).toBeFalse();
}

public colorShouldNotBeEnabled(): void  {
   expect(this.color.disabled).toBeTrue();
}
`);
    });

    it('should emit for nested element', () => {
      expect(emitter.emitEnabledAssertion(nestedElement())).to.equal(`public colorShouldBeEnabled(rowIndex1): void  {
   expect(this.items[rowIndex1].querySelector('.color').disabled).toBeFalse();
}

public colorShouldNotBeEnabled(rowIndex1): void  {
   expect(this.items[rowIndex1].querySelector('.color').disabled).toBeTrue();
}
`);
    });
  });

  describe('enabled by index assertion', () => {
    it('should emit for simple element', () => {
      expect(emitter.emitEnabledByIndexAssertion(simpleElement(true))).to.equal(`public colorByIndexShouldBeEnabled(index): void  {
   expect(this.color[index].disabled).toBeFalse();
}

public colorByIndexShouldNotBeEnabled(index): void  {
   expect(this.color[index].disabled).toBeTrue();
}
`);
    });

    it('should emit for nested element', () => {
      expect(emitter.emitEnabledByIndexAssertion(nestedElement(true))).to.equal(`public colorByIndexShouldBeEnabled(rowIndex1, index): void  {
   expect(this.items[rowIndex1].querySelectorAll('.color')[index].disabled).toBeFalse();
}

public colorByIndexShouldNotBeEnabled(rowIndex1, index): void  {
   expect(this.items[rowIndex1].querySelectorAll('.color')[index].disabled).toBeTrue();
}
`);
    });
  });

  describe('has class assertion', () => {
    it('should emit for simple element', () => {
      expect(emitter.emitHasClassAssertion(simpleElement())).to.equal(`public colorShouldHaveClass(className): void  {
   expect(this.color.classList.contains(className)).toBeTrue();
}

public colorShouldNotHaveClass(className): void  {
   expect(this.color.classList.contains(className)).toBeFalse();
}
`);
    });

    it('should emit for nested element', () => {
      expect(emitter.emitHasClassAssertion(nestedElement())).to.equal(`public colorShouldHaveClass(rowIndex1, className): void  {
   expect(this.items[rowIndex1].querySelector('.color').classList.contains(className)).toBeTrue();
}

public colorShouldNotHaveClass(rowIndex1, className): void  {
   expect(this.items[rowIndex1].querySelector('.color').classList.contains(className)).toBeFalse();
}
`);
    });
  });

  describe('selected assertion', () => {
    it('should emit for simple element', () => {
      expect(emitter.emitSelectedAssertion(simpleElement())).to.equal(`public colorShouldBeSelected(): void  {
   expect(this.color.selected).toBeTrue();
}

public colorShouldNotBeSelected(): void  {
   expect(this.color.selected).toBeFalse();
}
`);
    });

    it('should emit for nested element', () => {
      expect(emitter.emitSelectedAssertion(nestedElement())).to.equal(`public colorShouldBeSelected(rowIndex1): void  {
   expect(this.items[rowIndex1].querySelector('.color').selected).toBeTrue();
}

public colorShouldNotBeSelected(rowIndex1): void  {
   expect(this.items[rowIndex1].querySelector('.color').selected).toBeFalse();
}
`);
    });
  });

  describe('selected by index assertion', () => {
    it('should emit for simple element', () => {
      expect(emitter.emitSelectedByIndexAssertion(simpleElement(true))).to.equal(`public colorByIndexShouldBeSelected(index): void  {
   expect(this.color[index].selected).toBeTrue();
}

public colorByIndexShouldNotBeSelected(index): void  {
   expect(this.color[index].selected).toBeFalse();
}
`);
    });

    it('should emit for nested element', () => {
      expect(emitter.emitSelectedByIndexAssertion(nestedElement(true))).to.equal(`public colorByIndexShouldBeSelected(rowIndex1, index): void  {
   expect(this.items[rowIndex1].querySelectorAll('.color')[index].selected).toBeTrue();
}

public colorByIndexShouldNotBeSelected(rowIndex1, index): void  {
   expect(this.items[rowIndex1].querySelectorAll('.color')[index].selected).toBeFalse();
}
`);
    });
  });

  describe('selected by value assertion', () => {
    it('should emit for simple element', () => {
       expect(emitter.emitSelectedByValueAssertion(simpleElement(true))).to.equal(`public colorByValueShouldBeSelected(value): void  {
   if (this.color.selected) {
       expect(this.color.value).toEqual(value);
   }
   throw new Error('Element is not selected');
}

public colorByValueShouldNotBeSelected(value): void  {
   if (this.color.selected) {
       expect(this.color.value).not.toEqual(value);
   }
   throw new Error('Element is not selected');
}
`);
    });

    it('should emit for nested element', () => {
       expect(emitter.emitSelectedByValueAssertion(nestedElement(true))).to.equal(`public colorByValueShouldBeSelected(rowIndex1, value): void  {
   this.items[rowIndex1].querySelectorAll('.color').forEach((elem) => {
       if (elem.selected) {
          expect(elem.value).toEqual(value);
          return;
      }
       throw new Error('Could not find selected elements.');
   });
}

public colorByValueShouldNotBeSelected(rowIndex1, value): void  {
   this.items[rowIndex1].querySelectorAll('.color').forEach((elem) => {
       if (elem.selected) {
          expect(elem.value).not.toEqual(value);
          return;
      }
       throw new Error('Could not find selected elements.');
   });
}
`);
    });
  });

  describe('text assertion', () => {
    it('should emit for simple element', () => {
      expect(emitter.emitTextAssertion(simpleElement())).to.equal(`public colorShouldHaveText(value): void  {
   expect(this.color.textContent).toBe(value);
}
`);
    });

    it('should emit for nested element', () => {
      expect(emitter.emitTextAssertion(nestedElement())).to.equal(`public colorShouldHaveText(rowIndex1, value): void  {
   expect(this.items[rowIndex1].querySelector('.color').textContent).toBe(value);
}
`);
    });
  });

  describe('visibility assertion', () => {
    it('should emit for simple element', () => {
      expect(emitter.emitVisibilityAssertion(simpleElement())).to.equal(`public colorShouldBeVisible(): void  {
   expect(this.color).not.toBeNull();
}

public colorShouldNotBeVisible(): void  {
   expect(this.color).toBeNull();
}
`);
    });

    it('should emit for nested element', () => {
      expect(emitter.emitVisibilityAssertion(nestedElement())).to.equal(`public colorShouldBeVisible(rowIndex1): void  {
   expect(this.items[rowIndex1].querySelector('.color')).not.toBeNull();
}

public colorShouldNotBeVisible(rowIndex1): void  {
   expect(this.items[rowIndex1].querySelector('.color')).toBeNull();
}
`);
    });
  });

  describe('visibility by index assertion', () => {
    it('should emit for simple element', () => {
      expect(emitter.emitVisibilityByIndexAssertion(simpleElement(true))).to.equal(`public colorByIndexShouldBeVisible(index): void  {
   expect(this.color[index]).not.toBeNull();
}

public colorByIndexShouldNotBeVisible(index): void  {
   expect(this.color[index]).toBeNull();
}
`);
    });

    it('should emit for nested element', () => {
      expect(emitter.emitVisibilityByIndexAssertion(nestedElement(true))).to.equal(`public colorByIndexShouldBeVisible(rowIndex1, index): void  {
   expect(this.items[rowIndex1].querySelectorAll('.color')[index]).not.toBeNull();
}

public colorByIndexShouldNotBeVisible(rowIndex1, index): void  {
   expect(this.items[rowIndex1].querySelectorAll('.color')[index]).toBeNull();
}
`);
    });
  });

  describe('date mutator action', () => {
    it('should emit for simple element', () => {
      expect(emitter.emitDateMutatorAction(simpleElement())).to.equal(`public setColor(value): void  {
   this.color.value = '';
   this.color.dispatchEvent(new Event('input'));
}
`);
    });

    it('should emit for nested element', () => {
      expect(emitter.emitDateMutatorAction(nestedElement())).to.equal(`public setColor(rowIndex1, value): void  {
   this.items[rowIndex1].querySelector('.color').value = '';
   this.items[rowIndex1].querySelector('.color').dispatchEvent(new Event('input'));
}
`);
    });
  });

  describe('option selected by partial text assertion', () => {
    it('should emit for simple element', () => {
      expect(emitter.emitOptionSelectedByPartialTextAssertion(simpleElement())).to.equal(`public colorByPartialTextShouldBeSelected(): void  {
   let expectedOptions: string[] = [];
   for (const i = 0; i < arguments.length; i++) {
      expectedOptions = expectedOptions.concat(arguments[i]);
   }
   
   for (const i = 0; i < expectedOptions.length; i++) {
      let options = this.color.querySelectorAll('option')
      options = [].filter.call(elements, (element: Element) => {
         return RegExp(expectedOptions[i]).test(element.textContent);
      })
   
      options.forEach(option => {
         expect(option.selected).toBeTrue();
      });
   
      expect(options.length).toBeGreaterThan(0);
   }
}

public colorByPartialTextShouldNotBeSelected(): void  {
   let expectedOptions: string[] = [];
   for (const i = 0; i < arguments.length; i++) {
      expectedOptions = expectedOptions.concat(arguments[i]);
   }
   
   for (const i = 0; i < expectedOptions.length; i++) {
      let options = this.color.querySelectorAll('option')
      options = [].filter.call(elements, (element: Element) => {
         return RegExp(expectedOptions[i]).test(element.textContent);
      })
   
      options.forEach(option => {
         expect(option.selected).toBeFalse();
      });
   
      expect(options.length).toBeGreaterThan(0);
   }
}
`);
    });

    it('should emit for nested element', () => {
      expect(emitter.emitOptionSelectedByPartialTextAssertion(nestedElement())).to.equal(`public colorByPartialTextShouldBeSelected(rowIndex1): void  {
   let expectedOptions: string[] = [];
   for (const i = 1; i < arguments.length; i++) {
      expectedOptions = expectedOptions.concat(arguments[i]);
   }
   
   for (const i = 0; i < expectedOptions.length; i++) {
      let options = this.items[rowIndex1].querySelector('.color').querySelectorAll('option')
      options = [].filter.call(elements, (element: Element) => {
         return RegExp(expectedOptions[i]).test(element.textContent);
      })
   
      options.forEach(option => {
         expect(option.selected).toBeTrue();
      });
   
      expect(options.length).toBeGreaterThan(0);
   }
}

public colorByPartialTextShouldNotBeSelected(rowIndex1): void  {
   let expectedOptions: string[] = [];
   for (const i = 1; i < arguments.length; i++) {
      expectedOptions = expectedOptions.concat(arguments[i]);
   }
   
   for (const i = 0; i < expectedOptions.length; i++) {
      let options = this.items[rowIndex1].querySelector('.color').querySelectorAll('option')
      options = [].filter.call(elements, (element: Element) => {
         return RegExp(expectedOptions[i]).test(element.textContent);
      })
   
      options.forEach(option => {
         expect(option.selected).toBeFalse();
      });
   
      expect(options.length).toBeGreaterThan(0);
   }
}
`);
    });
  });

  describe('option selected by text assertion', () => {
    it('should emit for simple element', () => {
      expect(emitter.emitOptionSelectedByTextAssertion(simpleElement())).to.equal(`public colorByTextShouldBeSelected(): void  {
   let expectedOptions: string[] = [];
   for (const i = 0; i < arguments.length; i++) {
      expectedOptions = expectedOptions.concat(arguments[i]);
   }
   
   for (const i = 0; i < expectedOptions.length; i++) {
      let options = this.color.querySelectorAll('option')
      options = [].filter.call(elements, (element: Element) => {
         return expectedOptions[i] === element.textContent;
      })
   
      options.forEach(option => {
         expect(option.selected).toBeTrue();
      });
   
      expect(options.length).toBeGreaterThan(0);
   }
}

public colorByTextShouldNotBeSelected(): void  {
   let expectedOptions: string[] = [];
   for (const i = 0; i < arguments.length; i++) {
      expectedOptions = expectedOptions.concat(arguments[i]);
   }
   
   for (const i = 0; i < expectedOptions.length; i++) {
      let options = this.color.querySelectorAll('option')
      options = [].filter.call(elements, (element: Element) => {
         return expectedOptions[i] === element.textContent;
      })
   
      options.forEach(option => {
         expect(option.selected).toBeFalse();
      });
   
      expect(options.length).toBeGreaterThan(0);
   }
}
`);
    });

    it('should emit for nested element', () => {
      expect(emitter.emitOptionSelectedByTextAssertion(nestedElement())).to.equal(`public colorByTextShouldBeSelected(rowIndex1): void  {
   let expectedOptions: string[] = [];
   for (const i = 1; i < arguments.length; i++) {
      expectedOptions = expectedOptions.concat(arguments[i]);
   }
   
   for (const i = 0; i < expectedOptions.length; i++) {
      let options = this.items[rowIndex1].querySelector('.color').querySelectorAll('option')
      options = [].filter.call(elements, (element: Element) => {
         return expectedOptions[i] === element.textContent;
      })
   
      options.forEach(option => {
         expect(option.selected).toBeTrue();
      });
   
      expect(options.length).toBeGreaterThan(0);
   }
}

public colorByTextShouldNotBeSelected(rowIndex1): void  {
   let expectedOptions: string[] = [];
   for (const i = 1; i < arguments.length; i++) {
      expectedOptions = expectedOptions.concat(arguments[i]);
   }
   
   for (const i = 0; i < expectedOptions.length; i++) {
      let options = this.items[rowIndex1].querySelector('.color').querySelectorAll('option')
      options = [].filter.call(elements, (element: Element) => {
         return expectedOptions[i] === element.textContent;
      })
   
      options.forEach(option => {
         expect(option.selected).toBeFalse();
      });
   
      expect(options.length).toBeGreaterThan(0);
   }
}
`);
    });
  });

  describe('option selected by value assertion', () => {
    it('should emit for simple element', () => {
      expect(emitter.emitOptionSelectedByValueAssertion(simpleElement())).to.equal(`public colorByValueShouldBeSelected(): void  {
   let expectedOptions: string[] = [];
   for (const i = 0; i < arguments.length; i++) {
      expectedOptions = expectedOptions.concat(arguments[i]);
   }
   
   for (const i = 0; i < expectedOptions.length; i++) {
      let options = this.color.querySelectorAll('option')
      options = [].filter.call(elements, (element: Element) => {
         return expectedOptions[i] === element.value;
      })
   
      options.forEach(option => {
         expect(option.selected).toBeTrue();
      });
   
      expect(options.length).toBeGreaterThan(0);
   }
}

public colorByValueShouldNotBeSelected(): void  {
   let expectedOptions: string[] = [];
   for (const i = 0; i < arguments.length; i++) {
      expectedOptions = expectedOptions.concat(arguments[i]);
   }
   
   for (const i = 0; i < expectedOptions.length; i++) {
      let options = this.color.querySelectorAll('option')
      options = [].filter.call(elements, (element: Element) => {
         return expectedOptions[i] === element.value;
      })
   
      options.forEach(option => {
         expect(option.selected).toBeFalse();
      });
   
      expect(options.length).toBeGreaterThan(0);
   }
}
`);
    });

    it('should emit for nested element', () => {
      expect(emitter.emitOptionSelectedByValueAssertion(nestedElement())).to.equal(`public colorByValueShouldBeSelected(rowIndex1): void  {
   let expectedOptions: string[] = [];
   for (const i = 1; i < arguments.length; i++) {
      expectedOptions = expectedOptions.concat(arguments[i]);
   }
   
   for (const i = 0; i < expectedOptions.length; i++) {
      let options = this.items[rowIndex1].querySelector('.color').querySelectorAll('option')
      options = [].filter.call(elements, (element: Element) => {
         return expectedOptions[i] === element.value;
      })
   
      options.forEach(option => {
         expect(option.selected).toBeTrue();
      });
   
      expect(options.length).toBeGreaterThan(0);
   }
}

public colorByValueShouldNotBeSelected(rowIndex1): void  {
   let expectedOptions: string[] = [];
   for (const i = 1; i < arguments.length; i++) {
      expectedOptions = expectedOptions.concat(arguments[i]);
   }
   
   for (const i = 0; i < expectedOptions.length; i++) {
      let options = this.items[rowIndex1].querySelector('.color').querySelectorAll('option')
      options = [].filter.call(elements, (element: Element) => {
         return expectedOptions[i] === element.value;
      })
   
      options.forEach(option => {
         expect(option.selected).toBeFalse();
      });
   
      expect(options.length).toBeGreaterThan(0);
   }
}
`);
    });
  });

  describe('select option by partial text action', () => {
    it('should emit for simple element', () => {
      expect(emitter.emitSelectOptionByPartialTextAction(simpleElement())).to.equal(`public selectColorByPartialText(text): void  {
   let options = this.color.querySelectorAll('option');
   options = [].filter.call(elements, (element: Element) => {
      return RegExp(expectedOptions[i]).test(element.textContent);
   })
   
   expect(options.length).toBeGreaterThan(0);
   options[0].click();
}
`);
    });

    it('should emit for nested element', () => {
      expect(emitter.emitSelectOptionByPartialTextAction(nestedElement())).to.equal(`public selectColorByPartialText(rowIndex1, text): void  {
   let options = this.items[rowIndex1].querySelector('.color').querySelectorAll('option');
   options = [].filter.call(elements, (element: Element) => {
      return RegExp(expectedOptions[i]).test(element.textContent);
   })
   
   expect(options.length).toBeGreaterThan(0);
   options[0].click();
}
`);
    });
  });

  describe('select option by text action', () => {
    it('should emit for simple element', () => {
      expect(emitter.emitSelectOptionByTextAction(simpleElement())).to.equal(`public selectColorByText(text): void  {
   let options = this.color.querySelectorAll('option');
   options = [].filter.call(elements, (element: Element) => {
      return expectedOptions[i] === element.textContent;
   })
   
   expect(options.length).toBeGreaterThan(0);
   options[0].click();
}
`);
    });

    it('should emit for nested element', () => {
      expect(emitter.emitSelectOptionByTextAction(nestedElement())).to.equal(`public selectColorByText(rowIndex1, text): void  {
   let options = this.items[rowIndex1].querySelector('.color').querySelectorAll('option');
   options = [].filter.call(elements, (element: Element) => {
      return expectedOptions[i] === element.textContent;
   })
   
   expect(options.length).toBeGreaterThan(0);
   options[0].click();
}
`);
    });
  });

  describe('select option by value action', () => {
    it('should emit for simple element', () => {
      expect(emitter.emitSelectOptionByValueAction(simpleElement())).to.equal(`public selectColorByValue(value): void  {
   const items: any = this.color;
   for (let i = 0; i < items.length; i++) {
      if (items[i].value === value) {
         items[i].click();
      }
   }
}
`);
    });

    it('should emit for nested element', () => {
      expect(emitter.emitSelectOptionByValueAction(nestedElement())).to.equal(`public selectColorByValue(rowIndex1, value): void  {
   const items: any = this.items[rowIndex1].querySelector('.color');
   for (let i = 0; i < items.length; i++) {
      if (items[i].value === value) {
         items[i].click();
      }
   }
}
`);
    });
  });

  describe('value assertion', () => {
    it('should emit for simple element', () => {
      expect(emitter.emitValueAssertion(simpleElement())).to.equal(`public shouldHaveColor(value): void  {
   expect(this.color.value).toEqual(value);
}
`);
    });

    it('should emit for nested element', () => {
      expect(emitter.emitValueAssertion(nestedElement())).to.equal(`public shouldHaveColor(rowIndex1, value): void  {
   expect(this.items[rowIndex1].querySelector('.color').value).toEqual(value);
}
`);
    });
  });

  describe('text mutator action', () => {
    it('should emit for simple element', () => {
      expect(emitter.emitTextMutatorAction(simpleElement())).to.equal(`public setColor(value): void  {
   this.color.value = value;
   this.color.dispatchEvent(new Event('input'));
}
`);
    });

    it('should emit for nested element', () => {
      expect(emitter.emitTextMutatorAction(nestedElement())).to.equal(`public setColor(rowIndex1, value): void  {
   this.items[rowIndex1].querySelector('.color').value = value;
   this.items[rowIndex1].querySelector('.color').dispatchEvent(new Event('input'));
}
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
    element.locator = new Locator(`this.debugElement.nativeElement.querySelector${multiple ? 'All' : ''}('.color')`, new NativeCssLocatorStrategy(), '\'.color\'');

    let traverser = new EmitTraverser(null, config, new ParseResult(null, 'TestComponent'));
    traverser._element = element;

    return traverser;
  }

  function nestedElement(multiple = false) {
    let page = new Page(true);

    let repeater = page.addSection();
    repeater.name = 'items';
    repeater.locator = new Locator('this.debugElement.nativeElement.querySelectorAll(\'.items\')', new NativeCssLocatorStrategy(), '\'.items\'');
    repeater.addTypes(NG_FOR);

    let nestedElement = repeater.addElement();
    nestedElement.name = 'color';
    nestedElement.locator = new Locator(`this.items[rowIndex1].${multiple ? 'querySelectorAll' : 'querySelector'}('.color')`, new NativeCssLocatorStrategy(), '\'.color\'');

    let traverser = new EmitTraverser(null, config, new ParseResult(null, 'TestComponent'));
    traverser._element = nestedElement;

    return traverser;
  }
});