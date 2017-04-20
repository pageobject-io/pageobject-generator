"use strict";

const AbstractNameSource = require('../../../name/abstract-name-source');
const getRepeaterAttribute = require('../../../dom/attributes').getRepeaterAttribute;
const extractNameFromRepeater = require('../../../expressions').extractNameFromRepeater;
const _ = require('lodash');

class NgRepeatNameSource extends AbstractNameSource {

  extractName(element) {
    let repeatExpression = getRepeaterAttribute(element);
    return _.isEmpty(repeatExpression) ? null : extractNameFromRepeater(repeatExpression);
  }

}

module.exports = NgRepeatNameSource;