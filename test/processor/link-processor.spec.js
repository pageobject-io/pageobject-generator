'use strict';

const expect = require('chai').expect;
const parse5 = require('parse5');
const Element = require('../../lib/page/element');
const LinkProcessor = require('../../lib/processor/link-processor');
const element = require('./element-processor-spec-helper').element;
const registersElement = require('./element-processor-spec-helper').registersElement;
const Types = require('../../lib/types');
const Actions = require('../../lib/actions');
const Assertions = require('../../lib/assertions');

describe('LinkProcessor', () => {

  let processor = new LinkProcessor();

  it('should match links', () => {
    expect(processor.matches(element('<a id="link"></a>'))).to.be.true;
  });

  it('should not match other elements', () => {
    expect(processor.matches(element('<p></p>'))).to.be.false;
  });

  it('should register element', () => {
    registersElement(processor,
                     Element,
                     [Types.LINK],
                     [Actions.CLICK],
                     [Assertions.VISIBILITY, Assertions.HAS_CLASS]);
  });

});