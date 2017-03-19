"use strict";

const AbstractLocatorSource = require('../abstract-locator-source');
const _ = require('lodash');
const getNormalizedAttributeValue = require('../../attribute/attributes').getNormalizedAttributeValue;
const getFirstExpression = require('../../expressions').getFirstExpression;
const HtmlAttribute = require('../../attribute/html-attribute');

const template = _.template("by.exactBinding('<%= value %>')");

class NgBindTemplateLocatorSource extends AbstractLocatorSource {

  extractLocatorValue(context) {
    return getFirstExpression(getNormalizedAttributeValue(context.element,
                                                          HtmlAttribute.NG_BIND_TEMPLATE.attributeName));
  }

  locatorTemplate() {
    return template;
  }

}

module.exports = NgBindTemplateLocatorSource;