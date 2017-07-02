"use strict";

const _ = require('lodash');
const EmitterBase = require('../../emitter/emitter-base');

class ComponentTestTypescriptEmitter extends EmitterBase {

  constructor(config) {
    super();
    this.separator = config.pageObject.newLineCharacter;
    this.indentOnHeader = true;
    this.unindentOnFooter = true;
  }

  getNestedElementAccessor(rowIndex) {
    return `[${rowIndex}]`;
  }

  semicolonClosesMethodBody() {
    return false;
  }

  emitImports(traverser) {
    const componentName = traverser.parseResult.componentName;
    const fileName = _.kebabCase(componentName) + '.component';
    let result = `import {ComponentPageBase} from 'angular-component-test-support/dist';`;
    result += traverser.newLine();
    result += `// We assume you put page object files to the same folder where your component is placed. Change it if it's not true in your case.`;
    result += traverser.newLine();
    result += `import {${componentName}} from './${fileName}';`;
    result += traverser.newLine();
    result += traverser.newLine();
    return result;
  }

  emitHeader(traverser) {
    const componentName = traverser.parseResult.componentName;

    const imports = this.emitImports(traverser);

    let result = imports;
    result += `export class ${componentName}Page extends ComponentPageBase {`;
    result += traverser.newLine();
    result += traverser.newLine();
    result += traverser.singleIndent();
    result += `constructor() {`;
    result += traverser.newLine();
    result += traverser.singleIndent();
    result += traverser.singleIndent();
    result += `super(${componentName});`;
    result += traverser.newLine();
    result += traverser.singleIndent();
    result += `}`;
    return result;
  }

  emitNavigator(traverser) {
    return '';
  }

  emitElementsStart() {
    return '';
  }

  emitElement(traverser) {
    return super.isNestedElement(traverser) ?
      '' :
      `this.${traverser.element.name} = ${traverser.element.locator.selector};`;
  }

  emitElementsEnd() {
    return '';
  }

  emitActionsStart() {
    return '';
  }

  emitClickAction(traverser) {
    let nameTitle = _.upperFirst(traverser.element.name);
    let name = `click${nameTitle}`;
    let args = [];
    let result = this.methodHeader(traverser, name, args);
    let body = [`${super.referenceToElement(traverser)}.click();`];
    result += super.methodBody(traverser, body);
    return result;
  }

  emitClickByIndexAction(traverser) {
    let nameTitle = _.upperFirst(traverser.element.name);
    let name = `click${nameTitle}ByIndex`;
    let args = ['index'];
    let result = this.methodHeader(traverser, name, args);
    let body = [`${super.referenceToElement(traverser)}[index].click();`];
    result += super.methodBody(traverser, body);
    return result;
  }

  emitClickByValueAction(traverser) {
    let nameTitle = _.upperFirst(traverser.element.name);
    let name = `click${nameTitle}ByValue`;
    let args = ['value'];
    let result = this.methodHeader(traverser, name, args);

    let body = [`if (${super.referenceToElement(traverser)}.value === value) {`,
      `${traverser.singleIndent()}${super.referenceToElement(traverser)}.click();`,
      `}`];

    if (this.isNestedElement(traverser)) {
      body = [`const items: any = ${super.referenceToElement(traverser)};`,
        'for (let i = 0; i < items.length; i++) {',
        `${traverser.singleIndent()}if (items[i].value === value) {`,
        `${traverser.singleIndent()}${traverser.singleIndent()}items[i].click();`,
        `${traverser.singleIndent()}}`,
        '}'];
    }

    result += super.methodBody(traverser, body);
    return result;
  }

  emitDateMutatorAction(traverser) {
    let nameTitle = _.upperFirst(traverser.element.name);
    let name = `set${nameTitle}`;
    let args = ['value'];
    let result = this.methodHeader(traverser, name, args);
    let body = [`${super.referenceToElement(traverser)}.value = value;`,
      `${super.referenceToElement(traverser)}.dispatchEvent(new Event('input'));`];

    result += super.methodBody(traverser, body);
    return result;
  }

