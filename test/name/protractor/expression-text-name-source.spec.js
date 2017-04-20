'use strict';

const expect = require('chai').expect;
const extractName = require('../name-source-spec-helper');
const ExpressionTextNameSource = require('../../../lib/angular/name/expression-text-name-source');

describe('ExpressionTextNameSource', () => {
  let source = new ExpressionTextNameSource();

  it('should extract name', () => {
    expect(extractName('<p>{{text}}</p>', source)).to.equal('text');
    expect(extractName('<p>{{text}}{{second}}</p>', source)).to.equal('text');
    expect(extractName('<p><b>{{nested}}</b>{{text}}{{second}}</p>', source)).to.equal('text');
  });
});