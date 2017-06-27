"use strict";

const Page = require('./page/page');
const NG_FOR = require('./types').NG_FOR;
const NG_REPEAT = require('./types').NG_REPEAT;

class GeneratorContext {

  constructor(document, source) {
    this._document = document;
    this._domElement = document;
    this._source = source;
    this._page = new Page(source.indexOf('<body') === -1);
    this._parentPageElement = this._page;
  }

  addPageElement() {
    this._pageElement = this._parentPageElement.addElement(this._domElement);
    return this._pageElement;
  }

  addPageSection() {
    this._pageElement = this._parentPageElement.addSection(this._domElement);
    return this._pageElement;
  }

  setTraversePageTreeDownBeforeChildren() {
    this._traversePageTreeDownBeforeChildren = true;
  }

  get traversePageTreeDownBeforeChildren() {
    return this._traversePageTreeDownBeforeChildren;
  }

  setTraversePageTreeUpAfterChildren() {
    this._traversePageTreeUpAfterChildren = true;
  }

  get traversePageTreeUpAfterChildren() {
    return this._traversePageTreeUpAfterChildren;
  }

  traversePageTreeDown() {
    this._parentPageElement = this._pageElement;
  }

  traversePageTreeUp() {
    this._parentPageElement = this._parentPageElement.parent;
  }

  getLastRepeater() {
    if (this._parentPageElement.hasAnyType && this._parentPageElement.hasAnyType(NG_FOR, NG_REPEAT)) {
      return this._parentPageElement;
    }

    let repeaterAncestors = this._parentPageElement.getAncestorsOfType ?
                            this._parentPageElement.getAncestorsOfType(NG_FOR, NG_REPEAT) :
      [];
    return repeaterAncestors.length > 0 ? repeaterAncestors.pop() : null;
  }

  set domElement(element) {
    this._domElement = element;
    this._traversePageTreeDownBeforeChildren = false;
    this._traversePageTreeUpAfterChildren = false;
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

  get page() {
    return this._page;
  }
}

module.exports = GeneratorContext;