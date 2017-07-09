'use strict';

const expect = require('chai').expect;
const extractName = require('./name-source-spec-helper');
const TextNameSource = require('../../lib/name/text-name-source');

describe('TextNameSource', () => {
  let source = new TextNameSource();

  it('should extract name', () => {
    expect(extractName('<p>text</p>', source)).to.equal('text');
    expect(extractName('<p>text<br>multi<br /> line</p>', source)).to.equal('text multi line');
  });
});