"use strict";

const _ = require('lodash');
const ProtractorEmitter = require('./protractor-emitter');

class ProtractorEs5Emitter extends ProtractorEmitter {

  constructor(config) {
    super();
    this.separator = config.pageObject.newLineCharacter;
    this.indentOnHeader = true;
    this.unindentOnFooter = true;
  }

  emitHeader(traverser) {
    return `var ${traverser.page.name} = function () {`;
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
    result += super.methodBody(traverser, `${super.referenceToElement(traverser)}.click();`);
    return result;
  }

  emitClickByIndexAction(traverser) {
    let nameTitle = _.upperFirst(traverser.element.name);
    let name = `click${nameTitle}ByIndex`;
    let args = ['index'];
    let result = this.methodHeader(traverser, name, args);
    result += super.methodBody(traverser, `${super.referenceToElement(traverser)}.get(index).click();`);
    return result;
  }

  emitClickByValueAction(traverser) {
    let nameTitle = _.upperFirst(traverser.element.name);
    let name = `click${nameTitle}ByValue`;
    let args = ['value'];
    let result = this.methodHeader(traverser, name, args);

    let body = [`${super.referenceToElement(traverser)}.filter(function (elem) {`,
                `${traverser.singleIndent()}return elem.getAttribute('value').then(function (attribute) {`,
                `${traverser.singleIndent()}${traverser.singleIndent()}return attribute === value;`,
                `${traverser.singleIndent()}});`,
                '}).then(function (filteredElements) {',
                `${traverser.singleIndent()}filteredElements[0].click();`,
                '});'];

    result += super.methodBody(traverser, body);
    return result;
  }

  emitDateMutatorAction(traverser) {
    let nameTitle = _.upperFirst(traverser.element.name);
    let name = `set${nameTitle}`;
    let args = ['value'];
    let result = this.methodHeader(traverser, name, args);

    let body = ['// https://github.com/angular/protractor/issues/562',
                `var element = ${super.referenceToElement(traverser)};`,
                `element.getAttribute('value').then(function (text) {`,
                `${traverser.singleIndent()}var backspaceSeries = Array(text.length + 1).join(protractor.Key.BACK_SPACE);`,
                `${traverser.singleIndent()}element.sendKeys(backspaceSeries);`,
                `${traverser.singleIndent()}element.sendKeys(value);`,
                '});'];

    result += super.methodBody(traverser, body);
    return result;
  }

  emitSelectOptionByPartialTextAction(traverser) {
    let nameTitle = _.upperFirst(traverser.element.name);
    let name = `select${nameTitle}ByPartialText`;
    let args = ['text'];
    let result = this.methodHeader(traverser, name, args);
    result += super.methodBody(traverser,
                               `${super.referenceToElement(traverser)}.all(by.cssContainingText('option', text)).click();`);
    return result;
  }

  emitSelectOptionByTextAction(traverser) {
    let nameTitle = _.upperFirst(traverser.element.name);
    let name = `select${nameTitle}ByText`;
    let args = ['text'];
    let result = this.methodHeader(traverser, name, args);
    result += super.methodBody(traverser,
                               `${super.referenceToElement(traverser)}.all(by.xpath('option[.="' + text + '"]')).click();`);
    return result;
  }

  emitSelectOptionByValueAction(traverser) {
    let nameTitle = _.upperFirst(traverser.element.name);
    let name = `select${nameTitle}ByValue`;
    let args = ['value'];
    let result = this.methodHeader(traverser, name, args);
    result += super.methodBody(traverser,
                               `${super.referenceToElement(traverser)}.all(by.css('option[value="' + value + '"]')).click();`);
    return result;
  }

  emitTextMutatorAction(traverser) {
    let nameTitle = _.upperFirst(traverser.element.name);
    let name = `set${nameTitle}`;
    let args = ['value'];
    let result = this.methodHeader(traverser, name, args);

    let body = [`${super.referenceToElement(traverser)}.clear();`,
                `${super.referenceToElement(traverser)}.sendKeys(value);`];

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
    result += super.methodBody(traverser, `expect(${super.referenceToElement(traverser, false)}.count()).toBe(count);`);
    return result;
  }

