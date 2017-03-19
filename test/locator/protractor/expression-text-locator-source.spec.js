'use strict';

const expect = require('chai').expect;
const ExpressionTextLocatorSource = require('../../../lib/locator/protractor/expression-text-locator-source');
const locator = require('../locator-source-spec-helper');

describe('ExpressionTextLocatorSource', () => {
  let source = new ExpressionTextLocatorSource();

  it('should extract locator', () => {
    expect(locator('<button>{{text}}text{{exp2}}</button>', source)).to.equal('by.exactBinding(\'text\')');
  });
});