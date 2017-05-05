"use strict";

const _ = require('lodash');
const getNormalizedAttributeValue = require('../../../dom/attributes').getNormalizedAttributeValue;

class NgRepeatEndProcessor {

  matches(domElement) {
    return !_.isEmpty(getNormalizedAttributeValue(domElement, 'ng-repeat-end'));
  }

  process(context) {
    context.setTraversePageTreeUpAfterChildren();
  }

}

module.exports = NgRepeatEndProcessor;