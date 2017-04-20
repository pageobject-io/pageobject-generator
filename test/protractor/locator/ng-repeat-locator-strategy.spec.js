'use strict';

const expect = require('chai').expect;
const NgRepeatLocatorStrategy = require('../../../lib/protractor/locator/ng-repeat-locator-strategy');
const locator = require('../../locator/locator-strategy-spec-helper');

describe('NgRepeatLocatorStrategy', () => {
  let source = new NgRepeatLocatorStrategy();

  it('should extract locator', () => {
    expect(locator('<div ng-repeat="item in items"/>', source)).to.equal('by.exactRepeater(\'item in items\')');
    expect(locator('<div data-ng-repeat="item in items | filter : x | orderBy : order | limitTo : limit as results"/>',
                   source)).to.equal('by.exactRepeater(\'item in items\')');
  });
});