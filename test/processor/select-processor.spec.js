'use strict';

const expect = require('chai').expect;
const parse5 = require('parse5');
const Element = require('../../lib/page/element');
const SelectProcessor = require('../../lib/processor/select-processor');
const element = require('./element-processor-spec-helper').element;
const registersElement = require('./element-processor-spec-helper').registersElement;
const Types = require('../../lib/types');
const Actions = require('../../lib/actions');
const Assertions = require('../../lib/assertions');

describe('SelectProcessor', () => {

  let processor = new SelectProcessor();

  it('should match selects', () => {
    expect(processor.matches(element('<select id="name1"></select>'))).to.be.true;
  });

  it('should not match other elements', () => {
    expect(processor.matches(element('<a id="link"></a>'))).to.be.false;
    expect(processor.matches(element('<p></p>'))).to.be.false;
  });

  it('should register element', () => {
    registersElement(processor,
                     Element,
                     [Types.SELECT],
                     [Actions.SELECT_OPTION_BY_PARTIAL_TEXT,
                      Actions.SELECT_OPTION_BY_TEXT,
                      Actions.SELECT_OPTION_BY_VALUE],
                     [Assertions.OPTION_SELECTED_BY_PARTIAL_TEXT,
                      Assertions.OPTION_SELECTED_BY_TEXT,
                      Assertions.OPTION_SELECTED_BY_VALUE,
                      Assertions.VISIBILITY,
                      Assertions.ENABLED,
                      Assertions.HAS_CLASS]);
  });

});