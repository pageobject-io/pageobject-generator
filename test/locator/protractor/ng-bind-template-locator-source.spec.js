'use strict';

const expect = require('chai').expect;
const NgBindTemplateLocatorSource = require('../../../lib/locator/protractor/ng-bind-template-locator-source');
const locator = require('../locator-source-spec-helper');

describe('NgBindTemplateLocatorSource', () => {
  let source = new NgBindTemplateLocatorSource();

  it('should extract locator', () => {
    expect(locator('<button ng-bind-template="{{text}}a">a</button>', source)).to.equal('by.exactBinding(\'text\')');
    expect(locator('<button data-ng-bind-template="{{text}}a">a</button>', source)).to.equal('by.exactBinding(\'text\')');
  });
});