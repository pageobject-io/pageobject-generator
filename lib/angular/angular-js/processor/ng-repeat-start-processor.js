"use strict";

const _ = require('lodash');
const getNormalizedAttributeValue = require('../../../dom/attributes').getNormalizedAttributeValue;
const Assertions = require('../../../assertions');
const Types = require('../../../types');

class NgRepeatStartProcessor {

  matches(domElement) {
    return !_.isEmpty(getNormalizedAttributeValue(domElement, 'ng-repeat-start'));
  }

  process(context) {
    let pageElement = context.addPageSection();
    pageElement.addTypes(Types.NG_REPEAT);
    pageElement.addAssertions(Assertions.COUNT);

    context.setTraversePageTreeDownBeforeChildren();
  }

}

module.exports = NgRepeatStartProcessor;