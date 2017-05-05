"use strict";

const _ = require('lodash');
const getAttribute = require('../../../dom/attributes').getAttribute;
const Assertions = require('../../../assertions');
const Types = require('../../../types');

class NgForProcessor {

  matches(domElement) {
    return !_.isEmpty(getAttribute(domElement, '*ngFor'));
  }

  process(context) {
    let pageElement = context.addPageSection();
    pageElement.addTypes(Types.NG_FOR);
    pageElement.addAssertions(Assertions.COUNT);

    context.setTraversePageTreeDownBeforeChildren();
    context.setTraversePageTreeUpAfterChildren();
  }

}

module.exports = NgForProcessor;