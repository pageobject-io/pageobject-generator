"use strict";

const AbstractLocatorStrategy = require('../../locator/abstract-locator-strategy');
const _ = require('lodash');
const HtmlAttribute = require('../../dom/html-attribute');
const extractAttributeValueAllowingIndexExpression = require('../../dom/attributes').extractAttributeValueAllowingIndexExpression;

const template = _.template("by.id('<%= value %>')");

class IdLocatorStrategy extends AbstractLocatorStrategy {

  extractLocatorValue(element) {
    return extractAttributeValueAllowingIndexExpression(element.domElement, HtmlAttribute.ID);
  }

  locatorTemplate() {
    return template;
  }

}

module.exports = IdLocatorStrategy;