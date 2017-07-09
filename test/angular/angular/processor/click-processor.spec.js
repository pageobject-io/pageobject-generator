'use strict';

const expect = require('chai').expect;
const parse5 = require('parse5');
const Element = require('../../../../lib/page/element');
const ClickProcessor = require('../../../../lib/angular/angular/processor/click-processor');
const element = require('../../../processor/element-processor-spec-helper').element;
const registersElement = require('../../../processor/element-processor-spec-helper').registersElement;
const Types = require('../../../../lib/types');
const Actions = require('../../../../lib/actions');
const Assertions = require('../../../../lib/assertions');

describe('ClickProcessor', () => {

  let processor = new ClickProcessor();

  it('should match click', () => {
    expect(processor.matches(element('<p (click)="handler()">clickable</p>'))).to.be.true;
    expect(processor.matches(element('<div (click)="handler()">clickable</div>'))).to.be.true;
  });

  it('should not match other elements', () => {
    expect(processor.matches(element('<a (click)="handler()"></a>'))).to.be.false;
    expect(processor.matches(element('<button (click)="handler()"></button>'))).to.be.false;
    expect(processor.matches(element('<p></p>'))).to.be.false;
  });

  it('should register element', () => {
    registersElement(processor,
                     Element,
                     [Types.CLICKABLE],
                     [Actions.CLICK],
                     [Assertions.VISIBILITY, Assertions.HAS_CLASS]);
  });

});