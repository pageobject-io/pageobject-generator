"use strict";

const AbstractLocatorStrategy = require('../../locator/abstract-locator-strategy');
const _ = require('lodash');
const getNormalizedAttributeValue = require('../../dom/attributes').getNormalizedAttributeValue;
const getFirstExpression = require('../../expressions').getFirstExpression;
const HtmlAttribute = require('../../dom/html-attribute');

const template = _.template("by.exactBinding('<%= value %>')");

class NgBindTemplateLocatorStrategy extends AbstractLocatorStrategy {

  extractLocatorValue(element) {
    return getFirstExpression(getNormalizedAttributeValue(element.domElement,
                                                          HtmlAttribute.NG_BIND_TEMPLATE.attributeName));
  }

  locatorTemplate() {
    return template;
  }

}

module.exports = NgBindTemplateLocatorStrategy;