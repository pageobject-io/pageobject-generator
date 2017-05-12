'use strict';

const expect = require('chai').expect;
const parse5 = require('parse5');
const Section = require('../../../../lib/page/section');
const NgRepeatProcessor = require('../../../../lib/angular/angular-js/processor/ng-repeat-processor');
const element = require('../../../processor/element-processor-spec-helper').element;
const registersElement = require('../../../processor/element-processor-spec-helper').registersElement;
const Types = require('../../../../lib/types');
const Assertions = require('../../../../lib/assertions');

describe('NgRepeatProcessor', () => {

  let processor = new NgRepeatProcessor();

  it('should match ng-repeat', () => {
    expect(processor.matches(element('<p ng-repeat="item in items"></p>'))).to.be.true;
    expect(processor.matches(element('<p data-ng-repeat="item in items"></p>'))).to.be.true;
  });

  it('should not match other elements', () => {
    expect(processor.matches(element('<p></p>'))).to.be.false;
  });

  it('should register element', () => {
    let context = registersElement(processor, Section, [Types.NG_REPEAT], [], [Assertions.COUNT]);
    expect(context.traversePageTreeDownBeforeChildren).to.be.true;
    expect(context.traversePageTreeUpAfterChildren).to.be.true;
  });

});