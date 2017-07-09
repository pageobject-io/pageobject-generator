"use strict";

const Element = require('./element');
const addElementTo = require('./page-utils');

class Section extends Element {

  constructor(domElement, parent) {
    super(domElement, parent);
    this._elements = [];
  }

  addElement(domElement) {
    return addElementTo(domElement, this._elements, Element, this);
  }

  addSection(domElement) {
    return addElementTo(domElement, this._elements, Section, this);
  }

  get elements() {
    return this._elements;
  }
}

module.exports = Section;