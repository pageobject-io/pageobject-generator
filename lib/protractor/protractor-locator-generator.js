"use strict";

const _ = require('lodash');
const getRepeaterAttribute = require('../dom/attributes').getRepeaterAttribute;
const extractExactRepeater = require('../expressions').extractExactRepeater;
const NG_FOR = require('../types').NG_FOR;
const NG_REPEAT = require('../types').NG_REPEAT;
const RADIO = require('../types').RADIO;
const REPEATED_RADIO = require('../types').REPEATED_RADIO;
const AbstractLocatorGenerator = require('../locator/abstract-locator-generator');

const elementFinder = "element";
const elementArrayFinder = "element.all";
const elementArrayFinderInRepeater = "all";

class ProtractorLocatorGenerator extends AbstractLocatorGenerator {

  constructor(locatorStrategies) {
    super(locatorStrategies);
  }

  onlyPart(element) {
    if (element.hasAnyType(NG_FOR, NG_REPEAT, RADIO, REPEATED_RADIO)) {
      return this.generateLocatorPart(element, elementArrayFinder, 1, []);
    } else {
      return this.generateLocatorPart(element, elementFinder, 0, []);
    }
  }

  firstPart(element) {
    return 'this.' + element.name + '.get(rowIndex1)';
  }

  middlePart(element, index) {
    if (element.hasType(NG_REPEAT)) {
      return `element(by.exactRepeater('${getRepeaterExpression(element)}').row(rowIndex${index + 1}))`;
    } else {
      let part = this.generateLocatorPart(element, elementArrayFinderInRepeater, index);
      return `${part.selector}.get(rowIndex${index + 1})`;
    }
  }

  lastPart(element, index, parts) {
    if (element.hasAnyType(NG_FOR, NG_REPEAT, RADIO, REPEATED_RADIO)) {
      return this.generateLocatorPart(element, elementArrayFinderInRepeater, index, parts);
    } else {
      return this.generateLocatorPart(element, elementFinder, index, parts);
    }
  }


  getSupportedNestedElements() {
    return [NG_FOR, NG_REPEAT];
  }

}

function getRepeaterExpression(element) {
  return extractExactRepeater(getRepeaterAttribute(element.domElement));
}

module.exports = ProtractorLocatorGenerator;