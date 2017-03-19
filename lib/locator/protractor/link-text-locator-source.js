"use strict";

const AbstractLocatorSource = require('../abstract-locator-source');
const _ = require('lodash');
const hasExpression = require('../../expressions').hasExpression;
const text = require('../../dom-helpers').text;

const template = _.template("by.linkText('<%= value %>')");

class LinkTextLocatorSource extends AbstractLocatorSource {

  extractLocatorValue(context) {
    let elementText = text(context.element);
    return hasExpression(elementText) ? null : elementText;
  }

  locatorTemplate() {
    return template;
  }

}

module.exports = LinkTextLocatorSource;