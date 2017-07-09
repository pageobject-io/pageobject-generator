"use strict";

const hasExpression = require('../../../expressions').hasExpression;
const ownText = require('../../../dom/elements').ownText;
const Assertions = require('../../../assertions');
const Types = require('../../../types');

class AngularBindingProcessor {

  matches(domElement) {
    return hasExpression(ownText(domElement));
  }

  process(context) {
    let pageElement = context.addPageElement();
    pageElement.addTypes(Types.BINDING);
    pageElement.addAssertions(Assertions.TEXT, Assertions.HAS_CLASS);
  }

}

module.exports = AngularBindingProcessor;