"use strict";

const AbstractLocatorSource = require('../abstract-locator-source');
const _ = require('lodash');
const extractAttributeValueAllowingIndexExpression = require('../../attribute/attributes').extractAttributeValueAllowingIndexExpression;
const HtmlAttribute = require('../../attribute/html-attribute');

const template = _.template("by.name('<%= value %>')");

class NameLocatorSource extends AbstractLocatorSource {

  extractLocatorValue(context) {
    return extractAttributeValueAllowingIndexExpression(context.element, HtmlAttribute.NAME);
  }

  locatorTemplate() {
    return template;
  }

}

module.exports = NameLocatorSource;