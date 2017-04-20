"use strict";

const _ = require('lodash');

class Element {

  constructor(domElement, parent) {
    this._domElement = domElement;
    this._parent = parent;
    this._actions = new Set();
    this._assertions = new Set();
    this._types = new Set();
    this._errors = [];
  }

  addActions(...actions) {
    for (let action of actions) {
      this._actions.add(action);
    }
  }

  addAssertions(...assertions) {
    for (let assertion of assertions) {
      this._assertions.add(assertion);
    }
  }

  addTypes(...types) {
    for (let type of types) {
      this._types.add(type);
    }
  }

  hasType(type) {
    return this._types.has(type);
  }

  hasAnyType(...types) {
    for (let type of types) {
      if (this.hasType(type)) {
        return true;
      }
    }

    return false;
  }

  getAncestors() {
    let elements = [];

    let currentElement = this;
    while (currentElement.parent) {
      currentElement = currentElement.parent;

      if (currentElement.parent) {
        elements.unshift(currentElement);
      }
    }

    return elements;
  }

  getAncestorsOfType(...types) {
    let elements = this.getAncestors();
    keepOnlyElementsOfTypes(elements, types);
    return elements;
  }

  get page() {
    let currentElement = this;
    while (currentElement.parent) {
      currentElement = currentElement.parent;
    }

    return currentElement;
  }

  get name() {
    return this._name;
  }

  set name(name) {
    this._name = name;
  }

  get domElement() {
    return this._domElement;
  }

  get actions() {
    return this._actions;
  }

  get assertions() {
    return this._assertions;
  }

  get types() {
    return this._types;
  }

  get parent() {
    return this._parent;
  }

  get locator() {
    return this._locator;
  }

  set locator(locator) {
    this._locator = locator;
  }
}

function keepOnlyElementsOfTypes(elements, types) {
  _.remove(elements, (element) => {
    return !_.some(types, (type) => element.types.has(type));
  });
}

module.exports = Element;