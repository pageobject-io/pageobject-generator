"use strict";

const NgForNameSource = require('./name/ng-for-name-source');
const NameNameSource = require('./../../name/name-name-source');
const IdNameSource = require('./../../name/id-name-source');
const ValueNameSource = require('./../../name/value-name-source');
const TitleNameSource = require('./../../name/title-name-source');
const TextNameSource = require('./../../name/text-name-source');
const ExpressionTextNameSource = require('./../name/expression-text-name-source');
const ButtonProcessor = require('../../processor/button-processor');
const CheckboxProcessor = require('../../processor/checkbox-processor');
const DateFieldProcessor = require('../../processor/date-field-processor');
const LinkProcessor = require('../../processor/link-processor');
const RadioButtonProcessor = require('../../processor/radio-button-processor');
const SelectProcessor = require('../../processor/select-processor');
const TextAreaProcessor = require('../../processor/text-area-processor');
const TextFieldProcessor = require('../../processor/text-field-processor');
const NgForProcessor = require('../../angular/angular/processor/ng-for-processor');
const AngularBindingProcessor = require('../../angular/angular/processor/angular-binding-processor');
const ClickProcessor = require('../../angular/angular/processor/click-processor');
const ButtonTextLocatorStrategy = require('../../protractor/locator/button-text-locator-strategy');
const CssLocatorStrategy = require('../../protractor/locator/css-locator-strategy');
const IdLocatorStrategy = require('../../protractor/locator/id-locator-strategy');
const LinkTextLocatorStrategy = require('../../protractor/locator/link-text-locator-strategy');
const NameLocatorStrategy = require('../../protractor/locator/name-locator-strategy');

module.exports = {
  nameSources: [new NgForNameSource(),
                new NameNameSource(),
                new IdNameSource(),
                new ExpressionTextNameSource(),
                new ValueNameSource(),
                new TitleNameSource(),
                new TextNameSource()],

  elementProcessors: [new NgForProcessor(),
                      new ButtonProcessor(),
                      new CheckboxProcessor(),
                      new DateFieldProcessor(),
                      new LinkProcessor(),
                      new RadioButtonProcessor(),
                      new SelectProcessor(),
                      new TextAreaProcessor(),
                      new TextFieldProcessor(),
                      new ClickProcessor(),
                      new AngularBindingProcessor()],

  locatorStrategies: [new IdLocatorStrategy(),
                      new NameLocatorStrategy(),
                      new ButtonTextLocatorStrategy(),
                      new LinkTextLocatorStrategy(),
                      new CssLocatorStrategy()]
};