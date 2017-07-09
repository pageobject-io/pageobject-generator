'use strict';

const expect = require('chai').expect;
const NameLocatorStrategy = require('../../../lib/protractor/locator/name-locator-strategy');
const locator = require('../../locator/locator-strategy-spec-helper');

describe('NameLocatorStrategy', () => {
  let source = new NameLocatorStrategy();

  it('should extract locator', () => {
    expect(locator('<button name="a">text</button>', source)).to.equal('by.name(\'a\')');
  });
});