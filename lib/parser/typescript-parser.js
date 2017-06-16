"use strict";

const HtmlParser = require('./html-parser');
const fs = require('fs');
const ComponentDetailsExtractor = require('../angular/component/component-details-extractor');

class TypescriptParser extends HtmlParser {

  constructor(source) {
    super(source, false)
  }

  parse() {
    let file = fs.readFileSync(this._source, 'utf8');
    let extractor = new ComponentDetailsExtractor(file, this._source);
    let componentName = extractor.getComponentName();
    this._source = extractor.findComponentTemplate();
    let result = super.parse();
    result.componentName = componentName;
    return result;
  }

}

module.exports = TypescriptParser;