'use strict';

const expect = require('chai').expect;
const parse5 = require('parse5');
const Element = require('../../lib/page/element');
const DateFieldProcessor = require('../../lib/processor/date-field-processor');
const element = require('./element-processor-spec-helper').element;
const registersElement = require('./element-processor-spec-helper').registersElement;
const Types = require('../../lib/types');
const Actions = require('../../lib/actions');
const Assertions = require('../../lib/assertions');

describe('DateFieldProcessor', () => {

  let processor = new DateFieldProcessor();

  it('should match date fields', () => {
    expect(processor.matches(element('<input type="date" />'))).to.be.true;
    expect(processor.matches(element('<input type="Date" />'))).to.be.true;
    expect(processor.matches(element('<input type="DATE" />'))).to.be.true;
    expect(processor.matches(element('<input type="time" />'))).to.be.true;
    expect(processor.matches(element('<input type="Time" />'))).to.be.true;
    expect(processor.matches(element('<input type="TIME" />'))).to.be.true;
    expect(processor.matches(element('<input type="datetime-local" />'))).to.be.true;
    expect(processor.matches(element('<input type="Datetime-local" />'))).to.be.true;
    expect(processor.matches(element('<input type="DATETIME-LOCAL" />'))).to.be.true;
    expect(processor.matches(element('<input type="datetime" />'))).to.be.true;
    expect(processor.matches(element('<input type="Datetime" />'))).to.be.true;
    expect(processor.matches(element('<input type="DATETIME" />'))).to.be.true;
    expect(processor.matches(element('<input type="month" />'))).to.be.true;
    expect(processor.matches(element('<input type="Month" />'))).to.be.true;
    expect(processor.matches(element('<input type="MONTH" />'))).to.be.true;
    expect(processor.matches(element('<input type="week" />'))).to.be.true;
    expect(processor.matches(element('<input type="Week" />'))).to.be.true;
    expect(processor.matches(element('<input type="WEEK" />'))).to.be.true;
  });

  it('should not match other elements', () => {
    expect(processor.matches(element('<a id="link"></a>'))).to.be.false;
    expect(processor.matches(element('<input type="checkbox"/>'))).to.be.false;
  });

  it('should register element', () => {
    registersElement(processor,
                     Element,
                     [Types.DATE_INPUT],
                     [Actions.DATE_MUTATOR],
                     [Assertions.VALUE, Assertions.ENABLED, Assertions.VISIBILITY, Assertions.HAS_CLASS]);
  });

});