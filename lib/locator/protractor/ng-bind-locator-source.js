"use strict";

const AbstractLocatorSource = require('../abstract-locator-source');
const _ = require('lodash');
const extractAttributeValue = require('../../attribute/attributes').extractAttributeValue;
const HtmlAttribute = require('../../attribute/html-attribute');

const template = _.template("by.exactBinding('<%= value %>')");

class NgBindLocatorSource extends AbstractLocatorSource {

  extractLocatorValue(context) {
    return extractAttributeValue(context.element, HtmlAttribute.NG_BIND);
  }

  locatorTemplate() {
    return template;
  }

}

module.exports = NgBindLocatorSource;