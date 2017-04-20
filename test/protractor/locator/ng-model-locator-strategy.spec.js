'use strict';

const expect = require('chai').expect;
const NgModelLocatorStrategy = require('../../../lib/protractor/locator/ng-model-locator-strategy');
const locator = require('../../locator/locator-strategy-spec-helper');

describe('NgModelLocatorStrategy', () => {
  let source = new NgModelLocatorStrategy();

  it('should extract locator', () => {
    expect(locator('<input ng-model="a"/>', source)).to.equal('by.model(\'a\')');
    expect(locator('<input x-ng-model="a{{$index}}"/>', source)).to.equal('by.model(\'a{{$index}}\')');
  });
});