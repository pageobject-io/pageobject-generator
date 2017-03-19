'use strict';

const expect = require('chai').expect;
const NgRepeatLocatorSource = require('../../../lib/locator/protractor/ng-repeat-locator-source');
const locator = require('../locator-source-spec-helper');

describe('NgRepeatLocatorSource', () => {
  let source = new NgRepeatLocatorSource();

  it('should extract locator', () => {
    expect(locator('<div ng-repeat="item in items"/>', source)).to.equal('by.exactRepeater(\'item in items\')');
    expect(locator('<div data-ng-repeat="item in items | filter : x | orderBy : order | limitTo : limit as results"/>',
                   source)).to.equal('by.exactRepeater(\'item in items\')');
  });
});