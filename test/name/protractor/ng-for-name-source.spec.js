'use strict';

const expect = require('chai').expect;
const extractName = require('../name-source-spec-helper');
const NgForNameSource = require('../../../lib/name/protractor/ng-for-name-source');

describe('NgForNameSource', () => {
  let source = new NgForNameSource();

  it('should extract name', () => {
    expect(extractName('<p></p>', source)).to.be.null;
    expect(extractName('<p *ngFor="let item of items"></p>', source)).to.equal('items');
    expect(extractName('<p *ngFor="let item of items; let i = index; let odd = odd"></p>', source)).to.equal('items');
  });
});