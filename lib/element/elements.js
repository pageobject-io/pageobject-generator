'use strict';

const getAttribute = require('../dom-helpers').getAttribute;
const hasNormalizedAttribute = require('../attribute/attributes').hasNormalizedAttribute;
const _ = require('lodash');
const select = require('css-select');

class Elements {

  static isButton(element) {
    return element.tagName === 'button' || (element.tagName === 'input' &&
                                            (getAttribute(element, 'type') === 'button' ||
                                             getAttribute(element, 'type') === 'submit'));
  }

  static isLink(element) {
    return element.tagName === 'a';
  }

  static generateCssSelector(element, context) {
    let id = getAttribute(element, 'id');
    if (!_.isEmpty(id)) {
      return '#' + id;
    }

    let tagName = element.tagName.replace(/:/g, '|');
    let selector = tagName;
    selector = addClasses(element, selector);

    let parent = element.parent;
    if (parent.tagName === 'root') {
      return selector;
    }

    if (parent.tagName === 'body') {
      if (context.source.includes('<body')) {
        return 'body > ' + selector;
      } else {
        return selector;
      }
    }

    let directChildrenSelector = '>' + selector;
    let numberOfDirectChildren = getNumberOfChildren(directChildrenSelector, parent);

    if (context.isNestedElement()) {
      let numberOfAllChildren = getNumberOfChildren(selector, parent);
      if (numberOfAllChildren !== numberOfDirectChildren) {
        return null;
      }
    }

    if (numberOfDirectChildren > 1) {
      let childrenWithSameSelector = select(directChildrenSelector, parent);
      let type = childrenWithSameSelector[0].tagName;
      let childrenWithSameType = select('>' + type, parent);
      let siblingIndex = childrenWithSameType.indexOf(element);

      if (anyPrecedingSiblingIsAStopElement(childrenWithSameType, siblingIndex)) {
        return null;
      }

      selector += `:nth-of-type(${siblingIndex + 1})`;
    }

    if (hasReachedLastRepeaterElement(context, parent)) {
      return selector;
    }

    selector = ' > ' + selector;

    let parentSelector = Elements.generateCssSelector(parent, context);
    return parentSelector == null ? null : parentSelector + selector;
  }

  static classList(element) {
    let classAttrValue = getAttribute(element, 'class');
    return !_.isEmpty(classAttrValue) ? classAttrValue.trim().split(/\s+/g) : [];
  }

}

function addClasses(element, selector) {
  let classes = Elements.classList(element).join('.');
  return classes.length > 0 ? selector + '.' + classes : selector;
}

function getNumberOfChildren(selector, parent) {
  let matches = select(selector, parent);
  return matches.length;
}

function anyPrecedingSiblingIsAStopElement(childrenWithSameType, siblingIndex) {
  for (let i = 0; i <= siblingIndex; i++) {
    let sibling = childrenWithSameType[i];
    if (isStopElement(sibling)) {
      return true;
    }
  }
  return false;
}

function isStopElement(element) {
  let normalizedAttributes = ['ng-if', 'ng-repeat'];

  for (let normalizedAttribute of normalizedAttributes) {
    if (hasNormalizedAttribute(element, normalizedAttribute)) {
      return true;
    }
  }

  let regularAttributes = ['*ngIf', '*ngFor'];

  for (let regularAttribute of regularAttributes) {
    if (!_.isEmpty(getAttribute(element, regularAttribute))) {
      return true;
    }
  }

  return false;
}

function hasReachedLastRepeaterElement(context, parent) {
  return context.isNestedElement() && context.getLastRepeaterElement() === parent;
}

module.exports = Elements;