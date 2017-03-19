"use strict";

const AbstractLocatorSource = require('../abstract-locator-source');
const _ = require('lodash');
const HtmlAttribute = require('../../attribute/html-attribute');
const extractAttributeValueAllowingIndexExpression = require('../../attribute/attributes').extractAttributeValueAllowingIndexExpression;

const template = _.template("by.model('<%= value %>')");

class NgModelLocatorSource extends AbstractLocatorSource {

  extractLocatorValue(context) {
    return extractAttributeValueAllowingIndexExpression(context.element, HtmlAttribute.NG_MODEL);
  }

  locatorTemplate() {
    return template;
  }

}

module.exports = NgModelLocatorSource;