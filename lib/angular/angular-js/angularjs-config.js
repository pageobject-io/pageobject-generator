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
const CheckboxProcessor = require('../../processor/checkbox-processor');
const ButtonProcessor = require('../../processor/button-processor');
const DateFieldProcessor = require('../../processor/date-field-processor');
const LinkProcessor = require('../../processor/link-processor');
const RadioButtonProcessor = require('../../processor/radio-button-processor');
const SelectProcessor = require('../../processor/select-processor');
const TextAreaProcessor = require('../../processor/text-area-processor');
const TextFieldProcessor = require('../../processor/text-field-processor');
const AngularJsBindingProcessor = require('../../angular/angular-js/processor/angularjs-binding-processor');
const NgClickProcessor = require('../../angular/angular-js/processor/ng-click-processor');
const NgControllerProcessor = require('../../angular/angular-js/processor/ng-controller-processor');
const NgRepeatEndProcessor = require('../../angular/angular-js/processor/ng-repeat-end-processor');
const NgRepeatProcessor = require('../../angular/angular-js/processor/ng-repeat-processor');
const NgRepeatStartProcessor = require('../../angular/angular-js/processor/ng-repeat-start-processor');

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

  elementProcessors: [new NgControllerProcessor(),
                      new NgRepeatProcessor(),
                      new NgRepeatStartProcessor(),
                      new NgRepeatEndProcessor(),
                      new ButtonProcessor(),
                      new CheckboxProcessor(),
                      new DateFieldProcessor(),
                      new LinkProcessor(),
                      new RadioButtonProcessor(),
                      new SelectProcessor(),
                      new TextAreaProcessor(),
                      new TextFieldProcessor(),
                      new AngularJsBindingProcessor(),
                      new NgClickProcessor()],

  locatorStrategies: [new NgRepeatLocatorStrategy(),
                      // new NgOptionsLocatorStrategy(),
                      new IdLocatorStrategy(),
                      new NgModelLocatorStrategy(),
                      new NameLocatorStrategy(),
                      new NgBindLocatorStrategy(),
                      new NgBindHtmlLocatorStrategy(),
                      new NgBindTemplateLocatorStrategy(),
                      new ExpressionTextLocatorStrategy(),
                      new ButtonTextLocatorStrategy(),
                      new LinkTextLocatorStrategy(),
                      new CssLocatorStrategy()]
};