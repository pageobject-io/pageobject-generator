"use strict";

const getAttribute = require('../dom/attributes').getAttribute;
const Actions = require('../actions');
const Assertions = require('../assertions');
const Types = require('../types');

class DateFieldProcessor {

  matches(domElement) {
    let type = getAttribute(domElement, 'type').toLowerCase();
    return type === 'date' || type === 'time' || type === 'datetime-local' || type === 'datetime' || type === 'month' ||
           type === 'week';
  }

  process(context) {
    let pageElement = context.addPageElement();
    pageElement.addTypes(Types.DATE_INPUT);
    pageElement.addActions(Actions.DATE_MUTATOR);
    pageElement.addAssertions(Assertions.VALUE, Assertions.ENABLED, Assertions.VISIBILITY, Assertions.HAS_CLASS);
  }

}

module.exports = DateFieldProcessor;