"use strict";

const AbstractNameSource = require('./abstract-name-source');
const HtmlAttribute = require('../dom/html-attribute');
const _ = require('lodash');

class ValueNameSource extends AbstractNameSource {

  extractName(element) {
    return super.extractNameFromAttribute(element, HtmlAttribute.VALUE);
  }

}

module.exports = ValueNameSource;