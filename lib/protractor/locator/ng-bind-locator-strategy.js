"use strict";

const AbstractLocatorStrategy = require('../../locator/abstract-locator-strategy');
const _ = require('lodash');
const extractAttributeValue = require('../../dom/attributes').extractAttributeValue;
const HtmlAttribute = require('../../dom/html-attribute');

const template = _.template("by.exactBinding('<%= value %>')");

class NgBindLocatorStrategy extends AbstractLocatorStrategy {

  extractLocatorValue(element) {
    return extractAttributeValue(element.domElement, HtmlAttribute.NG_BIND);
  }

  locatorTemplate() {
    return template;
  }

}

module.exports = NgBindLocatorStrategy;