  emitSelectOptionByPartialTextAction(traverser) {
    let nameTitle = _.upperFirst(traverser.element.name);
    let name = `select${nameTitle}ByPartialText`;
    let args = ['text'];
    let result = this.methodHeader(traverser, name, args);
    let options = `let options = ${super.referenceToElement(traverser)}.querySelectorAll('option');`;
    result += super.methodBody(traverser,
      [`${options}`,
        `options = [].filter.call(elements, (element: Element) => {`,
        `${traverser.singleIndent()}return RegExp(expectedOptions[i]).test(element.textContent);`,
        `})`,
        '',
        `expect(options.length).toBeGreaterThan(0);`,
        `options[0].click();`]);
    return result;
  }

  emitSelectOptionByTextAction(traverser) {
    let nameTitle = _.upperFirst(traverser.element.name);
    let name = `select${nameTitle}ByText`;
    let args = ['text'];
    let result = this.methodHeader(traverser, name, args);
    let options = `let options = ${super.referenceToElement(traverser)}.querySelectorAll('option');`;
    result += super.methodBody(traverser,
      [`${options}`,
        `options = [].filter.call(elements, (element: Element) => {`,
        `${traverser.singleIndent()}return expectedOptions[i] === element.textContent;`,
        `})`,
        '',
        `expect(options.length).toBeGreaterThan(0);`,
        `options[0].click();`]);
    return result;
  }

  emitSelectOptionByValueAction(traverser) {
    let nameTitle = _.upperFirst(traverser.element.name);
    let name = `select${nameTitle}ByValue`;
    let args = ['value'];
    let result = this.methodHeader(traverser, name, args);

    let body = [`const items: any = ${super.referenceToElement(traverser)};`,
      'for (let i = 0; i < items.length; i++) {',
      `${traverser.singleIndent()}if (items[i].value === value) {`,
      `${traverser.singleIndent()}${traverser.singleIndent()}items[i].click();`,
      `${traverser.singleIndent()}}`,
      '}'];

    result += super.methodBody(traverser, body);
    return result;
  }

  emitTextMutatorAction(traverser) {
    let nameTitle = _.upperFirst(traverser.element.name);
    let name = `set${nameTitle}`;
    let args = ['value'];
    let result = this.methodHeader(traverser, name, args);

    let body = [`${super.referenceToElement(traverser)}.value = value;`,
      `${super.referenceToElement(traverser)}.dispatchEvent(new Event('input'));`];

    result += super.methodBody(traverser, body);
    return result;
  }

  emitActionsEnd() {
    return '';
  }

  emitAssertionsStart() {
    return '';
  }

  emitCountAssertion(traverser) {
    let name = `${traverser.element.name}CountShouldBe`;
    let args = ['count'];
    let addIndexArgumentForRepeater = false;
    let result = this.methodHeader(traverser, name, args, addIndexArgumentForRepeater);
    result += super.methodBody(traverser, `expect(${super.referenceToElement(traverser, false)}.length).toBe(count);`);
    return result;
  }

  emitEnabledAssertion(traverser) {
    let name = `${traverser.element.name}ShouldBeEnabled`;
    let args = [];
    let result = this.methodHeader(traverser, name, args);
    result += super.methodBody(traverser, `expect(${super.referenceToElement(traverser)}.disabled).toBeFalse();`);
    result += traverser.newLine();

    name = `${traverser.element.name}ShouldNotBeEnabled`;
    result += this.methodHeader(traverser, name, args);
    result += super.methodBody(traverser, `expect(${super.referenceToElement(traverser)}.disabled).toBeTrue();`);

    return result;
  }

  emitEnabledByIndexAssertion(traverser) {
    let name = `${traverser.element.name}ByIndexShouldBeEnabled`;
    let args = ['index'];
    let result = this.methodHeader(traverser, name, args);
    result += super.methodBody(traverser,
      `expect(${super.referenceToElement(traverser)}[index].disabled).toBeFalse();`);
    result += traverser.newLine();

    name = `${traverser.element.name}ByIndexShouldNotBeEnabled`;
    result += this.methodHeader(traverser, name, args);
    result += super.methodBody(traverser,
      `expect(${super.referenceToElement(traverser)}[index].disabled).toBeTrue();`);

    return result;
  }

  emitHasClassAssertion(traverser) {
    let name = `${traverser.element.name}ShouldHaveClass`;
    let args = ['className'];
    let result = this.methodHeader(traverser, name, args);
    result += super.methodBody(traverser, [`expect(${super.referenceToElement(traverser)}.classList.contains(className)).toBeTrue();`]);
    result += traverser.newLine();

    name = `${traverser.element.name}ShouldNotHaveClass`;
    result += this.methodHeader(traverser, name, args);

    result += super.methodBody(traverser, [`expect(${super.referenceToElement(traverser)}.classList.contains(className)).toBeFalse();`]);

    return result;
  }

