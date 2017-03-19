"use strict";

const getNormalizedAttributeValue = require('../attribute/attributes').getNormalizedAttributeValue;

class AbstractNameSource {

  constructor() {
    if (this.extractName === undefined) {
      throw new TypeError('Must override extractName method');
    }
  }

  extractNameFromAttribute(element, htmlAttribute) {
    return getNormalizedAttributeValue(element, htmlAttribute.attributeName);
  }

}

module.exports = AbstractNameSource;