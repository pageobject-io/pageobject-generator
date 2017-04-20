"use strict";

const AbstractNameSource = require('../../../name/abstract-name-source');
const HtmlAttribute = require('../../../dom/html-attribute');
const _ = require('lodash');

class NgBindNameSource extends AbstractNameSource {

  extractName(element) {
    return super.extractNameFromAttribute(element, HtmlAttribute.NG_BIND);
  }

}

module.exports = NgBindNameSource;