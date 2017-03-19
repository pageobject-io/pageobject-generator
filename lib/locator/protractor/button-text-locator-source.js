"use strict";

const AbstractLocatorSource = require('../abstract-locator-source');
const text = require('../../dom-helpers').text;
const getAttribute = require('../../dom-helpers').getAttribute;
const hasExpression = require('../../expressions').hasExpression;
const _ = require('lodash');

const template = _.template("by.buttonText('<%= value %>')");

class ButtonTextLocatorSource extends AbstractLocatorSource {

  extractLocatorValue(context) {
    let element = context.element;
    let content = text(element);
    let locator = null;

    if (_.isEmpty(content)) {
      locator = getAttribute(element, 'value');
    } else if (!hasExpression(content)) {
      locator = content;
    }

    return locator;
  }

  locatorTemplate() {
    return template;
  }

}

module.exports = ButtonTextLocatorSource;