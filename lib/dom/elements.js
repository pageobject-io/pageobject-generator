'use strict';

const hasNormalizedAttribute = require('./attributes').hasNormalizedAttribute;
const getAttribute = require('./attributes').getAttribute;
const _ = require('lodash');
const select = require('css-select');
const NG_FOR = require('../types').NG_FOR;
const NG_REPEAT = require('../types').NG_REPEAT;

const blockTags = ["html",
                   "head",
                   "body",
                   "frameset",
                   "script",
                   "noscript",
                   "style",
                   "meta",
                   "link",
                   "title",
                   "frame",
                   "noframes",
                   "section",
                   "nav",
                   "aside",
                   "hgroup",
                   "header",
                   "footer",
                   "p",
                   "h1",
                   "h2",
                   "h3",
                   "h4",
                   "h5",
                   "h6",
                   "ul",
                   "ol",
                   "pre",
                   "div",
                   "blockquote",
                   "hr",
                   "address",
                   "figure",
                   "figcaption",
                   "form",
                   "fieldset",
                   "ins",
                   "del",
                   "s",
                   "dl",
                   "dt",
                   "dd",
                   "li",
                   "table",
                   "caption",
                   "thead",
                   "tfoot",
                   "tbody",
                   "colgroup",
                   "col",
                   "tr",
                   "th",
                   "td",
                   "video",
                   "audio",
                   "canvas",
                   "details",
                   "menu",
                   "plaintext",
                   "template",
                   "article",
                   "main",
                   "svg",
                   "math"];

class Elements {

  static isButton(element) {
    return element.tagName === 'button' || (element.tagName === 'input' &&
                                            (getAttribute(element, 'type').toLowerCase() === 'button' ||
                                             getAttribute(element, 'type').toLowerCase() === 'submit'));
  }

  static isLink(element) {
    return element.tagName === 'a';
  }

  static text(elements) {
    if (!_.isArray(elements)) {
      elements = [elements];
    }

    let text = '';

    for (let i = 0; i < elements.length; i++) {
      let element = elements[i];
      if (element.type === 'text') {
        text += element.data;
      } else if (element.type === 'tag' && (element.tagName === 'br' || blockTags.indexOf(element.tagName) > -1)) {
        text += ' ';
      }

      if (element.children && element.type !== 'comment') {
        text += Elements.text(element.children);
      }
    }

    return text.replace(/\s+/g, ' ').trim();
  }

  static ownText(element) {
    let text = '';

    if (element.childNodes) {
      for (let child of element.childNodes) {
        if (child.type === 'text') {
          text += child.data;
        } else if (child.type === 'tag' && child.tagName === 'br') {
          text += ' ';
        }
      }
    }

    return text.replace(/\s+/g, ' ').trim();
  }

  static generateCssSelector(element) {
    let domElement = element.domElement;
    return doGenerateCssSelector(element, domElement);
  }

  static classList(element) {
    let classAttrValue = getAttribute(element, 'class');
    return !_.isEmpty(classAttrValue) ? classAttrValue.trim().split(/\s+/g) : [];
  }

}

function doGenerateCssSelector(element, domElement) {
  let id = getAttribute(domElement, 'id');
  if (!_.isEmpty(id)) {
    return '#' + id;
  }

  let tagName = domElement.tagName.replace(/:/g, '|');
  let selector = tagName;
  selector = addClasses(domElement, selector);

  let parent = domElement.parent;
  if (parent.tagName === 'root') {
    return selector;
  }

  if (parent.tagName === 'body') {
    if (element.page.isFragment()) {
      return selector;
    } else {
      return 'body > ' + selector;
    }
  }

  let directChildrenSelector = '>' + selector;
  let numberOfDirectChildren = getNumberOfChildren(directChildrenSelector, parent);

  if (isNested(element)) {
    let numberOfAllChildren = getNumberOfChildren(selector, parent);
    if (numberOfAllChildren !== numberOfDirectChildren) {
      return null;
    }
  }

  if (numberOfDirectChildren > 1) {
    let childrenWithSameSelector = select(directChildrenSelector, parent);
    let type = childrenWithSameSelector[0].tagName;
    let childrenWithSameType = select('>' + type, parent);
    let siblingIndex = childrenWithSameType.indexOf(domElement);

    if (anyPrecedingSiblingIsAStopElement(childrenWithSameType, siblingIndex)) {
      return null;
    }

    selector += `:nth-of-type(${siblingIndex + 1})`;
  }

  if (hasReachedLastRepeaterElement(element, parent)) {
    return selector;
  }

  selector = ' > ' + selector;

  let parentSelector = doGenerateCssSelector(element, parent);
  return parentSelector == null ? null : parentSelector + selector;
}

function addClasses(element, selector) {
  let classes = Elements.classList(element).join('.');
  return classes.length > 0 ? selector + '.' + classes : selector;
}

function getNumberOfChildren(selector, parent) {
  let matches = select(selector, parent);
  return matches.length;
}

function isNested(element) {
  return element.getAncestorsOfType(NG_FOR, NG_REPEAT).length > 0;
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

function hasReachedLastRepeaterElement(element, parent) {
  return isNested(element) && element.getAncestorsOfType(NG_FOR, NG_REPEAT).pop().domElement === parent;
}

module.exports = Elements;