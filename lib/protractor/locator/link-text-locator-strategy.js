"use strict";

const AbstractLocatorStrategy = require('../../locator/abstract-locator-strategy');
const _ = require('lodash');
const hasExpression = require('../../expressions').hasExpression;
const text = require('../../dom/elements').text;
const isLink = require('../../dom/elements').isLink;

const template = _.template("by.linkText('<%= value %>')");

class LinkTextLocatorStrategy extends AbstractLocatorStrategy {

  extractLocatorValue(element) {
    let domElement = element.domElement;

    if (isLink(domElement)) {
      let elementText = text(domElement);
      return hasExpression(elementText) ? null : elementText;
    }

    return null;
  }

  locatorTemplate() {
    return template;
  }

}

module.exports = LinkTextLocatorStrategy;