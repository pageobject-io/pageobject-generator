'use strict';

const expect = require('chai').expect;
const NgModelLocatorSource = require('../../../lib/locator/protractor/ng-model-locator-source');
const locator = require('../locator-source-spec-helper');

describe('NgModelLocatorSource', () => {
  let source = new NgModelLocatorSource();

  it('should extract locator', () => {
    expect(locator('<input ng-model="a"/>', source)).to.equal('by.model(\'a\')');
    expect(locator('<input x-ng-model="a{{$index}}"/>', source)).to.equal('by.model(\'a{{$index}}\')');
  });
});