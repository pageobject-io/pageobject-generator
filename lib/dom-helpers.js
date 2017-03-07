'use strict';

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

}

module.exports = DomHelpers;