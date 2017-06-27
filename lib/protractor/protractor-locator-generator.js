"use strict";

const _ = require('lodash');
const replaceIndexBindingWithFunctionParameter = require('../expressions').replaceIndexBindingWithFunctionParameter;
const getRepeaterAttribute = require('../dom/attributes').getRepeaterAttribute;
const extractExactRepeater = require('../expressions').extractExactRepeater;
const Locator = require('../locator/locator');
const NG_FOR = require('../types').NG_FOR;
const NG_REPEAT = require('../types').NG_REPEAT;
const RADIO = require('../types').RADIO;
const REPEATED_RADIO = require('../types').REPEATED_RADIO;

const elementFinder = "element";
const elementArrayFinder = "element.all";
const elementArrayFinderInRepeater = "all";

class ProtractorLocatorGenerator {

  constructor(locatorStrategies) {
    this._locatorStrategies = locatorStrategies;
    this._usedLocators = new Set();
  }

  generate(element) {
    let elements = element.getAncestorsOfType(NG_FOR, NG_REPEAT);

    if (element.hasType(REPEATED_RADIO)) {
      elements.pop();
    }

    elements.push(element);

    if (elements.length == 1) {
      return onlyPart.call(this, elements[0]);
    } else {
      let parts = [];
      parts.push(firstPart.call(this, elements[0]));

      for (let i = 1; i < elements.length - 1; i++) {
        parts.push(middlePart.call(this, elements[i], i));
      }

      let lastLocator = lastPart.call(this, elements[elements.length - 1], elements.length - 1, parts);
      parts.push(lastLocator ? lastLocator.selector : null);

      return _.some(parts, part => _.isNull(part)) ? null : new Locator(parts.join('.'), lastLocator.strategy);
    }
  }

}

function onlyPart(element) {
  if (element.hasAnyType(NG_FOR, NG_REPEAT, RADIO, REPEATED_RADIO)) {
    return generateLocatorPart.call(this, element, elementArrayFinder, 1, []);
  } else {
    return generateLocatorPart.call(this, element, elementFinder, 0, []);
  }
}

function generateLocatorPart(element, elementFinder, depth, parts) {
  for (let strategy of this._locatorStrategies) {
    let locatorPart = strategy.locator(element);

    if (!_.isEmpty(locatorPart)) {
      locatorPart = replaceIndexBindingWithFunctionParameter(locatorPart, depth);
      let locatorPartObject = new Locator(`${elementFinder}(${locatorPart})`, strategy);

      if (parts) {
        let locator = [...parts, locatorPart].join('.');
        if (!this._usedLocators.has(locator)) {
          this._usedLocators.add(locator);
          return locatorPartObject;
        }
      } else {
        return locatorPartObject;
      }
    }
  }

  return null;
}

function firstPart(element) {
  return 'this.' + element.name + '.get(rowIndex1)';
}

function middlePart(element, index) {
  if (element.hasType(NG_REPEAT)) {
    return `element(by.exactRepeater('${getRepeaterExpression(element)}').row(rowIndex${index + 1}))`;
  } else {
    let part = generateLocatorPart.call(this, element, elementArrayFinderInRepeater, index);
    return `${part.selector}.get(rowIndex${index + 1})`;
  }
}

function getRepeaterExpression(element) {
  return extractExactRepeater(getRepeaterAttribute(element.domElement));
}

function lastPart(element, index, parts) {
  if (element.hasAnyType(NG_FOR, NG_REPEAT, RADIO, REPEATED_RADIO)) {
    return generateLocatorPart.call(this, element, elementArrayFinderInRepeater, index, parts);
  } else {
    return generateLocatorPart.call(this, element, elementFinder, index, parts);
  }
}

module.exports = ProtractorLocatorGenerator;