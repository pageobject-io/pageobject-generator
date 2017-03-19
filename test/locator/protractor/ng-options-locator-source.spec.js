'use strict';

const expect = require('chai').expect;
const NgOptionsLocatorSource = require('../../../lib/locator/protractor/ng-options-locator-source');
const locator = require('../locator-source-spec-helper');

describe('NgOptionsLocatorSource', () => {
  let source = new NgOptionsLocatorSource();

  it('should extract locator', () => {
    expect(locator('<input ng-options="a"/>', source)).to.equal('by.options(\'a\')');
    expect(locator('<input x-ng-options="a{{$index}}"/>', source)).to.equal('by.options(\'a{{$index}}\')');
  });
});