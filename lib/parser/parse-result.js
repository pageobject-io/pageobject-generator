"use strict";

class ParseResult {

  constructor(document, componentName) {
    this._document = document;
    this._componentName = componentName;
  }

  set document(document) {
    this._document = document
  }

  get document() {
    return this._document;
  }

  set componentName(componentName) {
    this._componentName = componentName;
  }

  get componentName() {
    return this._componentName;
  }

  isComponentContext() {
    return this._componentName !== undefined && this._componentName !== null;
  }
}

module.exports = ParseResult;