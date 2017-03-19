"use strict";

const AbstractNameSource = require('./abstract-name-source');
const text = require('../dom-helpers').text;
const _ = require('lodash');

class TextNameSource extends AbstractNameSource {

  extractName(element) {
    return text(element);
  }

}

module.exports = TextNameSource;