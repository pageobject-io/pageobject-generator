"use strict";

const _ = require('lodash');
const getNormalizedAttributeValue = require('../../../dom/attributes').getNormalizedAttributeValue;
const hasExpression = require('../../../expressions').hasExpression;
const ownText = require('../../../dom/elements').ownText;
const Actions = require('../../../actions');
const Assertions = require('../../../assertions');
const Types = require('../../../types');

class AngularJsBindingProcessor {

  matches(domElement) {
    return !_.isEmpty(getNormalizedAttributeValue(domElement, 'ng-bind')) ||
           !_.isEmpty(getNormalizedAttributeValue(domElement, 'ng-bind-html')) ||
           !_.isEmpty(getNormalizedAttributeValue(domElement, 'ng-bind-template')) ||
           hasExpression(ownText(domElement));
  }

  process(context) {
    let pageElement = context.addPageElement();
    pageElement.addTypes(Types.BINDING);
    pageElement.addAssertions(Assertions.TEXT, Assertions.HAS_CLASS);
  }

}

module.exports = AngularJsBindingProcessor;