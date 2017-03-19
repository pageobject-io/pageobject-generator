'use strict';

const expect = require('chai').expect;
const extractName = require('./name-source-spec-helper');
const NameNameSource = require('../../lib/name/name-name-source');

describe('NameNameSource', () => {
  let source = new NameNameSource();

  it('should extract name', () => {
    expect(extractName('<p name="text"></p>', source)).to.equal('text');
  });
});