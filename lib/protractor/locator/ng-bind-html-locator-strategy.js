"use strict";

const AbstractLocatorStrategy = require('../../locator/abstract-locator-strategy');
const _ = require('lodash');
const extractAttributeValue = require('../../dom/attributes').extractAttributeValue;
const HtmlAttribute = require('../../dom/html-attribute');

const template = _.template("by.exactBinding('<%= value %>')");

class NgBindHtmlLocatorStrategy extends AbstractLocatorStrategy {

  extractLocatorValue(element) {
    return extractAttributeValue(element.domElement, HtmlAttribute.NG_BIND_HTML);
  }

  locatorTemplate() {
    return template;
  }

}

module.exports = NgBindHtmlLocatorStrategy;