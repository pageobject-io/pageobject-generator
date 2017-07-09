'use strict';

const expect = require('chai').expect;
const parse5 = require('parse5');
const Element = require('../../lib/page/element');
const TextAreaProcessor = require('../../lib/processor/text-area-processor');
const element = require('./element-processor-spec-helper').element;
const registersElement = require('./element-processor-spec-helper').registersElement;
const Types = require('../../lib/types');
const Actions = require('../../lib/actions');
const Assertions = require('../../lib/assertions');

describe('TextAreaProcessor', () => {

  let processor = new TextAreaProcessor();

  it('should match text areas', () => {
    expect(processor.matches(element('<textarea id="name1"></textarea>'))).to.be.true;
  });

  it('should not match other elements', () => {
    expect(processor.matches(element('<a id="link"></a>'))).to.be.false;
    expect(processor.matches(element('<p></p>'))).to.be.false;
  });

  it('should register element', () => {
    registersElement(processor,
                     Element,
                     [Types.TEXT_AREA],
                     [Actions.TEXT_MUTATOR],
                     [Assertions.VALUE, Assertions.ENABLED, Assertions.VISIBILITY]);
  });

});