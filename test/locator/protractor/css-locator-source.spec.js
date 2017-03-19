'use strict';

const expect = require('chai').expect;
const CssLocatorSource = require('../../../lib/locator/protractor/css-locator-source');
const locator = require('../locator-source-spec-helper');

describe('CssLocatorSource', () => {
  let source = new CssLocatorSource();

  it('should extract locator', () => {
    expect(locator('<button class="a">text</button>', source)).to.equal('by.css(\'button.a\')');
  });
});