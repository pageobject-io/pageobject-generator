"use strict";

const parse5 = require('parse5');
const Element = require('../../lib/page/element');

module.exports = function (fragment, source, depth) {
  let documentFragment = parse5.parseFragment(fragment, {treeAdapter: parse5.treeAdapters.htmlparser2});
  let domElement = documentFragment.childNodes[0];
  let element = new Element(domElement, null);
  return source.locator(element, depth);
};