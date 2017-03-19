"use strict";

const AbstractLocatorSource = require('../abstract-locator-source');
const _ = require('lodash');
const HtmlAttribute = require('../../attribute/html-attribute');
const extractAttributeValueAllowingIndexExpression = require('../../attribute/attributes').extractAttributeValueAllowingIndexExpression;

const template = _.template("by.id('<%= value %>')");

class IdLocatorSource extends AbstractLocatorSource {

  extractLocatorValue(context) {
    return extractAttributeValueAllowingIndexExpression(context.element, HtmlAttribute.ID);
  }

  locatorTemplate() {
    return template;
  }

}

module.exports = IdLocatorSource;