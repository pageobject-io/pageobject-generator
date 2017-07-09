"use strict";

const AbstractNameSource = require('../../../name/abstract-name-source');
const HtmlAttribute = require('../../../dom/html-attribute');
const _ = require('lodash');

class NgBindHtmlNameSource extends AbstractNameSource {

  extractName(element) {
    return super.extractNameFromAttribute(element, HtmlAttribute.NG_BIND_HTML);
  }

}

module.exports = NgBindHtmlNameSource;