  emitOptionSelectedByPartialTextAssertion(traverser) {
    let name = `${traverser.element.name}ByPartialTextShouldBeSelected`;
    let args = [];
    let functionArgumentsCount = super.indexArguments(traverser).length;

    let result = this.methodHeader(traverser, name, args);

    let options = `let options = ${super.referenceToElement(traverser)}.querySelectorAll('option')`;

    let body = ['let expectedOptions: string[] = [];',
      `for (const i = ${functionArgumentsCount}; i < arguments.length; i++) {`,
      `${traverser.singleIndent()}expectedOptions = expectedOptions.concat(arguments[i]);`,
      '}',
      '',
      'for (const i = 0; i < expectedOptions.length; i++) {',
      `${traverser.singleIndent()}${options}`,
      `${traverser.singleIndent()}options = [].filter.call(elements, (element: Element) => {`,
      `${traverser.singleIndent()}${traverser.singleIndent()}return RegExp(expectedOptions[i]).test(element.textContent);`,
      `${traverser.singleIndent()}})`,
      '',
      `${traverser.singleIndent()}options.forEach(option => {`,
      `${traverser.singleIndent()}${traverser.singleIndent()}expect(option.selected).toBeTrue();`,
      `${traverser.singleIndent()}});`,
      '',
      `${traverser.singleIndent()}expect(options.length).toBeGreaterThan(0);`,
      '}'];

    result += super.methodBody(traverser, body);
    result += traverser.newLine();

    name = `${traverser.element.name}ByPartialTextShouldNotBeSelected`;
    result += this.methodHeader(traverser, name, args);

    body = ['let expectedOptions: string[] = [];',
      `for (const i = ${functionArgumentsCount}; i < arguments.length; i++) {`,
      `${traverser.singleIndent()}expectedOptions = expectedOptions.concat(arguments[i]);`,
      '}',
      '',
      'for (const i = 0; i < expectedOptions.length; i++) {',
      `${traverser.singleIndent()}${options}`,
      `${traverser.singleIndent()}options = [].filter.call(elements, (element: Element) => {`,
      `${traverser.singleIndent()}${traverser.singleIndent()}return RegExp(expectedOptions[i]).test(element.textContent);`,
      `${traverser.singleIndent()}})`,
      '',
      `${traverser.singleIndent()}options.forEach(option => {`,
      `${traverser.singleIndent()}${traverser.singleIndent()}expect(option.selected).toBeFalse();`,
      `${traverser.singleIndent()}});`,
      '',
      `${traverser.singleIndent()}expect(options.length).toBeGreaterThan(0);`,
      '}'];

    result += super.methodBody(traverser, body);

    return result;
  }

  emitOptionSelectedByTextAssertion(traverser) {
    let name = `${traverser.element.name}ByTextShouldBeSelected`;
    let args = [];
    let functionArgumentsCount = super.indexArguments(traverser).length;

    let result = this.methodHeader(traverser, name, args);

    let options = `let options = ${super.referenceToElement(traverser)}.querySelectorAll('option')`;

    let body = ['let expectedOptions: string[] = [];',
      `for (const i = ${functionArgumentsCount}; i < arguments.length; i++) {`,
      `${traverser.singleIndent()}expectedOptions = expectedOptions.concat(arguments[i]);`,
      '}',
      '',
      'for (const i = 0; i < expectedOptions.length; i++) {',
      `${traverser.singleIndent()}${options}`,
      `${traverser.singleIndent()}options = [].filter.call(elements, (element: Element) => {`,
      `${traverser.singleIndent()}${traverser.singleIndent()}return expectedOptions[i] === element.textContent;`,
      `${traverser.singleIndent()}})`,
      '',
      `${traverser.singleIndent()}options.forEach(option => {`,
      `${traverser.singleIndent()}${traverser.singleIndent()}expect(option.selected).toBeTrue();`,
      `${traverser.singleIndent()}});`,
      '',
      `${traverser.singleIndent()}expect(options.length).toBeGreaterThan(0);`,
      '}'];

    result += super.methodBody(traverser, body);
    result += traverser.newLine();

    name = `${traverser.element.name}ByTextShouldNotBeSelected`;
    result += this.methodHeader(traverser, name, args);

    body = ['let expectedOptions: string[] = [];',
      `for (const i = ${functionArgumentsCount}; i < arguments.length; i++) {`,
      `${traverser.singleIndent()}expectedOptions = expectedOptions.concat(arguments[i]);`,
      '}',
      '',
      'for (const i = 0; i < expectedOptions.length; i++) {',
      `${traverser.singleIndent()}${options}`,
      `${traverser.singleIndent()}options = [].filter.call(elements, (element: Element) => {`,
      `${traverser.singleIndent()}${traverser.singleIndent()}return expectedOptions[i] === element.textContent;`,
      `${traverser.singleIndent()}})`,
      '',
      `${traverser.singleIndent()}options.forEach(option => {`,
      `${traverser.singleIndent()}${traverser.singleIndent()}expect(option.selected).toBeFalse();`,
      `${traverser.singleIndent()}});`,
      '',
      `${traverser.singleIndent()}expect(options.length).toBeGreaterThan(0);`,
      '}'];

    result += super.methodBody(traverser, body);

    return result;
  }

