"use strict";

const AbstractLocatorStrategy = require('../../locator/abstract-locator-strategy');
const _ = require('lodash');
const HtmlAttribute = require('../../dom/html-attribute');
const extractAttributeValueAllowingIndexExpression = require('../../dom/attributes').extractAttributeValueAllowingIndexExpression;

const template = _.template("by.model('<%= value %>')");

class NgModelLocatorStrategy extends AbstractLocatorStrategy {

  extractLocatorValue(element) {
    return extractAttributeValueAllowingIndexExpression(element.domElement, HtmlAttribute.NG_MODEL);
  }

  locatorTemplate() {
    return template;
  }

}

module.exports = NgModelLocatorStrategy;