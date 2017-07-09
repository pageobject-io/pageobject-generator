"use strict";

const _ = require('lodash');
const hasNormalizedAttribute = require('../../../dom/attributes').hasNormalizedAttribute;

class NgRepeatEndProcessor {

  matches(domElement) {
    return hasNormalizedAttribute(domElement, 'ng-repeat-end');
  }

  process(context) {
    context.setTraversePageTreeUpAfterChildren();
  }

}

module.exports = NgRepeatEndProcessor;