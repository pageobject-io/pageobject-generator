"use strict";

const AbstractLocatorSource = require('../abstract-locator-source');
const _ = require('lodash');
const generateCssSelector = require('../../element/elements').generateCssSelector;

const template = _.template("by.css('<%= value %>')");

class CssLocatorSource extends AbstractLocatorSource {

  extractLocatorValue(context) {
    return generateCssSelector(context.element, context);
  }

  locatorTemplate() {
    return template;
  }

}

module.exports = CssLocatorSource;