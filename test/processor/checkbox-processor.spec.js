'use strict';

const expect = require('chai').expect;
const parse5 = require('parse5');
const Element = require('../../lib/page/element');
const CheckboxProcessor = require('../../lib/processor/checkbox-processor');
const element = require('./element-processor-spec-helper').element;
const registersElement = require('./element-processor-spec-helper').registersElement;
const Types = require('../../lib/types');
const Actions = require('../../lib/actions');
const Assertions = require('../../lib/assertions');

describe('CheckboxProcessor', () => {

  let processor = new CheckboxProcessor();

  it('should match checkboxes', () => {
    expect(processor.matches(element('<input type="checkbox"/>'))).to.be.true;
    expect(processor.matches(element('<input type="Checkbox"/>'))).to.be.true;
    expect(processor.matches(element('<input type="CHECKBOX"/>'))).to.be.true;
  });

  it('should not match other elements', () => {
    expect(processor.matches(element('<a id="link"></a>'))).to.be.false;
    expect(processor.matches(element('<inout type="radio"/>'))).to.be.false;
  });

  it('should register element', () => {
    registersElement(processor,
                     Element,
                     [Types.CHECKBOX],
                     [Actions.CLICK],
                     [Assertions.SELECTED, Assertions.ENABLED, Assertions.VISIBILITY, Assertions.HAS_CLASS]);
  });

});