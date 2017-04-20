'use strict';

const expect = require('chai').expect;
const ExpressionTextLocatorStrategy = require('../../../lib/protractor/locator/expression-text-locator-strategy');
const locator = require('../../locator/locator-strategy-spec-helper');

describe('ExpressionTextLocatorStrategy', () => {
  let source = new ExpressionTextLocatorStrategy();

  it('should extract locator', () => {
    expect(locator('<button>{{text}}text{{exp2}}</button>', source)).to.equal('by.exactBinding(\'text\')');
  });
});