"use strict";

const AbstractLocatorSource = require('../abstract-locator-source');
const _ = require('lodash');
const allowIndexExpressionOrNoExpressions = require('../../expressions').allowIndexExpressionOrNoExpressions;
const extractExactRepeater = require('../../expressions').extractExactRepeater;
const getRepeaterAttribute = require('../../attribute/attributes').getRepeaterAttribute;

const template = _.template("by.exactRepeater('<%= value %>')");

class NgRepeatLocatorSource extends AbstractLocatorSource {

  extractLocatorValue(context) {
    return allowIndexExpressionOrNoExpressions(extractExactRepeater(getRepeaterAttribute(context.element)));
  }

  locatorTemplate() {
    return template;
  }

}

module.exports = NgRepeatLocatorSource;