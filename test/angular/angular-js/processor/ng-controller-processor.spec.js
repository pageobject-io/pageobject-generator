'use strict';

const expect = require('chai').expect;
const parse5 = require('parse5');
const select = require('css-select');
const Section = require('../../../../lib/page/section');
const NgControllerProcessor = require('../../../../lib/angular/angular-js/processor/ng-controller-processor');
const GeneratorContext = require('../../../../lib/generator-context');
const element = require('../../../processor/element-processor-spec-helper').element;
const assertElement = require('../../../processor/element-processor-spec-helper').assertElement;
const Types = require('../../../../lib/types');

describe('NgControllerProcessor', () => {

  let processor = new NgControllerProcessor();

  it('should match controller', () => {
    expect(processor.matches(element('<p ng-controller="Ctrl as ctrl"></p>'))).to.be.true;
    expect(processor.matches(element('<p data-ng-controller="Ctrl as ctrl"></p>'))).to.be.true;
  });

  it('should not match other elements', () => {
    expect(processor.matches(element('<p ng-controller="">/p>'))).to.be.false;
  });

  it('should register element if controller is specified', () => {
    let fragment = parse5.parseFragment('<p ng-controller="Ctrl as ctrl"></p>',
                                        {treeAdapter: parse5.treeAdapters.htmlparser2});

    let context = new GeneratorContext(fragment);
    context.domElement = select('p', fragment)[0];

    processor.process(context);

    let element = context.page.elements[0];

    assertElement(element, Section, [Types.NG_CONTROLLER], [], []);
    expect(element.name).to.equal('ctrl');
    expect(context.traversePageTreeDownBeforeChildren).to.be.true;
    expect(context.traversePageTreeUpAfterChildren).to.be.true;
  });

  it('should not register element if controller is not specified', () => {
    let fragment = parse5.parseFragment('<p ng-controller="Ctrl"></p>',
                                        {treeAdapter: parse5.treeAdapters.htmlparser2});

    let context = new GeneratorContext(fragment);
    context.domElement = select('p', fragment)[0];

    processor.process(context);

    expect(context.page.elements.length).to.equal(0);
  });

});