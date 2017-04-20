"use strict";

const hasRepeaterAttribute = require('./dom/attributes').hasRepeaterAttribute;
const Page = require('./page/page');

class GeneratorContext {

  constructor(document, source, config) {
    this._document = document;
    this._domElement = document;
    this._source = source;
    this._config = config;
    this._page = new Page();
    this._pageElement = this._page;
    this._locatorPartGenerators = [];
    this._controllers = [];
  }

  addPageElement() {
    return this._pageElement.addElement(this._domElement);
  }

  set domElement(element) {
    this._domElement = element;
    this._name = null;
    this._locator = null;
    this._controlIndexGenerated = false;
    this._repeaterElement = hasRepeaterAttribute(element);
  }

  isNestedElement() {
    return this._locatorPartGenerators.length > 1;
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

  get domElement() {
    return this._domElement;
  }

  get source() {
    return this._source;
  }

  get elementProcessors() {
    return this._config.elementProcessors;
  }

  get nameSources() {
    return this._config.nameSources;
  }
}

module.exports = GeneratorContext;