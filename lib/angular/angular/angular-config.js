"use strict";

const NgForNameSource = require('./name/ng-for-name-source');
const NameNameSource = require('./../../name/name-name-source');
const IdNameSource = require('./../../name/id-name-source');
const ValueNameSource = require('./../../name/value-name-source');
const TitleNameSource = require('./../../name/title-name-source');
const TextNameSource = require('./../../name/text-name-source');
const ExpressionTextNameSource = require('./../name/expression-text-name-source');
const ButtonProcessor = require('../../processor/button-processor');
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

  elementProcessors: [new ButtonProcessor()],

  locatorStrategies: [new IdLocatorStrategy(),
                      new NameLocatorStrategy(),
                      new ButtonTextLocatorStrategy(),
                      new LinkTextLocatorStrategy(),
                      new CssLocatorStrategy()]
};