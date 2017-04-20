"use strict";

const Element = require('./element');
const Section = require('./section');
const addElementTo = require('./page-utils');

class Page {

  constructor(fragment = false) {
    this._elements = [];
    this._fragment = fragment;
  }

  addElement(domElement) {
    return addElementTo(domElement, this._elements, Element, this);
  }

  addSection(domElement) {
    return addElementTo(domElement, this._elements, Section, this);
  }

  isFragment() {
    return this._fragment;
  }

  get name() {
    return this._name;
  }

  set name(name) {
    this._name = name;
  }

  get url() {
    return this._url;
  }

  set url(url) {
    this._url = url;
  }

  get elements() {
    return this._elements;
  }

}

module.exports = Page;