  emitEnabledAssertion(traverser) {
    let name = `${traverser.element.name}ShouldBeEnabled`;
    let args = [];
    let result = this.methodHeader(traverser, name, args);
    result += super.methodBody(traverser, `expect(${super.referenceToElement(traverser)}.isEnabled()).toBeTrue();`);
    result += traverser.newLine();

    name = `${traverser.element.name}ShouldNotBeEnabled`;
    result += this.methodHeader(traverser, name, args);
    result += super.methodBody(traverser, `expect(${super.referenceToElement(traverser)}.isEnabled()).toBeFalse();`);

    return result;
  }

  emitEnabledByIndexAssertion(traverser) {
    let name = `${traverser.element.name}ByIndexShouldBeEnabled`;
    let args = ['index'];
    let result = this.methodHeader(traverser, name, args);
    result += super.methodBody(traverser,
                               `expect(${super.referenceToElement(traverser)}.get(index).isEnabled()).toBeTrue();`);
    result += traverser.newLine();

    name = `${traverser.element.name}ByIndexShouldNotBeEnabled`;
    result += this.methodHeader(traverser, name, args);
    result += super.methodBody(traverser,
                               `expect(${super.referenceToElement(traverser)}.get(index).isEnabled()).toBeFalse();`);

    return result;
  }

  emitHasClassAssertion(traverser) {
    let name = `${traverser.element.name}ShouldHaveClass`;
    let args = ['className'];
    let result = this.methodHeader(traverser, name, args);

    let body = [`${super.referenceToElement(traverser)}.getAttribute('class').then(function (classes) {`,
                `${traverser.singleIndent()}expect(classes.split(' ').indexOf(className) !== -1).toBeTrue();`,
                '});'];

    result += super.methodBody(traverser, body);
    result += traverser.newLine();

    name = `${traverser.element.name}ShouldNotHaveClass`;
    result += this.methodHeader(traverser, name, args);

    body = [`${super.referenceToElement(traverser)}.getAttribute('class').then(function (classes) {`,
            `${traverser.singleIndent()}expect(classes.split(' ').indexOf(className) === -1).toBeTrue();`,
            '});'];

    result += super.methodBody(traverser, body);

    return result;
  }

  emitOptionSelectedByPartialTextAssertion(traverser) {
    let name = `${traverser.element.name}ByPartialTextShouldBeSelected`;
    let args = [];
    let functionArgumentsCount = super.indexArguments(traverser).length;

    let result = this.methodHeader(traverser, name, args);

    let body = ['var expectedOptions = [];',
                `for (var i = ${functionArgumentsCount}; i < arguments.length; i++) {`,
                `${traverser.singleIndent()}expectedOptions = expectedOptions.concat(arguments[i]);`,
                '}',
                '',
                'for (i = 0; i < expectedOptions.length; i++) {',
                `${traverser.singleIndent()}var options = ${super.referenceToElement(traverser)}.all(by.cssContainingText('option', expectedOptions[i]));`,
                '',
                `${traverser.singleIndent()}options.each(function (option) {`,
                `${traverser.singleIndent()}${traverser.singleIndent()}expect(option.isSelected()).toBeTrue();`,
                `${traverser.singleIndent()}});`,
                '',
                `${traverser.singleIndent()}expect(options.count()).toBeGreaterThan(0);`,
                '}'];

    result += super.methodBody(traverser, body);
    result += traverser.newLine();

    name = `${traverser.element.name}ByPartialTextShouldNotBeSelected`;
    result += this.methodHeader(traverser, name, args);

    body = ['var expectedOptions = [];',
            `for (var i = ${functionArgumentsCount}; i < arguments.length; i++) {`,
            `${traverser.singleIndent()}expectedOptions = expectedOptions.concat(arguments[i]);`,
            '}',
            '',
            'for (i = 0; i < expectedOptions.length; i++) {',
            `${traverser.singleIndent()}${super.referenceToElement(traverser)}.all(by.cssContainingText('option', expectedOptions[i])).each(function (option) {`,
            `${traverser.singleIndent()}${traverser.singleIndent()}expect(option.isSelected()).toBeFalse();`,
            `${traverser.singleIndent()}});`,
            '}'];

    result += super.methodBody(traverser, body);

    return result;
  }

