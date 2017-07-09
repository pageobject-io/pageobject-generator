'use strict';

const expect = require('chai').expect;
const Attributes = require('../../lib/dom/attributes');
const HtmlAttribute = require('../../lib/dom/html-attribute');

describe('Attributes', function () {

  describe('getAttribute', function () {
    it('should return attribute', function () {
      let element = {attribs: {}};
      element.attribs.test = 'value';

      expect(Attributes.getAttribute(element, 'test')).to.equal('value');
      expect(Attributes.getAttribute(element, 'tEst')).to.equal('value');
      expect(Attributes.getAttribute(element, 'TEST')).to.equal('value');
    });

    it('should return empty string for missing attribute', function () {
      let element = {attribs: {}};
      element.attribs.test = 'value';

      expect(Attributes.getAttribute(element, 'test1')).to.equal('');

      element = {};
      expect(Attributes.getAttribute(element, 'test1')).to.equal('');
    });
  });

  describe('hasAttribute', function () {
    it('should return true if attribute is present', function () {
      let element = {attribs: {}};
      element.attribs.test = 'value';

      expect(Attributes.hasAttribute(element, 'test')).to.be.true;
      expect(Attributes.hasAttribute(element, 'tEst')).to.be.true;
      expect(Attributes.hasAttribute(element, 'TEST')).to.be.true;
    });

    it('should return false for missing attribute', function () {
      let element = {attribs: {}};
      element.attribs.test = 'value';

      expect(Attributes.hasAttribute(element, 'test1')).to.be.false;

      element = {};
      expect(Attributes.hasAttribute(element, 'test1')).to.be.false;
    });
  });

  it('should handle AngularJS attributes', function () {
    const variants = ['ng-model',
      'data-ng-model',
      'data_ng-model',
      'data:ng-model',
      'x-ng-model',
      'x_ng-model',
      'x:ng-model',
      'ng_model',
      'data-ng_model',
      'data_ng_model',
      'data:ng_model',
      'x-ng_model',
      'x_ng-model',
      'x:ng-model',
      'ng:model',
      'data-ng:model',
      'data_ng:model',
      'data:ng:model',
      'x-ng:model',
      'x_ng:model',
      'x:ng:model'];

    for (let variant of variants) {
      let element = {attribs: {}};
      element.attribs[variant] = 'value';
      let value = Attributes.getNormalizedAttributeValue(element, 'ng-model');

      expect(value).to.equal('value');
      expect(Attributes.hasNormalizedAttribute(element, 'ng-model')).to.be.true;

      let key = Attributes.getNormalizedAttributeKey(element, 'ng-model');
      expect(key).to.equal(variant);
    }
  });

  describe('hasNormalizedAttribute', function () {
    it('should return false for missing attribute', function () {
      let element = {attribs: {}};
      element.attribs.test = 'value';
      expect(Attributes.hasNormalizedAttribute(element, 'ng-model')).to.be.false;
    });
  });

  describe('getNormalizedAttributeKey', function () {
    it('should return null for missing attribute', function () {
      let element = {attribs: {}};
      element.attribs.test = 'value';
      expect(Attributes.getNormalizedAttributeKey(element, 'ng-model')).to.be.null;
    });
  });

  describe('repeater methods', function () {
    it('should handle ng-repeat', function () {
      const variants = ['ng-repeat',
        'data-ng-repeat',
        'data_ng-repeat',
        'data:ng-repeat',
        'x-ng-repeat',
        'x_ng-repeat',
        'x:ng-repeat',
        'ng_repeat',
        'data-ng_repeat',
        'data_ng_repeat',
        'data:ng_repeat',
        'x-ng_repeat',
        'x_ng-repeat',
        'x:ng-repeat',
        'ng:repeat',
        'data-ng:repeat',
        'data_ng:repeat',
        'data:ng:repeat',
        'x-ng:repeat',
        'x_ng:repeat',
        'x:ng:repeat'];

      for (let variant of variants) {
        let element = {attribs: {}};
        element.attribs[variant] = 'value';
        let value = Attributes.getRepeaterAttribute(element, 'ng-repeat');

        expect(value).to.equal('value');
        expect(Attributes.hasRepeaterAttribute(element, 'ng-repeat')).to.be.true;
      }
    });

    it('should handle ng-repeat-start', function () {
      const variants = ['ng-repeat-start',
        'data-ng-repeat-start',
        'data_ng-repeat-start',
        'data:ng-repeat-start',
        'x-ng-repeat-start',
        'x_ng-repeat-start',
        'x:ng-repeat-start',
        'ng_repeat_start',
        'data-ng_repeat_start',
        'data_ng_repeat_start',
        'data:ng_repeat_start',
        'x-ng_repeat_start',
        'x_ng-repeat-start',
        'x:ng-repeat-start',
        'ng:repeat:start',
        'data-ng:repeat:start',
        'data_ng:repeat:start',
        'data:ng:repeat:start',
        'x-ng:repeat:start',
        'x_ng:repeat:start',
        'x:ng:repeat:start'];

      for (let variant of variants) {
        let element = {attribs: {}};
        element.attribs[variant] = 'value';
        let value = Attributes.getRepeaterAttribute(element, 'ng-repeat-start');

        expect(value).to.equal('value');
        expect(Attributes.hasRepeaterAttribute(element, 'ng-repeat-start')).to.be.true;
      }
    });

    it('should handle missing repeater', function () {
      let element = {attribs: {}};
      let value = Attributes.getRepeaterAttribute(element, 'ng-repeat');

      expect(value).to.equal('');
      expect(Attributes.hasRepeaterAttribute(element, 'ng-repeat')).to.be.false;
    });
  });

  it('should handle event bindings', function () {
    let element = {attribs: {'(click)': 'save()'}};
    expect(Attributes.hasAngular2EventBindingAttribute(element, 'click')).to.be.true;
    expect(Attributes.getAngular2EventBindingAttribute(element, 'click')).to.equal('save()');

    element = {attribs: {'on-click': 'save()'}};
    expect(Attributes.hasAngular2EventBindingAttribute(element, 'click')).to.be.true;
    expect(Attributes.getAngular2EventBindingAttribute(element, 'click')).to.equal('save()');
  });

  it('should extract attribute value', function () {
    const variants = ['ng-model',
      'data-ng-model',
      'data_ng-model',
      'data:ng-model',
      'x-ng-model',
      'x_ng-model',
      'x:ng-model',
      'ng_model',
      'data-ng_model',
      'data_ng_model',
      'data:ng_model',
      'x-ng_model',
      'x_ng-model',
      'x:ng-model',
      'ng:model',
      'data-ng:model',
      'data_ng:model',
      'data:ng:model',
      'x-ng:model',
      'x_ng:model',
      'x:ng:model'];

    for (let variant of variants) {
      let element = {attribs: {}};
      element.attribs[variant] = 'value';
      let value = Attributes.extractAttributeValue(element, HtmlAttribute.NG_MODEL);
      expect(value).to.equal('value');

      element.attribs[variant] = 'has {{expression}}';
      value = Attributes.extractAttributeValue(element, HtmlAttribute.NG_MODEL);
      expect(value).to.be.null;
    }
  });

  it('should extract attribute value allowing index expression', function () {
    const variants = ['ng-repeat',
      'data-ng-repeat',
      'data_ng-repeat',
      'data:ng-repeat',
      'x-ng-repeat',
      'x_ng-repeat',
      'x:ng-repeat',
      'ng_repeat',
      'data-ng_repeat',
      'data_ng_repeat',
      'data:ng_repeat',
      'x-ng_repeat',
      'x_ng-repeat',
      'x:ng-repeat',
      'ng:repeat',
      'data-ng:repeat',
      'data_ng:repeat',
      'data:ng:repeat',
      'x-ng:repeat',
      'x_ng:repeat',
      'x:ng:repeat'];

    for (let variant of variants) {
      let element = {attribs: {}};
      element.attribs[variant] = 'value';
      let value = Attributes.extractAttributeValueAllowingIndexExpression(element, HtmlAttribute.NG_REPEAT);
      expect(value).to.equal('value');

      element.attribs[variant] = 'value{{$index}}';
      value = Attributes.extractAttributeValueAllowingIndexExpression(element, HtmlAttribute.NG_REPEAT);
      expect(value).to.equal('value{{$index}}');

      element.attribs[variant] = 'value{{test}}';
      value = Attributes.extractAttributeValueAllowingIndexExpression(element, HtmlAttribute.NG_REPEAT);
      expect(value).to.be.null;
    }
  });

});