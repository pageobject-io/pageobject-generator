'use strict';

const expect = require('chai').expect;
const NgBindHtmlLocatorStrategy = require('../../../lib/protractor/locator/ng-bind-html-locator-strategy');
const locator = require('../../locator/locator-strategy-spec-helper');

describe('NgBindHtmlLocatorStrategy', () => {
  let source = new NgBindHtmlLocatorStrategy();

  it('should extract locator', () => {
    expect(locator('<button ng-bind-html="text">a</button>', source)).to.equal('by.exactBinding(\'text\')');
    expect(locator('<button data-ng-bind-html="text">a</button>', source)).to.equal('by.exactBinding(\'text\')');
  });
});