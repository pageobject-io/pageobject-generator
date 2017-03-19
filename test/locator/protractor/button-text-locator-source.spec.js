'use strict';

const expect = require('chai').expect;
const ButtonTextLocatorSource = require('../../../lib/locator/protractor/button-text-locator-source');
const locator = require('../locator-source-spec-helper');

describe('ButtonTextLocatorSource', () => {
  let source = new ButtonTextLocatorSource();

  it('should extract locator', () => {
    expect(locator('<button>text</button>', source)).to.equal('by.buttonText(\'text\')');
    expect(locator('<button value="text"></button>', source)).to.equal('by.buttonText(\'text\')');
    expect(locator('<button>text {{exp}}</button>', source)).to.be.null;
  });
});