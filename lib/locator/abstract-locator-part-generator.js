"use strict";

const assert = require('assert');
const _ = require('lodash');
const invalidPart = require('./locator-part').invalidPart;
const emptyPart = require('./locator-part').emptyPart;
const part = require('./locator-part').part;
const replaceIndexBindingWithFunctionParameter = require('../expressions').replaceIndexBindingWithFunctionParameter;

const elementFinder = "element";
const elementArrayFinder = "element.all";
const elementArrayFinderInRepeater = "all";

class AbstractLocatorPartGenerator {

  constructor(element, ...locatorCandidates) {
    if (this.onlyPart === undefined) {
      throw new TypeError('Must override method onlyPart');
    }

    if (this.lastPart === undefined) {
      throw new TypeError('Must override method lastPart');
    }

    assert(locatorCandidates.length > 0, 'There must be at least one locator candidate');
    this._element = element;
    this._locatorCandidates = locatorCandidates;
  }

  firstPart(context) {
    return invalidPart();
  }

  middlePart(context, index) {
    return invalidPart();
  }

  lastPartForRepeaterElement(context, index) {
    return emptyPart();
  }

  generateLastPart(context, elementFinder, depth) {
    let element = context.element;

    for (let locatorCandidate of this._locatorCandidates) {
      let attributeValue = locatorCandidate.extractLocatorValue(element, context);

      if (!_.isEmpty(attributeValue) && context.isLocatorAvailable(locatorCandidate, attributeValue)) {
        let replacedValue = replaceIndexBindingWithFunctionParameter(attributeValue, depth);
        let locator = locatorCandidate.locator(replacedValue);

        return part(`${elementFinder}(${locator})`, locatorCandidate);
      }
    }

    return invalidPart();
  }

  get element() {
    return this._element;
  }

  static get elementFinder() {
    return elementFinder;
  }

  static get elementArrayFinder() {
    return elementArrayFinder;
  }

  static get elementArrayFinderInRepeater() {
    return elementArrayFinderInRepeater;
  }

}

module.exports = AbstractLocatorPartGenerator;