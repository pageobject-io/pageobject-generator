"use strict";

const AbstractLocatorPartGenerator = require('./abstract-locator-part-generator');

class MultiElementLocatorPartGenerator extends AbstractLocatorPartGenerator {

  constructor(element, ...locatorCandidates) {
    super(element, locatorCandidates);
  }

  onlyPart(context) {
    return super.generateLastPart(context, super.elementArrayFinder, 0);
  }

  lastPart(context, index) {
    return super.generateLastPart(context, super.elementArrayFinderInRepeater, index);
  }

}

module.exports = MultiElementLocatorPartGenerator;