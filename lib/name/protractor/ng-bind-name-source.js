"use strict";

const AbstractNameSource = require('../abstract-name-source');
const HtmlAttribute = require('../../attribute/html-attribute');
const _ = require('lodash');

class NgBindNameSource extends AbstractNameSource {

  extractName(element) {
    return super.extractNameFromAttribute(element, HtmlAttribute.NG_BIND);
  }

}

module.exports = NgBindNameSource;