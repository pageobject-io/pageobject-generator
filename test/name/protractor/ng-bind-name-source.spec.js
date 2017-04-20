'use strict';

const expect = require('chai').expect;
const extractName = require('../name-source-spec-helper');
const NgBindNameSource = require('../../../lib/angular/angular-js/name/ng-bind-name-source');

describe('NgBindNameSource', () => {
  let source = new NgBindNameSource();

  it('should extract name', () => {
    expect(extractName('<p ng-bind="text"></p>', source)).to.equal('text');
    expect(extractName('<p data-ng-bind="text"></p>', source)).to.equal('text');
    expect(extractName('<p x-ng-bind="text"></p>', source)).to.equal('text');
  });
});