"use strict";

const _ = require('lodash');
const parse5 = require('parse5');
const GeneratorContext = require('./generator-context');
const ConfigurationFactory = require('./configuration-factory');
const NameExtractor = require('./name/name-extractor');
const EmitTraverser = require('./emit-traverser');

class Generator {

  generate(source, options = {}) {
    let config = ConfigurationFactory.create(options);

    let documentFragment = parse5.parseFragment(source, {treeAdapter: parse5.treeAdapters.htmlparser2});

    let context = new GeneratorContext(documentFragment, source);

    traverseDomElement(context, config);

    let nameExtractor = new NameExtractor(config.nameSources);

    traversePageElement(context.page, nameExtractor, config.locatorGenerator);

    let emitTraverser = new EmitTraverser(context.page, config);

    return emitTraverser.emitPageObject();
  }

}

function traverseDomElement(context, config) {
  let element = context.domElement;

  for (let processor of config.elementProcessors) {
    if (processor.matches(element)) {
      processor.process(context);
    }
  }

  if (context.traversePageTreeDownBeforeChildren) {
    context.traversePageTreeDown();
  }

  let traversePageTreeUpAfterChildren = context.traversePageTreeUpAfterChildren;

  if (element.childNodes) {
    for (let child of element.childNodes) {
      context.domElement = child;
      traverseDomElement(context, config);
    }
  }

  if (traversePageTreeUpAfterChildren) {
    context.traversePageTreeUp()
  }

  context.domElement = element;
}

function traversePageElement(pageElement, nameExtractor, locatorGenerator) {
  if (!_.isNil(pageElement.parent)) {
    if (_.isEmpty(pageElement.name)) {
      pageElement.name = nameExtractor.extractName(pageElement);
    }

    pageElement.locator = locatorGenerator.generate(pageElement);
  }

  if (!_.isNil(pageElement.elements)) {
    for (let childPageElement of pageElement.elements) {
      traversePageElement(childPageElement, nameExtractor, locatorGenerator);
    }
  }
}

module.exports = Generator;