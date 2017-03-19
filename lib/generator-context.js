"use strict";

const hasRepeaterAttribute = require('./attribute/attributes').hasRepeaterAttribute;
const NgRepeatLocatorPartGenerator = require('./locator/ng-repeat-locator-part-generator');

class GeneratorContext {

  constructor(document, source, applicationType, frameworkConfig, language) {
    this._document = document;
    this._source = source;
    this._applicationType = applicationType;
    this._frameworkConfig = frameworkConfig;
    this._language = language;
    this._locatorPartGenerators = [];
    this._controllers = [];
  }

  set element(element) {
    this._element = element;
    this._name = null;
    this._locator = null;
    this._controlIndexGenerated = false;
    this._repeaterElement = hasRepeaterAttribute(element);
    this.unstashRepeaterLocatorPartGenerator();
  }

  pushNgRepeat(element, repeaterExpression) {
    this._locatorPartGenerators.push(new NgRepeatLocatorPartGenerator(element, repeaterExpression));
  }

  pushLocatorPartGenerator(locatorPartGenerator) {
    this._locatorPartGenerators.push(locatorPartGenerator);
  }

  popLocatorPartGenerator() {
    return this._locatorPartGenerators.pop();
  }

  unstashRepeaterLocatorPartGenerator() {
    if (this._stashedLocatorPartGenerator != null) {
      this._locatorPartGenerators.push(this._stashedLocatorPartGenerator);
      this._stashedLocatorPartGenerator = null;
    }
  }

  getLastRepeaterElement() {
    return this._locatorPartGenerators[this._locatorPartGenerators.length - 2].element;
  }

  isNestedElement() {
    return this._locatorPartGenerators.length > 1;
  }

  getNameSources() {
    return this._frameworkConfig.nameSources(this._applicationType);
  }

  pushController(controllerName) {
    this._controllers.push(controllerName);
  }

  popController() {
    this._controllers.pop();
  }

  getControllerNames() {
    return this._controllers;
  }

  get document() {
    return this._document;
  }

  get element() {
    return this._element;
  }

  get source() {
    return this._source;
  }
}

module.exports = GeneratorContext;