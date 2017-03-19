'use strict';

const _ = require('lodash');

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

class DomHelpers {

  static getAttribute(element, key) {
    const attributes = element.attribs;

    if (attributes) {
      for (let attribute in attributes) {
        if (attribute.toUpperCase() === key.toUpperCase()) {
          return attributes[attribute];
        }
      }
    }

    return "";
  }

  static hasAttribute(element, key) {
    const attributes = element.attribs;

    if (attributes) {
      for (let attribute in attributes) {
        if (attribute.toUpperCase() === key.toUpperCase()) {
          return true;
        }
      }
    }

    return false;
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
        text += DomHelpers.text(element.children);
      }
    }

    return text.replace(/\s+/g, ' ').trim();
  }

  static ownText(element) {
    let text = '';

    for (let child of element.childNodes) {
      if (child.type === 'text') {
        text += child.data;
      } else if (child.type === 'tag' && child.tagName === 'br') {
        text += ' ';
      }
    }

    return text.replace(/\s+/g, ' ').trim();
  }

}

module.exports = DomHelpers;