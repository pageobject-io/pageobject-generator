"use strict";

const NG_FOR = require('../../types').NG_FOR;
const RADIO = require('../../types').RADIO;
const REPEATED_RADIO = require('../../types').REPEATED_RADIO;
const AbstractLocatorGenerator = require('../../locator/abstract-locator-generator');

const globalElementFinder = "this.debugElement.nativeElement.querySelector";
const globalElementArrayFinder = "this.debugElement.nativeElement.querySelectorAll";
const elementArrayFinderInRepeater = "querySelectorAll";
const elementFinder = "querySelector";

class ComponentTestLocatorGenerator extends AbstractLocatorGenerator {

  constructor(locatorStrategies) {
    super(locatorStrategies);
  }

  onlyPart(element) {
    if (element.hasAnyType(NG_FOR, RADIO, REPEATED_RADIO)) {
      return this.generateLocatorPart(element, globalElementArrayFinder, 1, []);
    } else {
      return this.generateLocatorPart(element, globalElementFinder, 0, []);
    }
  }

  firstPart(element) {
    return 'this.' + element.name + '[rowIndex1]';
  }

  middlePart(element, index) {
    let part = this.generateLocatorPart(element, elementArrayFinderInRepeater, index);
    return part != null ? `${part.selector}[rowIndex${index + 1}]` : null;
  }

  lastPart(element, index, parts) {
    if (element.hasAnyType(NG_FOR, RADIO, REPEATED_RADIO)) {
      return this.generateLocatorPart(element, elementArrayFinderInRepeater, index, parts);
    } else {
      return this.generateLocatorPart(element, elementFinder, index, parts);
    }
  }

  getSupportedNestedElements() {
    return [NG_FOR];
  }

}


module.exports = ComponentTestLocatorGenerator;