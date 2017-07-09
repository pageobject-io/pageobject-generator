'use strict';

const expect = require('chai').expect;
const parse5 = require('parse5');
const Section = require('../../../../lib/page/section');
const NgForProcessor = require('../../../../lib/angular/angular/processor/ng-for-processor');
const element = require('../../../processor/element-processor-spec-helper').element;
const registersElement = require('../../../processor/element-processor-spec-helper').registersElement;
const Types = require('../../../../lib/types');
const Actions = require('../../../../lib/actions');
const Assertions = require('../../../../lib/assertions');

describe('NgForProcessor', () => {

  let processor = new NgForProcessor();

  it('should match ngFor', () => {
    expect(processor.matches(element('<p *ngFor="let item of list"></p>'))).to.be.true;
  });

  it('should not match other elements', () => {
    expect(processor.matches(element('<p></p>'))).to.be.false;
  });

  it('should register element', () => {
    let context = registersElement(processor, Section, [Types.NG_FOR], [], [Assertions.COUNT]);
    expect(context.traversePageTreeDownBeforeChildren).to.be.true;
    expect(context.traversePageTreeUpAfterChildren).to.be.true;
  });

});