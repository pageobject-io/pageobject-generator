'use strict';

const expect = require('chai').expect;
const extractName = require('../name-source-spec-helper');
const NgBindHtmlNameSource = require('../../../lib/angular/angular-js/name/ng-bind-html-name-source');

describe('NgBindHtmlNameSource', () => {
  let source = new NgBindHtmlNameSource();

  it('should extract name', () => {
    expect(extractName('<p ng-bind-html="text"></p>', source)).to.equal('text');
    expect(extractName('<p data-ng-bind-html="text"></p>', source)).to.equal('text');
    expect(extractName('<p x-ng-bind-html="text"></p>', source)).to.equal('text');
  });
});