'use strict';

const expect = require('chai').expect;
const NgOptionsLocatorStrategy = require('../../../lib/protractor/locator/ng-options-locator-strategy');
const locator = require('../../locator/locator-strategy-spec-helper');

describe('NgOptionsLocatorStrategy', () => {
  let source = new NgOptionsLocatorStrategy();

  it('should extract locator', () => {
    expect(locator('<input ng-options="a"/>', source)).to.equal('by.options(\'a\')');
    expect(locator('<input x-ng-options="a{{$index}}"/>', source, 1)).to.equal('by.options(`a${rowIndex1}`)');
  });
});