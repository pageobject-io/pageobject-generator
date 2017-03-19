"use strict";

const _ = require('lodash');

class AbstractLocatorSource {

  constructor() {
    if (new.target === AbstractLocatorSource) {
      throw new TypeError("Cannot construct AbstractLocatorSource instances directly");
    }

    if (this.locatorTemplate === undefined) {
      throw new TypeError("Must override method locatorTemplate");
    }

    if (this.extractLocatorValue === undefined) {
      throw new TypeError("Must override method extractLocatorValue");
    }
  }

  locator(context) {
    let value = this.extractLocatorValue(context);
    return _.isEmpty(value) ? null : this.locatorTemplate()({'value': value}).replace(/'`/g, '`').replace(/`'/g, '`');
  }

}

module.exports = AbstractLocatorSource;