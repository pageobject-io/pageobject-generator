'use strict';

const expect = require('chai').expect;
const parse5 = require('parse5');
const select = require('css-select');
const Element = require('../../lib/page/element');
const RadioButtonProcessor = require('../../lib/processor/radio-button-processor');
const GeneratorContext = require('../../lib/generator-context');
const element = require('./element-processor-spec-helper').element;
const assertElement = require('./element-processor-spec-helper').assertElement;
const Types = require('../../lib/types');
const Actions = require('../../lib/actions');
const Assertions = require('../../lib/assertions');

describe('RadioButtonProcessor', () => {

  let processor = new RadioButtonProcessor();

  it('should match radio buttons', () => {
    expect(processor.matches(element('<input type="radio" />'))).to.be.true;
    expect(processor.matches(element('<input type="Radio" />'))).to.be.true;
    expect(processor.matches(element('<input type="RADIO" />'))).to.be.true;
  });

  it('should not match other elements', () => {
    expect(processor.matches(element('<a id="link"></a>'))).to.be.false;
    expect(processor.matches(element('<input type="checkbox"/>'))).to.be.false;
  });

  describe('process', () => {

    it('should register element for first radio in group', () => {
      let fragment = parse5.parseFragment('<input type="radio" name="color" value="red"/>' +
                                          '<input type="radio" name="color" value="orange"/>' +
                                          '<input type="radio" name="color" value="blue"/>',
                                          {treeAdapter: parse5.treeAdapters.htmlparser2});

      let context = new GeneratorContext(fragment, '');
      context.domElement = select('input', fragment)[0];

      processor.process(context);

      let element = context.page.elements[0];

      assertElement(element,
                    Element,
                    [Types.RADIO],
                    [Actions.CLICK_BY_INDEX, Actions.CLICK_BY_VALUE],
                    [Assertions.SELECTED_BY_INDEX,
                     Assertions.SELECTED_BY_VALUE,
                     Assertions.ENABLED_BY_INDEX,
                     Assertions.VISIBILITY_BY_INDEX,
                     Assertions.HAS_CLASS]);
    });

    it('should not register element for other radios in group', () => {
      let fragment = parse5.parseFragment('<input type="radio" name="color" value="red"/>' +
                                          '<input type="radio" name="color" value="orange"/>' +
                                          '<input type="radio" name="color" value="blue"/>',
                                          {treeAdapter: parse5.treeAdapters.htmlparser2});

      let context = new GeneratorContext(fragment, '');
      context.domElement = select('input', fragment)[1];
      processor.process(context);

      expect(context.page.elements.length).to.equal(0);

      context = new GeneratorContext(fragment, '');
      context.domElement = select('input', fragment)[2];
      processor.process(context);

      expect(context.page.elements.length).to.equal(0);
    });

    it('should register element if ng-model is used', () => {
      let fragment = parse5.parseFragment('<input type="radio" ng-model="color" value="red"/>' +
                                          '<input type="radio" ng-model="color" value="orange"/>' +
                                          '<input type="radio" ng-model="color" value="blue"/>',
                                          {treeAdapter: parse5.treeAdapters.htmlparser2});

      let context = new GeneratorContext(fragment, '');
      context.domElement = select('input', fragment)[0];

      processor.process(context);

      let element = context.page.elements[0];

      assertElement(element,
                    Element,
                    [Types.RADIO],
                    [Actions.CLICK_BY_INDEX, Actions.CLICK_BY_VALUE],
                    [Assertions.SELECTED_BY_INDEX,
                     Assertions.SELECTED_BY_VALUE,
                     Assertions.ENABLED_BY_INDEX,
                     Assertions.VISIBILITY_BY_INDEX,
                     Assertions.HAS_CLASS]);
    });

    it('should register separate elements for different groups', () => {
      let fragment = parse5.parseFragment('<input type="radio" ng-model="color" value="red"/>' +
                                          '<input type="radio" ng-model="color" value="orange"/>' +
                                          '<input type="radio" ng-model="color" value="blue"/>' +
                                          '<input type="radio" ng-model="size" value="S"/>' +
                                          '<input type="radio" ng-model="size" value="M"/>',
                                          {treeAdapter: parse5.treeAdapters.htmlparser2});

      let context = new GeneratorContext(fragment, '');
      context.domElement = select('input', fragment)[0];
      processor.process(context);

      let element = context.page.elements[0];

      assertElement(element,
                    Element,
                    [Types.RADIO],
                    [Actions.CLICK_BY_INDEX, Actions.CLICK_BY_VALUE],
                    [Assertions.SELECTED_BY_INDEX,
                     Assertions.SELECTED_BY_VALUE,
                     Assertions.ENABLED_BY_INDEX,
                     Assertions.VISIBILITY_BY_INDEX,
                     Assertions.HAS_CLASS]);

      context.domElement = select('input', fragment)[3];
      processor.process(context);

      element = context.page.elements[1];

      assertElement(element,
                    Element,
                    [Types.RADIO],
                    [Actions.CLICK_BY_INDEX, Actions.CLICK_BY_VALUE],
                    [Assertions.SELECTED_BY_INDEX,
                     Assertions.SELECTED_BY_VALUE,
                     Assertions.ENABLED_BY_INDEX,
                     Assertions.VISIBILITY_BY_INDEX,
                     Assertions.HAS_CLASS]);
    });

    it('should register element in repeater', () => {
      let fragment = parse5.parseFragment('<input type="radio" ng-model="color" value="red"/>' +
                                          '<div ng-repeat="item in items">' +
                                          '<input type="radio" ng-model="color" value="red"/>' +
                                          '<input type="radio" ng-model="color" value="orange"/>' +
                                          '<input type="radio" ng-model="color" value="blue"/>' +
                                          '</div>',
                                          {treeAdapter: parse5.treeAdapters.htmlparser2});

      let context = new GeneratorContext(fragment, '');
      context.domElement = select('div', fragment)[0];

      let section = context.addPageSection();
      section.addTypes(Types.NG_REPEAT);
      section.addAssertions(Assertions.COUNT);

      context.traversePageTreeDown();
      context.domElement = select('input', fragment)[1];

      processor.process(context);

      let element = context.page.elements[0].elements[0];

      assertElement(element,
                    Element,
                    [Types.RADIO],
                    [Actions.CLICK_BY_INDEX, Actions.CLICK_BY_VALUE],
                    [Assertions.SELECTED_BY_INDEX,
                     Assertions.SELECTED_BY_VALUE,
                     Assertions.ENABLED_BY_INDEX,
                     Assertions.VISIBILITY_BY_INDEX,
                     Assertions.HAS_CLASS]);
    });

  });

});