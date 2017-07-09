'use strict';

const expect = require('chai').expect;
const NgBindLocatorStrategy = require('../../../lib/protractor/locator/ng-bind-locator-strategy');
const locator = require('../../locator/locator-strategy-spec-helper');

describe('NgBindLocatorStrategy', () => {
  let source = new NgBindLocatorStrategy();

  it('should extract locator', () => {
    expect(locator('<button ng-bind="text">a</button>', source)).to.equal('by.exactBinding(\'text\')');
    expect(locator('<button data-ng-bind="text">a</button>', source)).to.equal('by.exactBinding(\'text\')');
  });
});