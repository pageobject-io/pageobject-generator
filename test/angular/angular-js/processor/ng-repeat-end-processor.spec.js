'use strict';

const expect = require('chai').expect;
const parse5 = require('parse5');
const select = require('css-select');
const NgRepeatEndProcessor = require('../../../../lib/angular/angular-js/processor/ng-repeat-end-processor');
const element = require('../../../processor/element-processor-spec-helper').element;
const GeneratorContext = require('../../../../lib/generator-context');

describe('NgRepeatEndProcessor', () => {

  let processor = new NgRepeatEndProcessor();

  it('should match ng-repeat-end', () => {
    expect(processor.matches(element('<p ng-repeat-end></p>'))).to.be.true;
    expect(processor.matches(element('<p data-ng-repeat-end></p>'))).to.be.true;
  });

  it('should not match other elements', () => {
    expect(processor.matches(element('<p>/p>'))).to.be.false;
  });

  it('should not register element', () => {
    let fragment = parse5.parseFragment('<p ng-repeat-end></p>',
                                        {treeAdapter: parse5.treeAdapters.htmlparser2});

    let context = new GeneratorContext(fragment);
    context.domElement = select('p', fragment)[0];

    processor.process(context);

    expect(context.page.elements.length).to.equal(0);
    expect(context.traversePageTreeDownBeforeChildren).to.be.false;
    expect(context.traversePageTreeUpAfterChildren).to.be.true;
  });

});