  emitOptionSelectedByTextAssertion(traverser) {
    let name = `${traverser.element.name}ByTextShouldBeSelected`;
    let args = [];
    let functionArgumentsCount = super.indexArguments(traverser).length;

    let result = this.methodHeader(traverser, name, args);

    let body = ['var expectedOptions = [];',
                `for (var i = ${functionArgumentsCount}; i < arguments.length; i++) {`,
                `${traverser.singleIndent()}expectedOptions = expectedOptions.concat(arguments[i]);`,
                '}',
                '',
                'for (i = 0; i < expectedOptions.length; i++) {',
                `${traverser.singleIndent()}var options = ${super.referenceToElement(traverser)}.all(by.xpath('option[.="' + expectedOptions[i] + '"]'));`,
                '',
                `${traverser.singleIndent()}options.each(function (option) {`,
                `${traverser.singleIndent()}${traverser.singleIndent()}expect(option.isSelected()).toBeTrue();`,
                `${traverser.singleIndent()}});`,
                '',
                `${traverser.singleIndent()}expect(options.count()).toBeGreaterThan(0);`,
                '}'];

    result += super.methodBody(traverser, body);
    result += traverser.newLine();

    name = `${traverser.element.name}ByTextShouldNotBeSelected`;
    result += this.methodHeader(traverser, name, args);

    body = ['var expectedOptions = [];',
            `for (var i = ${functionArgumentsCount}; i < arguments.length; i++) {`,
            `${traverser.singleIndent()}expectedOptions = expectedOptions.concat(arguments[i]);`,
            '}',
            '',
            'for (i = 0; i < expectedOptions.length; i++) {',
            `${traverser.singleIndent()}${super.referenceToElement(traverser)}.all(by.xpath('option[.="' + expectedOptions[i] + '"]')).each(function(option) {`,
            `${traverser.singleIndent()}${traverser.singleIndent()}expect(option.isSelected()).toBeFalse();`,
            `${traverser.singleIndent()}});`,
            '}'];

    result += super.methodBody(traverser, body);

    return result;
  }

  emitOptionSelectedByValueAssertion(traverser) {
    let name = `${traverser.element.name}ByValueShouldBeSelected`;
    let args = [];
    let functionArgumentsCount = super.indexArguments(traverser).length;

    let result = this.methodHeader(traverser, name, args);

    let body = ['var expectedOptions = [];',
                `for (var i = ${functionArgumentsCount}; i < arguments.length; i++) {`,
                `${traverser.singleIndent()}expectedOptions = expectedOptions.concat(arguments[i]);`,
                '}',
                '',
                'for (i = 0; i < expectedOptions.length; i++) {',
                `${traverser.singleIndent()}var options = ${super.referenceToElement(traverser)}.all(by.css('option[value="' + expectedOptions[i] + '"]'));`,
                '',
                `${traverser.singleIndent()}options.each(function (option) {`,
                `${traverser.singleIndent()}${traverser.singleIndent()}expect(option.isSelected()).toBeTrue();`,
                `${traverser.singleIndent()}});`,
                '',
                `${traverser.singleIndent()}expect(options.count()).toBeGreaterThan(0);`,
                '}'];

    result += super.methodBody(traverser, body);
    result += traverser.newLine();

    name = `${traverser.element.name}ByValueShouldNotBeSelected`;
    result += this.methodHeader(traverser, name, args);

    body = ['var expectedOptions = [];',
            `for (var i = ${functionArgumentsCount}; i < arguments.length; i++) {`,
            `${traverser.singleIndent()}expectedOptions = expectedOptions.concat(arguments[i]);`,
            '}',
            '',
            'for (i = 0; i < expectedOptions.length; i++) {',
            `${traverser.singleIndent()}${super.referenceToElement(traverser)}.all(by.css('option[value="' + expectedOptions[i] + '"]')).each(function(option) {`,
            `${traverser.singleIndent()}${traverser.singleIndent()}expect(option.isSelected()).toBeFalse();`,
            `${traverser.singleIndent()}});`,
            '}'];

    result += super.methodBody(traverser, body);

    return result;
  }

  emitSelectedAssertion(traverser) {
    let name = `${traverser.element.name}ShouldBeSelected`;
    let args = [];
    let result = this.methodHeader(traverser, name, args);
    result += super.methodBody(traverser, `expect(${super.referenceToElement(traverser)}.isSelected()).toBeTrue();`);
    result += traverser.newLine();

    name = `${traverser.element.name}ShouldNotBeSelected`;
    result += this.methodHeader(traverser, name, args);
    result += super.methodBody(traverser, `expect(${super.referenceToElement(traverser)}.isSelected()).toBeFalse();`);

    return result;
  }

