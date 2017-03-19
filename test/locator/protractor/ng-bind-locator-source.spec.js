'use strict';

const expect = require('chai').expect;
const NgBindLocatorSource = require('../../../lib/locator/protractor/ng-bind-locator-source');
const locator = require('../locator-source-spec-helper');

describe('NgBindLocatorSource', () => {
  let source = new NgBindLocatorSource();

  it('should extract locator', () => {
    expect(locator('<button ng-bind="text">a</button>', source)).to.equal('by.exactBinding(\'text\')');
    expect(locator('<button data-ng-bind="text">a</button>', source)).to.equal('by.exactBinding(\'text\')');
  });
});