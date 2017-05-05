"use strict";

const _ = require('lodash');
const angularConfig = require('./angular/angular/angular-config');
const angularJsConfig = require('./angular/angular-js/angularjs-config');
const ProtractorLocatorGenerator = require('./protractor/protractor-locator-generator');
const ProtractorEs5Emitter = require('./protractor/protractor-es5-emitter');

const defaultOptions = {
  testFramework: 'protractor', appFramework: 'angularjs', pageObject: {
    keepElementAndMethodsTogether: false,
    order: ['elements', 'actions', 'assertions'],
    elementsOrder: 'alphabetical',
    actionsOrder: 'alphabetical',
    assertionsOrder: 'alphabetical',
    indentStyle: 'space',
    indentSize: 3,
    endOfLine: 'lf',
    keepMaximumBlankLines: 1
  }
};

class ConfigurationFactory {

  static create(options) {
    let configuration = _.merge({}, defaultOptions, options);

    configuration.pageObject.newLineCharacter = configuration.pageObject.endOfLine === 'lr' ? '\n' : '\r\n';

    let frameworkConfig = null;

    switch (configuration.testFramework) {
    case 'protractor':
      switch (configuration.appFramework) {
      case 'angularjs':
        frameworkConfig = angularJsConfig;
        break;
      case 'angular':
        frameworkConfig = angularConfig;
        break;
      default:
        break;
      }

      configuration.locatorGenerator = new ProtractorLocatorGenerator(frameworkConfig.locatorStrategies);
      configuration.emitter = new ProtractorEs5Emitter(configuration);

      break;
    default:
      break;
    }

    configuration.nameSources = frameworkConfig.nameSources;
    configuration.elementProcessors = frameworkConfig.elementProcessors;

    return configuration;
  }

}

module.exports = ConfigurationFactory;