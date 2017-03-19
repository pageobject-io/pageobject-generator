"use strict";

const AbstractLocatorSource = require('../abstract-locator-source');
const _ = require('lodash');
const HtmlAttribute = require('../../attribute/html-attribute');
const extractAttributeValueAllowingIndexExpression = require('../../attribute/attributes').extractAttributeValueAllowingIndexExpression;

const template = _.template("by.options('<%= value %>')");

class NgOptionsLocatorSource extends AbstractLocatorSource {

  extractLocatorValue(context) {
    return extractAttributeValueAllowingIndexExpression(context.element, HtmlAttribute.NG_OPTIONS);
  }

  locatorTemplate() {
    return template;
  }

}

module.exports = NgOptionsLocatorSource;