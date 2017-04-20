'use strict';

const expect = require('chai').expect;
const LinkTextLocatorStrategy = require('../../../lib/protractor/locator/link-text-locator-strategy');
const locator = require('../../locator/locator-strategy-spec-helper');

describe('LinkTextLocatorStrategy', () => {
  let source = new LinkTextLocatorStrategy();

  it('should extract locator', () => {
    expect(locator('<a>text</a>', source)).to.equal('by.linkText(\'text\')');
    expect(locator('<a>{{text}}</a>', source)).to.be.null;
  });
});