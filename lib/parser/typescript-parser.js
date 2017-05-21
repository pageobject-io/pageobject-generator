"use strict";

const _ = require('lodash');
const HtmlParser = require('./html-parser');
const fs = require('fs');
const path = require('path');

class TypescriptParser extends HtmlParser {

  constructor(source) {
    super(source, false)
  }

  parse() {
    let file = fs.readFileSync(this._source, 'utf8');
    let componentName = getComponentName.call(this, file);
    let componentMetaString = getComponentAnnotationMetaString.call(this, file);
    this._source = findComponentTemplate.call(this, componentMetaString);
    var result = super.parse();
    result.componentName = componentName;
    return result;
  }

}

function findComponentTemplate(meta) {
  let templateRegex = /template:\s(`|"|')(.*)(`|"|')/g;
  let matches = templateRegex.exec(meta);
  let containsTemplate = matches && matches.length > 2 && matches[2] && matches[2].length > 0;
  let htmlContent = null;
  if (containsTemplate) {
    htmlContent = matches[2];
  } else {
    let templateUrlRegex = /templateUrl:\s(`|"|')(.*\.html)(`|"|')/g;
    matches = templateUrlRegex.exec(meta);
    let containsTemplateUrl = matches && matches.length > 2 && matches[2] && matches[2].length > 0;
    if (containsTemplateUrl) {
      let dir = path.dirname(this._source);
      let templatePath = path.resolve(dir, matches[2]);
      htmlContent = fs.readFileSync(templatePath, 'utf8');
    }
  }

  if (htmlContent === null) {
    throw new Error('Cannot extract html template from component meta. Is it a valid Angular component?');
  }

  return htmlContent;
}

function getComponentName(file) {
  let componentClassRegex = /\s*export\s+class\s+(\w+)\s+((extends\s+\w+)|(implements\s+\w+( ,\w+)*))?\s*\{/g;
  let matches = componentClassRegex.exec(file);
  let componentName = matches && matches.length > 1 && matches[1] && matches[1].length > 0 ? matches[1] : null;
  if (componentName == null) {
    throw new Error('Cannot find component name in typescript source: ' + this._source + '. Is it really a typescript file?')
  }
  return componentName;
}

function getComponentAnnotationMetaString(file) {
  let componentMetaRegex = /\s*@Component\s*\((\{[\s\S]*})\)/g;
  let matches = componentMetaRegex.exec(file);
  let componentMetaString = matches && matches.length > 1 && matches[1] && matches[1].length > 0 ? matches[1] : null;
  componentMetaString = componentMetaString.replace(/\s/g, ' ');
  if (!componentMetaString) {
    throw new Error('Cannot extract meta from component. Does this file ('+ this._source +') contain @Component decorator?');
  }
  return componentMetaString;
}

module.exports = TypescriptParser;