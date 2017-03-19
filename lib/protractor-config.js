"use strict";

const angularJs = require('./application-types').angularJs;
const angular = require('./application-types').angular;
const NgRepeatNameSource = require('./name/protractor/ng-repeat-name-source');
const NgForNameSource = require('./name/protractor/ng-for-name-source');
const NameNameSource = require('./name/name-name-source');
const IdNameSource = require('./name/id-name-source');
const ValueNameSource = require('./name/value-name-source');
const TitleNameSource = require('./name/title-name-source');
const TextNameSource = require('./name/text-name-source');
const NgModelNameSource = require('./name/protractor/ng-model-name-source');
const NgBindNameSource = require('./name/protractor/ng-bind-name-source');
const NgBindHtmlNameSource = require('./name/protractor/ng-bind-html-name-source');
const NgBindTemplateNameSource = require('./name/protractor/ng-bind-template-name-source');
const ExpressionTextNameSource = require('./name/protractor/expression-text-name-source');

const angularJsSources = [new NgRepeatNameSource(),
                          new NameNameSource(),
                          new NgModelNameSource(),
                          new IdNameSource(),
                          new NgBindNameSource(),
                          new NgBindHtmlNameSource,
                          new NgBindTemplateNameSource(),
                          new ExpressionTextNameSource(),
                          new ValueNameSource(),
                          new TitleNameSource(),
                          new TextNameSource()];

const angularSources = [new NgForNameSource(),
                        new NameNameSource(),
                        new IdNameSource(),
                        new ExpressionTextNameSource(),
                        new ValueNameSource(),
                        new TitleNameSource(),
                        new TextNameSource()];

class ProtractorConfig {

  nameSources(applicationType) {
    if (applicationType === angularJs) {
      return angularJsSources;
    } else if (applicationType === angular) {
      return angularSources;
    } else {
      throw new Error('Unsupported application type: ' + applicationType);
    }
  }

}

module.exports = ProtractorConfig;