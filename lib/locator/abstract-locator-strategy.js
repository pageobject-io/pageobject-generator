"use strict";

const _ = require('lodash');
const replaceIndexBindingWithFunctionParameter = require('../expressions').replaceIndexBindingWithFunctionParameter;

class AbstractLocatorStrategy {

  constructor() {
    if (new.target === AbstractLocatorStrategy) {
      throw new TypeError("Cannot construct AbstractLocatorStrategy instances directly");
    }

    if (this.locatorTemplate === undefined) {
      throw new TypeError("Must override method locatorTemplate");
    }

    if (this.extractLocatorValue === undefined) {
      throw new TypeError("Must override method extractLocatorValue");
    }
  }

  locator(element, depth) {
    let value = this.extractLocatorValue(element);
    return _.isEmpty(value) ?
           null :
           this.locatorTemplate()({'value': replaceIndexBindingWithFunctionParameter(value, depth)})
               .replace(/'`/g, '`')
               .replace(/`'/g, '`');
  }

}

module.exports = AbstractLocatorStrategy;