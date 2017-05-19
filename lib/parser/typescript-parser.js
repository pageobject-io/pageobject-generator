"use strict";

const _ = require('lodash');
const HtmlParser = require('./html-parser');
const fs = require('fs');

class TypescriptParser extends HtmlParser {

  constructor(source) {
    super(source, false)
  }

  parse() {
    let file = fs.readFileSync(this._source, 'utf8');
    let componentName = getComponentName(file);
    if (componentName == null) {
      throw new Error('Cannot find component name in typescript source: ' + this._source + '. Is it really a typescript file?')
    }

    getComponentAnnotationMeta(file);
  }

}

function getComponentName(file) {
  let componentClassRegex = /\s*export\s+class\s+(\w+)\s+((extends\s+\w+)|(implements\s+\w+( ,\w+)*))?\s*\{/g;
  let matches = componentClassRegex.exec(file);
  return matches.length > 1 && matches[1] && matches[1].length > 0 ? matches[1] : null;
}

function getComponentAnnotationMeta(file) {
  let componentMetaRegex = /\s*@Component\s*\((\{[\s\S]*})\)/g;
  let matches = componentMetaRegex.exec(file);
  let componentMetaString = matches.length > 1 && matches[1] && matches[1].length > 0 ? matches[1] : '';
  componentMetaString = componentMetaString.replace(new RegExp('`', 'g'), '"').replace(/\s/g, ' ');
  return componentMetaString;
}

module.exports = TypescriptParser;