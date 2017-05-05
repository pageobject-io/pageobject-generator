"use strict";

const Actions = require('../actions');
const Assertions = require('../assertions');
const Types = require('../types');

class TextAreaProcessor {

  matches(domElement) {
    return domElement.tagName === 'textarea';
  }

  process(context) {
    let pageElement = context.addPageElement();
    pageElement.addTypes(Types.TEXT_AREA);
    pageElement.addActions(Actions.TEXT_MUTATOR);
    pageElement.addAssertions(Assertions.VALUE, Assertions.ENABLED, Assertions.VISIBILITY);
  }

}

module.exports = TextAreaProcessor;