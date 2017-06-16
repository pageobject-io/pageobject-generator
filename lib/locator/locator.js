"use strict";

class Locator {

  constructor(selector, strategy, nativeSelector) {
    this._selector = selector;
    this._strategy = strategy;
    this._nativeSelector = nativeSelector;
  }

  get selector() {
    return this._selector;
  }

  get strategy() {
    return this._strategy;
  }

  get nativeSelector() {
    return this._nativeSelector;
  }

  extendSelector(additionalSelector) {
    const parts = this.nativeSelector.split('\'');
    return '\'' + parts[1] + ' ' + additionalSelector + '\'';
  }
}

module.exports = Locator;