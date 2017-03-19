"use strict";

const AbstractLocatorPartGenerator = require('./abstract-locator-part-generator');

class SingleElementLocatorPartGenerator extends AbstractLocatorPartGenerator {

  constructor(element, ...locatorCandidates) {
    super(element, locatorCandidates);
  }

  onlyPart(context) {
    return super.generateLastPart(context, super.elementFinder, 0);
  }

  lastPart(context, index) {
    return super.generateLastPart(context, super.elementFinder, index);
  }

}

module.exports = SingleElementLocatorPartGenerator;