"use strict";

const _ = require('lodash');
const getNormalizedAttributeValue = require('../../../dom/attributes').getNormalizedAttributeValue;
const Assertions = require('../../../assertions');
const Types = require('../../../types');

class NgRepeatProcessor {

  matches(domElement) {
    return !_.isEmpty(getNormalizedAttributeValue(domElement, 'ng-repeat'));
  }

  process(context) {
    let pageElement = context.addPageSection();
    pageElement.addTypes(Types.NG_REPEAT);
    pageElement.addAssertions(Assertions.COUNT);

    context.setTraversePageTreeDownBeforeChildren();
    context.setTraversePageTreeUpAfterChildren();
  }

}

module.exports = NgRepeatProcessor;