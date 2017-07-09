'use strict';

const expect = require('chai').expect;
const extractName = require('./name-source-spec-helper');
const ValueNameSource = require('../../lib/name/value-name-source');

describe('ValueNameSource', () => {
  let source = new ValueNameSource();

  it('should extract name', () => {
    expect(extractName('<p value="text"></p>', source)).to.equal('text');
  });
});