"use strict";

const AbstractNameSource = require('../abstract-name-source');
const HtmlAttribute = require('../../attribute/html-attribute');
const getFirstExpression = require('../../expressions').getFirstExpression;
const _ = require('lodash');

class NgBindTemplateNameSource extends AbstractNameSource {

  extractName(element) {
    return getFirstExpression(super.extractNameFromAttribute(element, HtmlAttribute.NG_BIND_TEMPLATE));
  }

}

module.exports = NgBindTemplateNameSource;