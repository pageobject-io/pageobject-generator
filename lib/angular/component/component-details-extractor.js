"use strict";

const fs = require('fs');
const path = require('path');

const COMPONENT_CLASS_REGEX = /\s*export\s+class\s+(\w+)\s*(.*)?\s*\{/;
const COMPONENT_META_REGEX = /\s*@Component\s*\((\{[\s\S]*})\)/;
const TEMPLATE_META_REGEX = /template:\s(`|"|')(.*)(`|"|')/;
const TEMPLATE_URL_META_REGEX = /templateUrl:\s(`|"|')(.*\.html)(`|"|')/;

class ComponentDetailsExtractor {

  constructor(file, path) {
    this._file = file;
    this._path = path;
  }

  getComponentName() {
    let matches = COMPONENT_CLASS_REGEX.exec(this._file);
    let componentName = getMatchFromGroup(matches, 1);
    if (componentName == null) {
      throw 'Cannot find component name in typescript source. Is it really a typescript file?';
    }
    return componentName;
  }

  findComponentTemplate() {
    let componentMetaString = getComponentDecoratorMetaAsString(this._file);
    return findComponentTemplate(componentMetaString, this._path);
  }

}

function getMatchFromGroup(matches, group) {
  return matches && matches.length > group && matches[group] && matches[group].length > 0 ? matches[group] : null;
}

function getComponentDecoratorMetaAsString(file) {
  let matches = COMPONENT_META_REGEX.exec(file);
  let componentMetaString = getMatchFromGroup(matches, 1);
  componentMetaString = componentMetaString === null ? null : componentMetaString.replace(/\s/g, ' ');
  if (!componentMetaString) {
    throw new Error('Cannot extract meta from component. Does this file contain @Component decorator?');
  }
  return componentMetaString;
}

function findComponentTemplate(meta, path) {
  let matches = TEMPLATE_META_REGEX.exec(meta);
  let containsTemplate = getMatchFromGroup(matches, 2);
  let htmlContent = null;
  if (containsTemplate != null) {
    htmlContent = matches[2];
  } else {
    htmlContent = loadContentFromTemplateUrl(meta, path);
  }

  if (htmlContent === null) {
    throw new Error('Cannot extract html template from component meta. Is it a valid Angular component?');
  }

  return htmlContent.replace(/\s\s+/g, ' ').trim();
}

function loadContentFromTemplateUrl(meta, typescriptFilePath) {
  let matches = TEMPLATE_URL_META_REGEX.exec(meta);
  let containsTemplateUrl = getMatchFromGroup(matches, 2);

  if (containsTemplateUrl !== null) {
    let dir = path.dirname(typescriptFilePath);
    let templatePath = path.resolve(dir, containsTemplateUrl);
    return fs.readFileSync(templatePath, 'utf8');
  }

  return null;
}

module.exports = ComponentDetailsExtractor;
