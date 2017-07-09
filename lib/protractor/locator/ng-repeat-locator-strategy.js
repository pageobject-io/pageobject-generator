"use strict";

const AbstractLocatorStrategy = require('../../locator/abstract-locator-strategy');
const _ = require('lodash');
const allowIndexExpressionOrNoExpressions = require('../../expressions').allowIndexExpressionOrNoExpressions;
const extractExactRepeater = require('../../expressions').extractExactRepeater;
const getRepeaterAttribute = require('../../dom/attributes').getRepeaterAttribute;

const template = _.template("by.exactRepeater('<%= value %>')");

class NgRepeatLocatorStrategy extends AbstractLocatorStrategy {

  extractLocatorValue(element) {
    return allowIndexExpressionOrNoExpressions(extractExactRepeater(getRepeaterAttribute(element.domElement)));
  }

  locatorTemplate() {
    return template;
  }

}

module.exports = NgRepeatLocatorStrategy;