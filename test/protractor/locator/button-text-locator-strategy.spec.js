'use strict';

const expect = require('chai').expect;
const ButtonTextLocatorStrategy = require('../../../lib/protractor/locator/button-text-locator-strategy');
const locator = require('../../locator/locator-strategy-spec-helper');

describe('ButtonTextLocatorStrategy', () => {
  let source = new ButtonTextLocatorStrategy();

  it('should extract locator', () => {
    expect(locator('<button>text</button>', source)).to.equal('by.buttonText(\'text\')');
    expect(locator('<button value="text"></button>', source)).to.equal('by.buttonText(\'text\')');
    expect(locator('<button>text {{exp}}</button>', source)).to.be.null;
  });
});