  emitOptionSelectedByValueAssertion(traverser) {
    let name = `${traverser.element.name}ByValueShouldBeSelected`;
    let args = [];
    let functionArgumentsCount = super.indexArguments(traverser).length;

    let result = this.methodHeader(traverser, name, args);
    let options = `let options = ${super.referenceToElement(traverser)}.querySelectorAll('option')`;

    let body = ['let expectedOptions: string[] = [];',
      `for (const i = ${functionArgumentsCount}; i < arguments.length; i++) {`,
      `${traverser.singleIndent()}expectedOptions = expectedOptions.concat(arguments[i]);`,
      '}',
      '',
      'for (const i = 0; i < expectedOptions.length; i++) {',
      `${traverser.singleIndent()}${options}`,
      `${traverser.singleIndent()}options = [].filter.call(elements, (element: Element) => {`,
      `${traverser.singleIndent()}${traverser.singleIndent()}return expectedOptions[i] === element.value;`,
      `${traverser.singleIndent()}})`,
      '',
      `${traverser.singleIndent()}options.forEach(option => {`,
      `${traverser.singleIndent()}${traverser.singleIndent()}expect(option.selected).toBeTrue();`,
      `${traverser.singleIndent()}});`,
      '',
      `${traverser.singleIndent()}expect(options.length).toBeGreaterThan(0);`,
      '}'];

    result += super.methodBody(traverser, body);
    result += traverser.newLine();

    name = `${traverser.element.name}ByValueShouldNotBeSelected`;
    result += this.methodHeader(traverser, name, args);

    body = ['let expectedOptions: string[] = [];',
      `for (const i = ${functionArgumentsCount}; i < arguments.length; i++) {`,
      `${traverser.singleIndent()}expectedOptions = expectedOptions.concat(arguments[i]);`,
      '}',
      '',
      'for (const i = 0; i < expectedOptions.length; i++) {',
      `${traverser.singleIndent()}${options}`,
      `${traverser.singleIndent()}options = [].filter.call(elements, (element: Element) => {`,
      `${traverser.singleIndent()}${traverser.singleIndent()}return expectedOptions[i] === element.value;`,
      `${traverser.singleIndent()}})`,
      '',
      `${traverser.singleIndent()}options.forEach(option => {`,
      `${traverser.singleIndent()}${traverser.singleIndent()}expect(option.selected).toBeFalse();`,
      `${traverser.singleIndent()}});`,
      '',
      `${traverser.singleIndent()}expect(options.length).toBeGreaterThan(0);`,
      '}'];

    result += super.methodBody(traverser, body);

    return result;
  }

  emitSelectedAssertion(traverser) {
    let name = `${traverser.element.name}ShouldBeSelected`;
    let args = [];
    let result = this.methodHeader(traverser, name, args);
    result += super.methodBody(traverser, `expect(${super.referenceToElement(traverser)}.selected).toBeTrue();`);
    result += traverser.newLine();

    name = `${traverser.element.name}ShouldNotBeSelected`;
    result += this.methodHeader(traverser, name, args);
    result += super.methodBody(traverser, `expect(${super.referenceToElement(traverser)}.selected).toBeFalse();`);

    return result;
  }

