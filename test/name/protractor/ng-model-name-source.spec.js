'use strict';

const expect = require('chai').expect;
const extractName = require('../name-source-spec-helper');
const NgModelNameSource = require('../../../lib/name/protractor/ng-model-name-source');

describe('NgModelNameSource', () => {
  let source = new NgModelNameSource();

  it('should extract name', () => {
    expect(extractName('<p ng-model="text"></p>', source)).to.equal('text');
    expect(extractName('<p data-ng-model="text"></p>', source)).to.equal('text');
    expect(extractName('<p x-ng-model="text"></p>', source)).to.equal('text');
  });
});