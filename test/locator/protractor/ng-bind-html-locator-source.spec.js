'use strict';

const expect = require('chai').expect;
const NgBindHtmlLocatorSource = require('../../../lib/locator/protractor/ng-bind-html-locator-source');
const locator = require('../locator-source-spec-helper');

describe('NgBindHtmlLocatorSource', () => {
  let source = new NgBindHtmlLocatorSource();

  it('should extract locator', () => {
    expect(locator('<button ng-bind-html="text">a</button>', source)).to.equal('by.exactBinding(\'text\')');
    expect(locator('<button data-ng-bind-html="text">a</button>', source)).to.equal('by.exactBinding(\'text\')');
  });
});