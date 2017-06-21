"use strict";

class Locator {

  constructor(selector, strategy) {
    this._selector = selector;
    this._strategy = strategy;
  }

  get selector() {
    return this._selector;
  }

  get strategy() {
    return this._strategy;
  }
}

module.exports = Locator;