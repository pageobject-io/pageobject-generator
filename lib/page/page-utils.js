"use strict";

module.exports = function addElement(domElement, elements, type, parent) {
  for (let existingElement of elements) {
    if (existingElement.domElement === domElement) {
      return existingElement;
    }
  }

  let element = new type(domElement, parent);
  elements.push(element);
  return element;
};