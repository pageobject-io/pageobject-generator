"use strict";

const AbstractLocatorStrategy = require('../../locator/abstract-locator-strategy');
const _ = require('lodash');
const getFirstExpression = require('../../expressions').getFirstExpression;
const ownText = require('../../dom/elements').ownText;

const template = _.template("by.exactBinding('<%= value %>')");

class ExpressionTextLocatorStrategy extends AbstractLocatorStrategy {

  extractLocatorValue(element) {
    return getFirstExpression(ownText(element.domElement));
  }

  locatorTemplate() {
    return template;
  }

}

module.exports = ExpressionTextLocatorStrategy;