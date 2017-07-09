"use strict";

const AbstractLocatorStrategy = require('../../locator/abstract-locator-strategy');
const _ = require('lodash');
const extractAttributeValueAllowingIndexExpression = require('../../dom/attributes').extractAttributeValueAllowingIndexExpression;
const HtmlAttribute = require('../../dom/html-attribute');

const template = _.template("by.name('<%= value %>')");

class NameLocatorStrategy extends AbstractLocatorStrategy {

  extractLocatorValue(element) {
    return extractAttributeValueAllowingIndexExpression(element.domElement, HtmlAttribute.NAME);
  }

  locatorTemplate() {
    return template;
  }

}

module.exports = NameLocatorStrategy;