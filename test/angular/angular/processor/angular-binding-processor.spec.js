'use strict';

const expect = require('chai').expect;
const parse5 = require('parse5');
const Element = require('../../../../lib/page/element');
const AngularBindingProcessor = require('../../../../lib/angular/angular/processor/angular-binding-processor');
const element = require('../../../processor/element-processor-spec-helper').element;
const registersElement = require('../../../processor/element-processor-spec-helper').registersElement;
const Types = require('../../../../lib/types');
const Actions = require('../../../../lib/actions');
const Assertions = require('../../../../lib/assertions');

describe('AngularBindingProcessor', () => {

  let processor = new AngularBindingProcessor();

  it('should match bindings', () => {
    expect(processor.matches(element('<p id="name1">with {{binding}}</p>'))).to.be.true;
    expect(processor.matches(element('<p id="name1">{{binding}}</p>'))).to.be.true;
    expect(processor.matches(element('<p id="name1">{{binding}}<p>{{nested}}</p></p>'))).to.be.true;
  });

  it('should not match other elements', () => {
    expect(processor.matches(element('<a id="link"></a>'))).to.be.false;
    expect(processor.matches(element('<p><p>{{binding}}</p></p>'))).to.be.false;
  });

  it('should register element', () => {
    registersElement(processor, Element, [Types.BINDING], [], [Assertions.TEXT, Assertions.HAS_CLASS]);
  });

});