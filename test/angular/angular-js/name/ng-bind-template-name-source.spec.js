'use strict';

const expect = require('chai').expect;
const extractName = require('../../../name/name-source-spec-helper');
const NgBindTemplateNameSource = require('../../../../lib/angular/angular-js/name/ng-bind-template-name-source');

describe('NgBindTemplateNameSource', () => {
  let source = new NgBindTemplateNameSource();

  it('should extract name', () => {
    expect(extractName('<p ng-bind-template="{{text}}"></p>', source)).to.equal('text');
    expect(extractName('<p data-ng-bind-template="{{text}}{{second}}"></p>', source)).to.equal('text');
    expect(extractName('<p x-ng-bind-template="{{text}}"></p>', source)).to.equal('text');
  });
});