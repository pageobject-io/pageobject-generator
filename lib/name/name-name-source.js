"use strict";

const AbstractNameSource = require('./abstract-name-source');
const HtmlAttribute = require('../attribute/html-attribute');
const _ = require('lodash');

class NameNameSource extends AbstractNameSource {

  extractName(element) {
    return super.extractNameFromAttribute(element, HtmlAttribute.NAME);
  }

}

module.exports = NameNameSource;