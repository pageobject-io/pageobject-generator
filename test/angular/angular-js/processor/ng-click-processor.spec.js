'use strict';

const expect = require('chai').expect;
const parse5 = require('parse5');
const Element = require('../../../../lib/page/element');
const NgClickProcessor = require('../../../../lib/angular/angular-js/processor/ng-click-processor');
const element = require('../../../processor/element-processor-spec-helper').element;
const registersElement = require('../../../processor/element-processor-spec-helper').registersElement;
const Types = require('../../../../lib/types');
const Actions = require('../../../../lib/actions');
const Assertions = require('../../../../lib/assertions');

describe('NgClickProcessor', () => {

  let processor = new NgClickProcessor();

  it('should match clickable elements', () => {
    expect(processor.matches(element('<p ng-click="handler()"></p>'))).to.be.true;
    expect(processor.matches(element('<p data-ng-click="handler()"></p>'))).to.be.true;
  });

  it('should not match other elements', () => {
    expect(processor.matches(element('<a ng-click="handler()"></a>'))).to.be.false;
    expect(processor.matches(element('<button ng-click="handler()"></button>'))).to.be.false;
    expect(processor.matches(element('<p>/p>'))).to.be.false;
  });

  it('should register element', () => {
    registersElement(processor,
                     Element,
                     [Types.CLICKABLE],
                     [Actions.CLICK],
                     [Assertions.VISIBILITY, Assertions.HAS_CLASS]);
  });

});