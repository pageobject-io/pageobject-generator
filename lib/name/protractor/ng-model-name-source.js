"use strict";

const AbstractNameSource = require('../abstract-name-source');
const HtmlAttribute = require('../../attribute/html-attribute');
const _ = require('lodash');

class NgModelNameSource extends AbstractNameSource {

  extractName(element) {
    return super.extractNameFromAttribute(element, HtmlAttribute.NG_MODEL);
  }

}

module.exports = NgModelNameSource;