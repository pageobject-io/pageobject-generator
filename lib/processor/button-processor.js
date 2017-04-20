"use strict";

const isButton = require('../dom/elements').isButton;
const Actions = require('../actions');
const Assertions = require('../assertions');

class ButtonProcessor {

  matches(domElement) {
    return isButton(domElement);
  }

  process(context) {
    let pageElement = context.addPageElement();
    pageElement.addActions(Actions.CLICK);
    pageElement.addAssertions(Assertions.VISIBILITY, Assertions.HAS_CLASS);
  }

}

module.exports = ButtonProcessor;