  emitSelectedByIndexAssertion(traverser) {
    let name = `${traverser.element.name}ByIndexShouldBeSelected`;
    let args = ['index'];
    let result = this.methodHeader(traverser, name, args);
    result += super.methodBody(traverser,
                               `expect(${super.referenceToElement(traverser)}.get(index).isSelected()).toBeTrue();`);
    result += traverser.newLine();

    name = `${traverser.element.name}ByIndexShouldNotBeSelected`;
    result += this.methodHeader(traverser, name, args);
    result += super.methodBody(traverser,
                               `expect(${super.referenceToElement(traverser)}.get(index).isSelected()).toBeFalse();`);

    return result;
  }

  emitSelectedByValueAssertion(traverser) {
    let name = `${traverser.element.name}ByValueShouldBeSelected`;
    let args = ['value'];
    let result = this.methodHeader(traverser, name, args);

    let body = [`${super.referenceToElement(traverser)}.filter(function (elem) {`,
                `${traverser.singleIndent()}return elem.isSelected();`,
                '}).then(function (filteredElements) {',
                `${traverser.singleIndent()}expect(filteredElements[0].getAttribute('value')).toEqual(value);`,
                '});'];

    result += super.methodBody(traverser, body);
    result += traverser.newLine();

    name = `${traverser.element.name}ByValueShouldNotBeSelected`;
    result += this.methodHeader(traverser, name, args);

    body = [`${super.referenceToElement(traverser)}.filter(function (elem) {`,
            `${traverser.singleIndent()}return elem.isSelected();`,
            '}).then(function (filteredElements) {',
            `${traverser.singleIndent()}if (filteredElements.length > 0) {`,
            `${traverser.singleIndent()}${traverser.singleIndent()}expect(filteredElements[0].getAttribute('value')).not.toEqual(value);`,
            `${traverser.singleIndent()}}`,
            '});'];

    result += super.methodBody(traverser, body);

    return result;
  }

  emitTextAssertion(traverser) {
    let name = `${traverser.element.name}ShouldHaveText`;
    let args = ['value'];
    let result = this.methodHeader(traverser, name, args);
    result += super.methodBody(traverser, `expect(${super.referenceToElement(traverser)}.getText()).toBe(value);`);
    return result;
  }

  emitValueAssertion(traverser) {
    let nameTitle = _.upperFirst(traverser.element.name);
    let name = `shouldHave${nameTitle}`;
    let args = ['value'];
    let result = this.methodHeader(traverser, name, args);
    result += super.methodBody(traverser,
                               `expect(${super.referenceToElement(traverser)}.getAttribute('value')).toEqual(value);`);
    return result;
  }

  emitVisibilityAssertion(traverser) {
    let name = `${traverser.element.name}ShouldBeVisible`;
    let args = [];
    let result = this.methodHeader(traverser, name, args);
    result += super.methodBody(traverser, `expect(${super.referenceToElement(traverser)}.isDisplayed()).toBeTrue();`);
    result += traverser.newLine();

    name = `${traverser.element.name}ShouldNotBeVisible`;
    result += this.methodHeader(traverser, name, args);
    result += super.methodBody(traverser, `expect(${super.referenceToElement(traverser)}.isDisplayed()).toBeFalse();`);

    return result;
  }

  emitVisibilityByIndexAssertion(traverser) {
    let name = `${traverser.element.name}ByIndexShouldBeVisible`;
    let args = ['index'];
    let result = this.methodHeader(traverser, name, args);
    result += super.methodBody(traverser,
                               `expect(${super.referenceToElement(traverser)}.get(index).isDisplayed()).toBeTrue();`);
    result += traverser.newLine();

    name = `${traverser.element.name}ByIndexShouldNotBeVisible`;
    result += this.methodHeader(traverser, name, args);
    result += super.methodBody(traverser,
                               `expect(${super.referenceToElement(traverser)}.get(index).isDisplayed()).toBeFalse();`);

    return result;
  }


  emitAssertionsEnd() {
    return '';
  }

  emitFooter(traverser) {
    let footer = '};';
    footer += traverser.newLine();
    footer += traverser.newLine();
    footer += `module.exports = ${traverser.page.name};`;
    return footer;
  }

  methodHeader(traverser, name, args, addIndexArgumentForRepeater = true) {
    let indexArguments = super.indexArguments(traverser, addIndexArgumentForRepeater);
    args = [...indexArguments, ...args];

    return `this.${name} = function (${args.join(', ')})`;
  }
}

module.exports = ProtractorEs5Emitter;