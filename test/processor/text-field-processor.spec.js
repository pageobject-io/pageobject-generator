'use strict';

const expect = require('chai').expect;
const parse5 = require('parse5');
const Element = require('../../lib/page/element');
const TextFieldProcessor = require('../../lib/processor/text-field-processor');
const element = require('./element-processor-spec-helper').element;
const registersElement = require('./element-processor-spec-helper').registersElement;
const Types = require('../../lib/types');
const Actions = require('../../lib/actions');
const Assertions = require('../../lib/assertions');

describe('TextFieldProcessor', () => {

  let processor = new TextFieldProcessor();

  it('should match text fields', () => {
    expect(processor.matches(element('<input type="text" />'))).to.be.true;
    expect(processor.matches(element('<input type="Text" />'))).to.be.true;
    expect(processor.matches(element('<input type="TEXT" />'))).to.be.true;
    expect(processor.matches(element('<input type="tel" />'))).to.be.true;
    expect(processor.matches(element('<input type="Tel" />'))).to.be.true;
    expect(processor.matches(element('<input type="TEL" />'))).to.be.true;
    expect(processor.matches(element('<input type="search" />'))).to.be.true;
    expect(processor.matches(element('<input type="Search" />'))).to.be.true;
    expect(processor.matches(element('<input type="SEARCH" />'))).to.be.true;
    expect(processor.matches(element('<input type="url" />'))).to.be.true;
    expect(processor.matches(element('<input type="Url" />'))).to.be.true;
    expect(processor.matches(element('<input type="URL" />'))).to.be.true;
    expect(processor.matches(element('<input type="email" />'))).to.be.true;
    expect(processor.matches(element('<input type="Email" />'))).to.be.true;
    expect(processor.matches(element('<input type="EMAIL" />'))).to.be.true;
    expect(processor.matches(element('<input type="password" />'))).to.be.true;
    expect(processor.matches(element('<input type="Password" />'))).to.be.true;
    expect(processor.matches(element('<input type="PASSWORD" />'))).to.be.true;
    expect(processor.matches(element('<input type="number" />'))).to.be.true;
    expect(processor.matches(element('<input type="Number" />'))).to.be.true;
    expect(processor.matches(element('<input type="NUMBER" />'))).to.be.true;
    expect(processor.matches(element('<input type="range" />'))).to.be.true;
    expect(processor.matches(element('<input type="Range" />'))).to.be.true;
    expect(processor.matches(element('<input type="RANGE" />'))).to.be.true;
  });

  it('should not match other elements', () => {
    expect(processor.matches(element('<a id="link"></a>'))).to.be.false;
    expect(processor.matches(element('<input type="datetime-local"/>'))).to.be.false;
  });

  it('should register element', () => {
    registersElement(processor,
                     Element,
                     [Types.TEXT_INPUT],
                     [Actions.TEXT_MUTATOR],
                     [Assertions.VALUE, Assertions.ENABLED, Assertions.VISIBILITY]);
  });

});