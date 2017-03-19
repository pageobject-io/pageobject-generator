"use strict";

const PostfixNamePostProcessor = require('./postfix-name-post-processor');
const isLink = require('../element/elements').isLink;

class LinkPostfixNamePostProcessor extends PostfixNamePostProcessor {

  constructor() {
    super('Link', ['Link', 'Button']);
  }

  isMatchingElement(element) {
    return isLink(element);
  }

}

module.exports = LinkPostfixNamePostProcessor;