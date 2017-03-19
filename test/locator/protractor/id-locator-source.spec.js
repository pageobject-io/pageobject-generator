'use strict';

const expect = require('chai').expect;
const IdLocatorSource = require('../../../lib/locator/protractor/id-locator-source');
const locator = require('../locator-source-spec-helper');

describe('IdLocatorSource', () => {
  let source = new IdLocatorSource();

  it('should extract locator', () => {
    expect(locator('<button id="a">text</button>', source)).to.equal('by.id(\'a\')');
    expect(locator('<button id="a{{$index}}">text</button>', source)).to.equal('by.id(\'a{{$index}}\')');
  });
});