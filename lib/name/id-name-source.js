"use strict";

const AbstractNameSource = require('./abstract-name-source');
const HtmlAttribute = require('../attribute/html-attribute');
const _ = require('lodash');

class IdNameSource extends AbstractNameSource {

  extractName(element) {
    return super.extractNameFromAttribute(element, HtmlAttribute.ID);
  }

}

module.exports = IdNameSource;