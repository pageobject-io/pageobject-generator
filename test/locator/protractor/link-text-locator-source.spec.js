'use strict';

const expect = require('chai').expect;
const LinkTextLocatorSource = require('../../../lib/locator/protractor/link-text-locator-source');
const locator = require('../locator-source-spec-helper');

describe('LinkTextLocatorSource', () => {
  let source = new LinkTextLocatorSource();

  it('should extract locator', () => {
    expect(locator('<a>text</a>', source)).to.equal('by.linkText(\'text\')');
  });
});