'use strict';

const expect = require('chai').expect;
const extractName = require('./name-source-spec-helper');
const TitleNameSource = require('../../lib/name/title-name-source');

describe('TitleNameSource', () => {
  let source = new TitleNameSource();

  it('should extract name', () => {
    expect(extractName('<p title="text"></p>', source)).to.equal('text');
  });
});