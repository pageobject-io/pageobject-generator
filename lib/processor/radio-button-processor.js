"use strict";

const getAttribute = require('../dom/attributes').getAttribute;
const getNormalizedAttributeValue = require('../dom/attributes').getNormalizedAttributeValue;
const Actions = require('../actions');
const Assertions = require('../assertions');
const Types = require('../types');
const select = require('css-select');
const _ = require('lodash');

class RadioButtonProcessor {

  matches(domElement) {
    return getAttribute(domElement, 'type').toLowerCase() === 'radio';
  }

  process(context) {
    if (findElementsInGroup(context)[0] === context.domElement) {
      let pageElement = context.addPageElement();
      pageElement.addTypes(Types.RADIO);
      pageElement.addActions(Actions.CLICK_BY_INDEX, Actions.CLICK_BY_VALUE);
      pageElement.addAssertions(Assertions.SELECTED_BY_INDEX,
                                Assertions.SELECTED_BY_VALUE,
                                Assertions.ENABLED_BY_INDEX,
                                Assertions.VISIBILITY_BY_INDEX,
                                Assertions.HAS_CLASS);
    }
  }

}

function findElementsInGroup(context) {
  let elements = [];
  let domElement = context.domElement;

  let name = getAttribute(domElement, 'name');
  let model = getNormalizedAttributeValue(domElement, 'ng-model');

  let lastRepeater = context.getLastRepeater();
  let container = lastRepeater ? lastRepeater.domElement : context.document;
  let allRadios = select('input[type=radio]', container);

  for (let radio of allRadios) {
    let otherName = getAttribute(radio, 'name');
    let otherModel = getNormalizedAttributeValue(radio, 'ng-model');

    let matchingNames = !_.isEmpty(otherName) && otherName === name;
    let matchingModels = !_.isEmpty(otherModel) && otherModel === model;
    if (matchingNames || matchingModels) {
      elements.push(radio);
    }
  }

  return elements;
}

module.exports = RadioButtonProcessor;