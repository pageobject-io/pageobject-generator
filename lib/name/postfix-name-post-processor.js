"use strict";

const _ = require('lodash');

class PostfixNamePostProcessor {

  constructor(postfix, postfixExceptions) {
    this._postfix = postfix;
    this._postfixExceptions = postfixExceptions;

    if (this.isMatchingElement === undefined) {
      throw new TypeError('Must override isMatchingElement');
    }
  }

  process(name, element) {
    if (!_.isEmpty(name) && !nameEndsWithAnyOfTheExceptionPrefixes.call(this, name)) {
      name += this._postfix;
    }

    return name;
  }

}

function nameEndsWithAnyOfTheExceptionPrefixes(name) {
  return _.some(this._postfixExceptions, (postfix) => {
    return name.endsWith(postfix)
  });
}

module.exports = PostfixNamePostProcessor;