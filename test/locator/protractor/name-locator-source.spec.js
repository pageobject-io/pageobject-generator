'use strict';

const expect = require('chai').expect;
const NameLocatorSource = require('../../../lib/locator/protractor/name-locator-source');
const locator = require('../locator-source-spec-helper');

describe('NameLocatorSource', () => {
  let source = new NameLocatorSource();

  it('should extract locator', () => {
    expect(locator('<button name="a">text</button>', source)).to.equal('by.name(\'a\')');
  });
});