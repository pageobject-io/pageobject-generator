'use strict';

const expect = require('chai').expect;
const NgBindTemplateLocatorStrategy = require('../../../lib/protractor/locator/ng-bind-template-locator-strategy');
const locator = require('../../locator/locator-strategy-spec-helper');

describe('NgBindTemplateLocatorStrategy', () => {
  let source = new NgBindTemplateLocatorStrategy();

  it('should extract locator', () => {
    expect(locator('<button ng-bind-template="{{text}}a">a</button>', source)).to.equal('by.exactBinding(\'text\')');
    expect(locator('<button data-ng-bind-template="{{text}}a">a</button>', source)).to.equal('by.exactBinding(\'text\')');
  });
});