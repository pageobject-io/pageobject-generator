'use strict';

const expect = require('chai').expect;
const parse5 = require('parse5');
const Element = require('../../lib/page/element');
const ButtonProcessor = require('../../lib/processor/button-processor');
const element = require('./element-processor-spec-helper').element;
const registersElement = require('./element-processor-spec-helper').registersElement;
const Types = require('../../lib/types');
const Actions = require('../../lib/actions');
const Assertions = require('../../lib/assertions');

describe('ButtonProcessor', () => {

  let processor = new ButtonProcessor();

  it('should match buttons', () => {
    expect(processor.matches(element('<button id="name1"></button>'))).to.be.true;
    expect(processor.matches(element('<input type="button" />'))).to.be.true;
    expect(processor.matches(element('<input type="Button" />'))).to.be.true;
    expect(processor.matches(element('<input type="submit" />'))).to.be.true;
    expect(processor.matches(element('<input type="Submit" />'))).to.be.true;
  });

  it('should not match other elements', () => {
    expect(processor.matches(element('<a id="link"></a>'))).to.be.false;
    expect(processor.matches(element('<p></p>'))).to.be.false;
  });

  it('should register element', () => {
    registersElement(processor,
                     Element,
                     [Types.BUTTON],
                     [Actions.CLICK],
                     [Assertions.VISIBILITY, Assertions.HAS_CLASS]);
  });

});