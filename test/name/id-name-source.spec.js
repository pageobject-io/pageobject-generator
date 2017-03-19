'use strict';

const expect = require('chai').expect;
const extractName = require('./name-source-spec-helper');
const IdNameSource = require('../../lib/name/id-name-source');

describe('IdNameSource', () => {
  let source = new IdNameSource();

  it('should extract name', () => {
    expect(extractName('<p id="text"></p>', source)).to.equal('text');
  });
});