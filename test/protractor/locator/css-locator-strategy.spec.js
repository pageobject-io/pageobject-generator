'use strict';

const expect = require('chai').expect;
const CssLocatorStrategy = require('../../../lib/protractor/locator/css-locator-strategy');
const locator = require('../../locator/locator-strategy-spec-helper');

describe('CssLocatorStrategy', () => {
  let source = new CssLocatorStrategy();

  it('should extract locator', () => {
    expect(locator('<button class="a">text</button>', source)).to.equal('by.css(\'button.a\')');
  });
});