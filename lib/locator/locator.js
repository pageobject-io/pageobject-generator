"use strict";

const _ = require('lodash');

class Locator {

  constructor(locator, locatorWhenElementIsRepeated, source) {
    this._locator = locator;
    this._locatorWhenElementIsRepeated = locatorWhenElementIsRepeated;
    this._source = source;
  }

  static fromParts(parts, lastPartForRepeater) {
    let allParts = getAllParts(parts, lastPartForRepeater);
    let hasInvalidParts = _.some(allParts, isInvalid);
    let validParts = _(parts).filter(isValid).map('part');

    let locator = hasInvalidParts ? null : _.join(validParts, '.');

    let locatorWhenElementIsRepeated = null;
    if (!hasInvalidParts && lastPartForRepeater.validPart()) {
      validParts[validParts.length - 1] = lastPartForRepeater.part;
      locatorWhenElementIsRepeated = _.join(validParts, '.');
    }

    return _.isEmpty(locator) ? null : new Locator(locator,
      locatorWhenElementIsRepeated,
      parts[parts.length - 1].source);
  }

  isValid() {
    return !_.isEmpty(this._locator);
  }

  get locator() {
    return this._locator;
  }

  get locatorWhenElementIsRepeated() {
    return this._locatorWhenElementIsRepeated;
  }

  get source() {
    return this._source;
  }
}

function getAllParts(parts, lastPartForRepeater) {
  let allParts = parts.slice();

  if (lastPartForRepeater !== null) {
    allParts.push(lastPartForRepeater);
  }

  return allParts;
}

const isInvalid = part => part.isInvalid();
const isValid = part => part.validPart();

module.exports = Locator;