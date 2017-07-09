"use strict";

const _ = require('lodash');
const getNormalizedAttributeValue = require('../../../dom/attributes').getNormalizedAttributeValue;
const isButton = require('../../../dom/elements').isButton;
const isLink = require('../../../dom/elements').isLink;
const Actions = require('../../../actions');
const Assertions = require('../../../assertions');
const Types = require('../../../types');

class NgClickProcessor {

  matches(domElement) {
    let ngClick = getNormalizedAttributeValue(domElement, 'ng-click');
    return !_.isEmpty(ngClick) && !isLink(domElement) && !isButton(domElement);
  }

  process(context) {
    let pageElement = context.addPageElement();
    pageElement.addTypes(Types.CLICKABLE);
    pageElement.addActions(Actions.CLICK);
    pageElement.addAssertions(Assertions.VISIBILITY, Assertions.HAS_CLASS);
  }

}

module.exports = NgClickProcessor;