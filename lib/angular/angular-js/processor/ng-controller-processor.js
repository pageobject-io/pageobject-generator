"use strict";

const _ = require('lodash');
const getNormalizedAttributeValue = require('../../../dom/attributes').getNormalizedAttributeValue;
const extractControllerAs = require('../../../expressions').extractControllerAs;
const Types = require('../../../types');

class NgControllerProcessor {

  matches(domElement) {
    return !_.isEmpty(getNormalizedAttributeValue(domElement, 'ng-controller'));
  }

  process(context) {
    let controllerExpression = getNormalizedAttributeValue(context.domElement, 'ng-controller');
    let controllerName = extractControllerAs(controllerExpression);

    if (!_.isEmpty(controllerName)) {
      let pageElement = context.addPageSection();
      pageElement.addTypes(Types.NG_CONTROLLER);
      pageElement.name = controllerName;

      context.setTraversePageTreeDownBeforeChildren();
      context.setTraversePageTreeUpAfterChildren();
    }
  }

}

module.exports = NgControllerProcessor;