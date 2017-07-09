"use strict";

const getAttribute = require('../dom/attributes').getAttribute;
const Actions = require('../actions');
const Assertions = require('../assertions');
const Types = require('../types');

class TextFieldProcessor {

  matches(domElement) {
    let type = getAttribute(domElement, 'type').toLowerCase();
    return domElement.tagName === 'input' &&
           (type === 'text' || type === 'tel' || type === 'search' || type === 'url' || type === 'email' ||
            type === 'password' || type === 'number' || type === 'range');
  }

  process(context) {
    let pageElement = context.addPageElement();
    pageElement.addTypes(Types.TEXT_INPUT);
    pageElement.addActions(Actions.TEXT_MUTATOR);
    pageElement.addAssertions(Assertions.VALUE, Assertions.ENABLED, Assertions.VISIBILITY);
  }

}

module.exports = TextFieldProcessor;