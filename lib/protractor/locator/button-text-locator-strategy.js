"use strict";

const AbstractLocatorStrategy = require('../../locator/abstract-locator-strategy');
const text = require('../../dom/elements').text;
const getAttribute = require('../../dom/attributes').getAttribute;
const hasExpression = require('../../expressions').hasExpression;
const isButton = require('../../dom/elements').isButton;
const _ = require('lodash');

const template = _.template("by.buttonText('<%= value %>')");

class ButtonTextLocatorStrategy extends AbstractLocatorStrategy {

  extractLocatorValue(element) {
    let locator = null;
    let domElement = element.domElement;

    if (isButton(domElement)) {
      let content = text(domElement);

      if (_.isEmpty(content)) {
        locator = getAttribute(domElement, 'value');
      } else if (!hasExpression(content)) {
        locator = content;
      }
    }

    return locator;
  }

  locatorTemplate() {
    return template;
  }

}

module.exports = ButtonTextLocatorStrategy;