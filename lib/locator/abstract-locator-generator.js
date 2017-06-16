"use strict";

const _ = require('lodash');
const Locator = require('./locator');
const replaceIndexBindingWithFunctionParameter = require('../expressions').replaceIndexBindingWithFunctionParameter;

class AbstractLocatorGenerator {

  constructor(locatorStrategies) {
    this._locatorStrategies = locatorStrategies;
    this._usedLocators = new Set();

    if (new.target === AbstractLocatorGenerator) {
      throw new TypeError("Cannot construct AbstractLocatorGenerator instances directly");
    }

    if (this.getSupportedNestedElements === undefined) {
      throw new TypeError("Must override method getSupportedNestedElements");
    }

    if (this.onlyPart === undefined) {
      throw new TypeError("Must override method onlyPart");
    }

    if (this.firstPart === undefined) {
      throw new TypeError("Must override method firstPart");
    }

    if (this.middlePart === undefined) {
      throw new TypeError("Must override method middlePart");
    }

    if (this.lastPart === undefined) {
      throw new TypeError("Must override method lastPart");
    }
  }

  generate(element) {
    let elements = element.getAncestorsOfType.apply(element, this.getSupportedNestedElements());
    elements.push(element);

    if (elements.length == 1) {
      return this.onlyPart(elements[0]);
    } else {
      let parts = [];
      parts.push(this.firstPart(elements[0]));

      for (let i = 1; i < elements.length - 1; i++) {
        parts.push(this.middlePart(elements[i], i));
      }

      let lastLocator = this.lastPart(elements[elements.length - 1], elements.length - 1);
      parts.push(lastLocator ? lastLocator.selector : null);

      return _.some(parts, part => _.isNull(part)) ? null : new Locator(parts.join('.'), lastLocator.strategy, lastLocator.nativeSelector);
    }
  }

  generateLocatorPart(element, elementFinder, depth) {
    for (let strategy of this._locatorStrategies) {
      let locator = strategy.locator(element);

      if (!_.isEmpty(locator)) {
        locator = replaceIndexBindingWithFunctionParameter(locator, depth);

        if (!this._usedLocators.has(locator)) {
          this._usedLocators.add(locator);
          return new Locator(`${elementFinder}(${locator})`, strategy, locator);
        }
      }
    }

    return null;
  }

}

module.exports = AbstractLocatorGenerator;