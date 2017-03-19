'use strict';

const assert = require('assert');
const AbstractLocatorPartGenerator = require('./abstract-locator-part-generator');
const NameExtractor = require('../name/name-extractor');
const prefixPart = require('./locator-part').prefixPart;

class RepeaterLocatorPartGenerator extends AbstractLocatorPartGenerator {

  constructor(element, ...locatorCandidates) {
    super(element, locatorCandidates);
  }

  onlyPart(context) {
    return super.generateLastPart(context, super.elementArrayFinder, 1);
  }

  firstPart(context) {
    let name = new NameExtractor().extractName(context);
    assert(name !== null, `Could not generate name for repeater [${element}]`);
    return prefixPart('this.' + name + '.get(rowIndex1)');
  }

  lastPart(context, index) {
    return super.generateLastPart(context, super.elementArrayFinderInRepeater, index);
  }

  lastPartForRepeaterElement(context, index) {
    return context.isNestedElement() ? this.middlePart(context, index) : this.firstPart(context);
  }

}

module.exports = RepeaterLocatorPartGenerator;