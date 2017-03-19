'use strict';

const assert = require('assert');
const _ = require('lodash');

class LocatorPart {

  constructor(part, source) {
    this._part = part;
    this._source = source;
  }

  static part(part, source) {
    assert(!_.isEmpty(part), 'Part string cannot be empty or null');
    assert(source !== null, 'Source must be specified');
    return new LocatorPart(part, source);
  }

  static prefixPart(part) {
    assert(!_.isEmpty(part), 'Part string cannot be empty or null');
    return new LocatorPart(part, null);
  }

  static emptyPart() {
    return new LocatorPart('', null);
  }

  static invalidPart() {
    return new LocatorPart(null, null);
  }

  isInvalid() {
    return this._part === null;
  }

  validPart() {
    return !_.isEmpty(this._part);
  }

  get part() {
    return this._part;
  }

  get source() {
    return this._source;
  }

}

module.exports = LocatorPart;