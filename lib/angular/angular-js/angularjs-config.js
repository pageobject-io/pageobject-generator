"use strict";

const NgRepeatNameSource = require('./name/ng-repeat-name-source');
const NameNameSource = require('./../../name/name-name-source');
const IdNameSource = require('./../../name/id-name-source');
const ValueNameSource = require('./../../name/value-name-source');
const TitleNameSource = require('./../../name/title-name-source');
const TextNameSource = require('./../../name/text-name-source');
const NgModelNameSource = require('./name/ng-model-name-source');
const NgBindNameSource = require('./name/ng-bind-name-source');
const NgBindHtmlNameSource = require('./name/ng-bind-html-name-source');
const NgBindTemplateNameSource = require('./name/ng-bind-template-name-source');
const ExpressionTextNameSource = require('./../name/expression-text-name-source');
const ButtonProcessor = require('../../processor/button-processor');
const ButtonTextLocatorStrategy = require('../../protractor/locator/button-text-locator-strategy');
const CssLocatorStrategy = require('../../protractor/locator/css-locator-strategy');
const ExpressionTextLocatorStrategy = require('../../protractor/locator/expression-text-locator-strategy');
const IdLocatorStrategy = require('../../protractor/locator/id-locator-strategy');
const LinkTextLocatorStrategy = require('../../protractor/locator/link-text-locator-strategy');
const NameLocatorStrategy = require('../../protractor/locator/name-locator-strategy');
const NgBindHtmlLocatorStrategy = require('../../protractor/locator/ng-bind-html-locator-strategy');
const NgBindLocatorStrategy = require('../../protractor/locator/ng-bind-locator-strategy');
const NgBindTemplateLocatorStrategy = require('../../protractor/locator/ng-bind-template-locator-strategy');
const NgModelLocatorStrategy = require('../../protractor/locator/ng-model-locator-strategy');
const NgOptionsLocatorStrategy = require('../../protractor/locator/ng-options-locator-strategy');
const NgRepeatLocatorStrategy = require('../../protractor/locator/ng-repeat-locator-strategy');

module.exports = {
  nameSources: [new NgRepeatNameSource(),
                new NameNameSource(),
                new NgModelNameSource(),
                new IdNameSource(),
                new NgBindNameSource(),
                new NgBindHtmlNameSource,
                new NgBindTemplateNameSource(),
                new ExpressionTextNameSource(),
                new ValueNameSource(),
                new TitleNameSource(),
                new TextNameSource()],

  elementProcessors: [new ButtonProcessor()],

  locatorStrategies: [new NgRepeatLocatorStrategy(),
                      new NgOptionsLocatorStrategy(),
                      new IdLocatorStrategy(),
                      new NameLocatorStrategy(),
                      new NgModelLocatorStrategy(),
                      new NgBindLocatorStrategy(),
                      new NgBindHtmlLocatorStrategy(),
                      new NgBindTemplateLocatorStrategy(),
                      new ExpressionTextLocatorStrategy(),
                      new ButtonTextLocatorStrategy(),
                      new LinkTextLocatorStrategy(),
                      new CssLocatorStrategy()]
}