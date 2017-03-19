"use strict";

const RepeaterLocatorPartGenerator = require('./repeater-locator-part-generator');
const NameLocatorSource = require('./protractor/name-locator-source');
const CssLocatorSource = require('./protractor/css-locator-source');
const prefixPart = require('./locator-part').prefixPart;

class NgForLocatorPartGenerator extends RepeaterLocatorPartGenerator {

  constructor(element) {
    super(element, new NameLocatorSource(), new CssLocatorSource());
  }

  firstPart(context) {
    this._locatorPart = super.firstPart(context);
    return this._locatorPart;
  }

  lastPart(context, index) {
    this._locatorPart = super.lastPart(context, index);
    return this._locatorPart;
  }

  middlePart(context, index) {
    return prefixPart(`${this._locatorPart.part}.get(rowIndex${index + 1})`);
  }

}

module.exports = NgForLocatorPartGenerator;