"use strict";

const AbstractLocatorStrategy = require('../../../locator/abstract-locator-strategy');
const _ = require('lodash');
const generateCssSelector = require('../../../dom/elements').generateCssSelector;

const template = _.template("'<%= value %>'");

class NativeCssLocatorStrategy extends AbstractLocatorStrategy {

  extractLocatorValue(element) {
    return generateCssSelector(element);
  }

  locatorTemplate() {
    return template;
  }

}

module.exports = NativeCssLocatorStrategy;