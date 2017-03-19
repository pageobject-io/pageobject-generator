"use strict";

const RepeaterLocatorPartGenerator = require('./repeater-locator-part-generator');
const prefixPart = require('./locator-part').prefixPart;
const NgRepeatLocatorSource = require('./protractor/ng-repeat-locator-source');

class NgRepeatLocatorPartGenerator extends RepeaterLocatorPartGenerator {

  constructor(element, repeaterExpression) {
    super(element, new NgRepeatLocatorSource());
    this._repeaterExpression = repeaterExpression;
  }

  middlePart(context, index) {
    return prefixPart(`element(by.exactRepeater('${this._repeaterExpression}').row(rowIndex${index + 1}))`);
  }

}

module.exports = NgRepeatLocatorPartGenerator;