"use strict";

const AbstractNameSource = require('../../name/abstract-name-source');
const getFirstExpression = require('../../expressions').getFirstExpression;
const ownText = require('../../dom/elements').ownText;

const _ = require('lodash');

class ExpressionTextNameSource extends AbstractNameSource {

  extractName(element) {
    return getFirstExpression(ownText(element));
  }

}

module.exports = ExpressionTextNameSource;