"use strict";

const NG_FOR = require('../types').NG_FOR;
const NG_REPEAT = require('../types').NG_REPEAT;
const REPEATED_RADIO = require('../types').REPEATED_RADIO;
const _ = require('lodash');

class ProtractorEmitter {

  isNestedElement(traverser) {
    let elements = traverser.element.getAncestorsOfType(NG_FOR, NG_REPEAT);

    if (traverser.element.hasType(REPEATED_RADIO)) {
      elements.pop();
    }

    return elements.length > 0;
  }

  indexArguments(traverser, addArgumentForRepeater = true) {
    let repeaterCount = traverser.element.getAncestorsOfType(NG_FOR, NG_REPEAT).length;

    if (traverser.element.hasType(REPEATED_RADIO)) {
      repeaterCount--;
    }

    if (addArgumentForRepeater && traverser.element.hasAnyType(NG_FOR, NG_REPEAT)) {
      repeaterCount++;
    }

    let indices = [];
    for (var i = 0; i < repeaterCount; i++) {
      indices.push(`rowIndex${i + 1}`);
    }

    return indices;
  }

  referenceToElement(traverser, addIndexForRepeater = true) {
    let selector = this.isNestedElement(traverser) ? traverser.element.locator.selector : `this.${traverser.element.name}`;

    if (addIndexForRepeater && traverser.element.hasAnyType(NG_FOR, NG_REPEAT)) {
      let repeaterCount = traverser.element.getAncestorsOfType(NG_FOR, NG_REPEAT).length;
      selector += `.get(rowIndex${repeaterCount + 1})`;
    }

    return selector;
  }

  methodBody(traverser, bodyLines) {
    if (!_.isArray(bodyLines)) {
      bodyLines = [bodyLines];
    }

    let result = ' {';
    result += traverser.newLine();

    for (let line of bodyLines) {
      result += traverser.singleIndent();
      result += line;
      result += traverser.newLine();
    }

    result += '};';
    result += traverser.newLine();

    return result;
  }

}

module.exports = ProtractorEmitter;