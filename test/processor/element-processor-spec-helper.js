"use strict";

const parse5 = require('parse5');
const expect = require('chai').expect;
const GeneratorContext = require('../../lib/generator-context');

module.exports = {
  element: function (fragment) {
    let documentFragment = parse5.parseFragment(fragment, {treeAdapter: parse5.treeAdapters.htmlparser2});
    return documentFragment.childNodes[0];
  },

  registersElement(processor, kind, types, actions, assertions) {
    let context = new GeneratorContext(null, '');
    processor.process(context);

    let element = context.page.elements[0];
    assertElement(element, kind, types, actions, assertions);
    return context;
  },

  assertElement: assertElement,

};

function assertElement(element, kind, types, actions, assertions) {
  expect(element).to.be.an.instanceof(kind);
  expect([...element.types]).to.have.members(types);
  expect([...element.actions]).to.have.members(actions);
  expect([...element.assertions]).to.have.members(assertions);
}