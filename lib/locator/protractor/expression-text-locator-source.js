"use strict";

const AbstractLocatorSource = require('../abstract-locator-source');
const _ = require('lodash');
const getFirstExpression = require('../../expressions').getFirstExpression;
const ownText = require('../../dom-helpers').ownText;

const template = _.template("by.exactBinding('<%= value %>')");

class ExpressionTextLocatorSource extends AbstractLocatorSource {

  extractLocatorValue(context) {
    return getFirstExpression(ownText(context.element));
  }

  locatorTemplate() {
    return template;
  }

}

module.exports = ExpressionTextLocatorSource;