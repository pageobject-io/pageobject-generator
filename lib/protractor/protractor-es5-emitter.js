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