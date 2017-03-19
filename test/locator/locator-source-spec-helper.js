"use strict";

const parse5 = require('parse5');
const GeneratorContext = require('../../lib/generator-context');

module.exports = function (fragment, source) {
  let documentFragment = parse5.parseFragment(fragment, {treeAdapter: parse5.treeAdapters.htmlparser2});
  let element = documentFragment.childNodes[0];
  let context = new GeneratorContext();
  context.element = element;
  return source.locator(context);
};