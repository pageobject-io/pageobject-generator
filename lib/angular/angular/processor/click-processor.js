"use strict";

const hasAngular2EventBindingAttribute = require('../../../dom/attributes').hasAngular2EventBindingAttribute;
const isButton = require('../../../dom/elements').isButton;
const isLink = require('../../../dom/elements').isLink;
const Actions = require('../../../actions');
const Assertions = require('../../../assertions');
const Types = require('../../../types');

class ClickProcessor {

  matches(domElement) {
    return hasAngular2EventBindingAttribute(domElement, 'click') && !isLink(domElement) && !isButton(domElement);
  }

  process(context) {
    let pageElement = context.addPageElement();
    pageElement.addTypes(Types.CLICKABLE);
    pageElement.addActions(Actions.CLICK);
    pageElement.addAssertions(Assertions.VISIBILITY, Assertions.HAS_CLASS);
  }

}

module.exports = ClickProcessor;