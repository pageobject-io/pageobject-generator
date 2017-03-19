"use strict";

const parse5 = require('parse5');

module.exports = function (fragment, source) {
  let documentFragment = parse5.parseFragment(fragment, {treeAdapter: parse5.treeAdapters.htmlparser2});
  let element = documentFragment.childNodes[0];
  return source.extractName(element);
};