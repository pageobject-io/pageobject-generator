"use strict";

const AbstractLocatorStrategy = require('../../locator/abstract-locator-strategy');
const _ = require('lodash');
const HtmlAttribute = require('../../dom/html-attribute');
const extractAttributeValueAllowingIndexExpression = require('../../dom/attributes').extractAttributeValueAllowingIndexExpression;

const template = _.template("by.options('<%= value %>')");

class NgOptionsLocatorStrategy extends AbstractLocatorStrategy {

  extractLocatorValue(element) {
    return extractAttributeValueAllowingIndexExpression(element.domElement, HtmlAttribute.NG_OPTIONS);
  }

  locatorTemplate() {
    return template;
  }

}

module.exports = NgOptionsLocatorStrategy;