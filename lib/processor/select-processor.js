"use strict";

const Actions = require('../actions');
const Assertions = require('../assertions');
const Types = require('../types');

class SelectProcessor {

  matches(domElement) {
    return domElement.tagName === 'select';
  }

  process(context) {
    let pageElement = context.addPageElement();
    pageElement.addTypes(Types.SELECT);
    pageElement.addActions(Actions.SELECT_OPTION_BY_PARTIAL_TEXT,
                           Actions.SELECT_OPTION_BY_TEXT,
                           Actions.SELECT_OPTION_BY_VALUE);
    pageElement.addAssertions(Assertions.OPTION_SELECTED_BY_PARTIAL_TEXT,
                              Assertions.OPTION_SELECTED_BY_TEXT,
                              Assertions.OPTION_SELECTED_BY_VALUE,
                              Assertions.VISIBILITY,
                              Assertions.ENABLED,
                              Assertions.HAS_CLASS);
  }

}

module.exports = SelectProcessor;