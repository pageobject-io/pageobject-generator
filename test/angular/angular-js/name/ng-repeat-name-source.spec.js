'use strict';

const expect = require('chai').expect;
const extractName = require('../../../name/name-source-spec-helper');
const NgRepeatNameSource = require('../../../../lib/angular/angular-js/name/ng-repeat-name-source');

describe('NgRepeatNameSource', () => {
  let source = new NgRepeatNameSource();

  it('should extract name', () => {
    expect(extractName('<p></p>', source)).to.be.null;
    expect(extractName('<p ng-repeat="item in items"></p>', source)).to.equal('items');
    expect(extractName('<p data-ng-repeat="item in items | filter:x as results"></p>', source)).to.equal('items');
  });
});