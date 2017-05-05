"use strict";

const getAttribute = require('../dom/attributes').getAttribute;
const Actions = require('../actions');
const Assertions = require('../assertions');
const Types = require('../types');

class CheckboxProcessor {

  matches(domElement) {
    return getAttribute(domElement, 'type').toLowerCase() === 'checkbox';
  }

  process(context) {
    let pageElement = context.addPageElement();
    pageElement.addTypes(Types.CHECKBOX);
    pageElement.addActions(Actions.CLICK);
    pageElement.addAssertions(Assertions.SELECTED, Assertions.ENABLED, Assertions.VISIBILITY, Assertions.HAS_CLASS);
  }

}

module.exports = CheckboxProcessor;