  emitSelectedByIndexAssertion(traverser) {
    let name = `${traverser.element.name}ByIndexShouldBeSelected`;
    let args = ['index'];
    let result = this.methodHeader(traverser, name, args);
    result += super.methodBody(traverser,
      `expect(${super.referenceToElement(traverser)}[index].selected).toBeTrue();`);
    result += traverser.newLine();

    name = `${traverser.element.name}ByIndexShouldNotBeSelected`;
    result += this.methodHeader(traverser, name, args);
    result += super.methodBody(traverser,
      `expect(${super.referenceToElement(traverser)}[index].selected).toBeFalse();`);

    return result;
  }

  emitSelectedByValueAssertion(traverser) {
    let name = `${traverser.element.name}ByValueShouldBeSelected`;
    let args = ['value'];
    let result = this.methodHeader(traverser, name, args);

    result += super.methodBody(traverser, this.getSelectedByValueAssertionBody(traverser, true));
    result += traverser.newLine();

    name = `${traverser.element.name}ByValueShouldNotBeSelected`;
    result += this.methodHeader(traverser, name, args);
    result += super.methodBody(traverser, this.getSelectedByValueAssertionBody(traverser, false));

    return result;
  }

  getSelectedByValueAssertionBody(traverser, shouldBeSelected) {
    let body = [`${super.referenceToElement(traverser)}.forEach((elem) => {`,
      `${traverser.singleIndent()} if (elem.selected) {`,
      `${traverser.singleIndent()}${traverser.singleIndent()} expect(elem.value)${shouldBeSelected ? '' : '.not'}.toEqual(value);`,
      `${traverser.singleIndent()}${traverser.singleIndent()} return;`,
      `${traverser.singleIndent()}}`
      ];

    if (shouldBeSelected) {
      body.push(`${traverser.singleIndent()} fail('Element is not selected');`);
    }
    body.push('});');
    return body;
  }

  emitTextAssertion(traverser) {
    let name = `${traverser.element.name}ShouldHaveText`;
    let args = ['value'];
    let result = this.methodHeader(traverser, name, args);
    result += super.methodBody(traverser, `expect(${super.referenceToElement(traverser)}.textContent).toBe(value);`);
    return result;
  }

  emitValueAssertion(traverser) {
    let nameTitle = _.upperFirst(traverser.element.name);
    let name = `shouldHave${nameTitle}`;
    let args = ['value'];
    let result = this.methodHeader(traverser, name, args);
    result += super.methodBody(traverser,
      `expect(${super.referenceToElement(traverser)}.value).toEqual(value);`);
    return result;
  }

  emitVisibilityAssertion(traverser) {
    let name = `${traverser.element.name}ShouldBeVisible`;
    let args = [];
    let result = this.methodHeader(traverser, name, args);
    result += super.methodBody(traverser, `expect(${super.referenceToElement(traverser)}).not.toBeNull();`);
    result += traverser.newLine();

    name = `${traverser.element.name}ShouldNotBeVisible`;
    result += this.methodHeader(traverser, name, args);
    result += super.methodBody(traverser, `expect(${super.referenceToElement(traverser)}).toBeNull();`);

    return result;
  }

  emitVisibilityByIndexAssertion(traverser) {
    let name = `${traverser.element.name}ByIndexShouldBeVisible`;
    let args = ['index'];
    let result = this.methodHeader(traverser, name, args);
    result += super.methodBody(traverser,
      `expect(${super.referenceToElement(traverser)}[index]).not.toBeNull();`);
    result += traverser.newLine();

    name = `${traverser.element.name}ByIndexShouldNotBeVisible`;
    result += this.methodHeader(traverser, name, args);
    result += super.methodBody(traverser,
      `expect(${super.referenceToElement(traverser)}[index]).toBeNull();`);

    return result;
  }


  emitAssertionsEnd() {
    return '';
  }

  emitFooter(traverser) {
    return '}';
  }

  methodHeader(traverser, name, args, addIndexArgumentForRepeater = true) {
    let indexArguments = super.indexArguments(traverser, addIndexArgumentForRepeater);
    args = [...indexArguments, ...args];

    return `public ${name}(${args.join(', ')}): void `;
  }
}

module.exports = ComponentTestTypescriptEmitter;