"use strict";

const isLink = require('../dom/elements').isLink;
const Actions = require('../actions');
const Assertions = require('../assertions');
const Types = require('../types');

class LinkProcessor {

  matches(domElement) {
    return isLink(domElement);
  }

  process(context) {
    let pageElement = context.addPageElement();
    pageElement.addTypes(Types.LINK);
    pageElement.addActions(Actions.CLICK);
    pageElement.addAssertions(Assertions.VISIBILITY, Assertions.HAS_CLASS);
  }

}

module.exports = LinkProcessor;