"use strict";

const PostfixNamePostProcessor = require('./postfix-name-post-processor');
const isButton = require('../dom/elements').isButton;

class ButtonPostfixNamePostProcessor extends PostfixNamePostProcessor {

  constructor() {
    super('Button', ['Button']);
  }

  isMatchingElement(element) {
    return isButton(element);
  }

}

module.exports = ButtonPostfixNamePostProcessor;