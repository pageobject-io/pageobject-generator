'use strict';

const expect = require('chai').expect;
const IdLocatorStrategy = require('../../../lib/protractor/locator/id-locator-strategy');
const locator = require('../../locator/locator-strategy-spec-helper');

describe('IdLocatorStrategy', () => {
  let source = new IdLocatorStrategy();

  it('should extract locator', () => {
    expect(locator('<button id="a">text</button>', source)).to.equal('by.id(\'a\')');
    expect(locator('<button id="a{{$index}}">text</button>', source)).to.equal('by.id(\'a{{$index}}\')');
  });
});