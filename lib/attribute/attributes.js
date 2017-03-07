'use strict';

const _ = require('lodash');
const getAttribute = require('../dom-helpers').getAttribute;
const hasAttribute = require('../dom-helpers').hasAttribute;
const hasExpression = require('../expressions').hasExpression;
const allowIndexExpressionOrNoExpressions = require('../expressions').allowIndexExpressionOrNoExpressions;
const HtmlAttribute = require('./html-attribute');

class Attributes {

  static getNormalizedAttributeValue(element, attributeKey) {
    return getNormalizedAttribute(element, attributeKey).value;
  }

  static hasNormalizedAttribute(element, attributeKey) {
    return getNormalizedAttribute(element, attributeKey).isPresent;
  }

  static getNormalizedAttributeKey(element, attributeKey) {
    let attribute = getNormalizedAttribute(element, attributeKey);
    return _.isEmpty(attribute.value) ? null : attribute.key;
  }

  static hasRepeaterAttribute(element) {
    return !_.isEmpty(Attributes.getRepeaterAttribute(element));
  }

  static getRepeaterAttribute(element) {
    let repeatExpression = Attributes.getNormalizedAttributeValue(element, HtmlAttribute.NG_REPEAT.attributeName);
    if (_.isEmpty(repeatExpression)) {
      repeatExpression = Attributes.getNormalizedAttributeValue(element, HtmlAttribute.NG_REPEAT_START.attributeName);
    }

    return repeatExpression;
  }

  static hasAngular2EventBindingAttribute(element, event) {
    return !_.isEmpty(Attributes.getAngular2EventBindingAttribute(element, event));
  }

  static getAngular2EventBindingAttribute(element, event) {
    let value = getAttribute(element, '(' + event + ')');
    if (_.isEmpty(value)) {
      value = getAttribute(element, 'on-' + event);
    }

    return value;
  }

  static extractAttributeValue(element, htmlAttribute) {
    let attributeValue = Attributes.getNormalizedAttributeValue(element, htmlAttribute.attributeName);
    return hasExpression(attributeValue) ? null : attributeValue;
  }

  static extractAttributeValueAllowingIndexExpression(element, htmlAttribute) {
    let attributeValue = Attributes.getNormalizedAttributeValue(element, htmlAttribute.attributeName);
    return allowIndexExpressionOrNoExpressions(attributeValue);
  }
}

function getNormalizedAttribute(element, attributeKey) {
  let attribute;
  let variants = [attributeKey, attributeKey.replace(/-/g, ":"), attributeKey.replace(/-/g, "_")];

  for (let variant of variants) {
    attribute = tryVariant(element, variant);

    if (attribute.isPresent) {
      break;
    }
  }

  return attribute;
}

function tryVariant(element, attributeKey) {
  let attribute = {};
  let keys = [attributeKey,
    "data-" + attributeKey,
    "data_" + attributeKey,
    "data:" + attributeKey,
    "x-" + attributeKey,
    "x_" + attributeKey,
    "x:" + attributeKey];

  for (let key of keys) {
    attribute.key = key;
    attribute.value = getAttribute(element, key);
    attribute.isPresent = hasAttribute(element, key);

    if (attribute.isPresent) {
      break;
    }
  }

  return attribute;
}

module.exports = Attributes;