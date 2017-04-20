"use strict";

const parse5 = require('parse5');
const GeneratorContext = require('./generator-context');
const ConfigurationFactory = require('./configuration-factory');

class Generator {

  generate(source, options) {
    let config = ConfigurationFactory.create(options);

    let documentFragment = parse5.parseFragment(source, {treeAdapter: parse5.treeAdapters.htmlparser2});

    let context = new GeneratorContext(documentFragment, source, config);

    traverse(context);
  }

}

function traverse(context) {
  let element = context.element;

  for (let processor of context.elementProcessors) {
    if (processor.matches(element)) {
      processor.process(context);
    }
  }

  for (let child of element.childNodes) {
    context.element = child;
    traverse(context);
  }

  context.element = element;
}

module.exports = Generator;