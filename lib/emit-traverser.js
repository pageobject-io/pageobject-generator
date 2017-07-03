"use strict";

const _ = require('lodash');

class EmitTraverser {

  constructor(page, config, parseResult) {
    this._page = page;
    this._parseResult = parseResult;
    this._element = null;
    this._section = null;
    this._config = config;
    this._emitter = config.emitter;
    this._source = '';
    this._elementsBuffer = [];
    this._actionsBuffer = [];
    this._assertionsBuffer = [];
    this._indent = 0;
    this._navigatorEmitted = false;
  }

  emitPageObject() {
    this._source += callEmitterMethod.call(this, 'Header');

    if (this._config.pageObject.keepElementAndMethodsTogether) {
      this._source += callEmitterMethod.call(this, 'Navigator');
      this._navigatorEmitted = true;
    }

    traverse.call(this, this._page);
    drainBuffers.call(this);

    this._source += callEmitterMethod.call(this, 'Footer');

    return normalizeNewLines(this._source, this._config);
  }

  newLine() {
    return this._config.pageObject.newLineCharacter;
  }

  indent() {
    return indent.call(this, this._indent);
  }

  singleIndent() {
    return indent.call(this, 1);
  }

  get element() {
    return this._element;
  }

  get section() {
    return this._section;
  }

  get page() {
    return this._page;
  }

  get parseResult() {
    return this._parseResult;
  }
}

function callEmitterMethod(name) {
  let result = '';

  let emitterMethod = this._emitter['emit' + name];
  if (_.isFunction(emitterMethod)) {
    // TODO: only call if it is enabled in the config: methodsToGenerate
    result = emitterMethod.call(this._emitter, this);

    if (!_.isNull(result)) {
      if (this._emitter['unindentOn' + name]) {
        this._indent--;
      }

      let lines = result.split(this._config.pageObject.newLineCharacter);
      lines = _.map(lines, (line) => this.indent() + line);

      result = lines.join(this._config.pageObject.newLineCharacter);
      let separatorFlag = this._emitter['skip' + name + 'Separator'];
      if (_.isNil(separatorFlag) || !separatorFlag) {
        result += this._emitter.separator;
      }

      if (this._emitter['indentOn' + name]) {
        this._indent++;
      }
    }
  }

  return _.toString(result);
}

function traverse(section) {
  for (let element of section.elements) {
    this._element = element;

    if (!_.isEmpty(element.name) && !_.isNil(element.locator)) {
      emitArray.call(this, ['element'], '', 'Elements', this._elementsBuffer);
      emitArray.call(this, element.actions, 'Action', 'Actions', this._actionsBuffer);
      emitArray.call(this, element.assertions, 'Assertion', 'Assertions', this._assertionsBuffer);
    }

    if (this._config.pageObject.keepElementAndMethodsTogether) {
      drainBuffers.call(this);
    }
  }

  if (this._emitter.emitPerSection) {
    drainBuffers.call(this);
  }

  traverseSections.call(this, section);
}

function emitArray(array, type, name, buffer) {
  if (this._emitter['indentOn' + name + 'Start']) {
    this._indent++;
  }

  for (let item of array) {
    let source = callEmitterMethod.call(this, _.upperFirst(item) + type);
    if (!_.isEmpty(source)) {
      buffer.push(source);
    }
  }

  if (this._emitter['unindentOn' + name + 'End']) {
    this._indent--;
  }
}

function traverseSections(section) {
  let hasSections = false;

  for (let element of section.elements) {
    if (_.isArray(element.elements)) {

      if (!hasSections) {
        hasSections = true;
        this._source += callEmitterMethod.call(this, 'SectionsStart');
      }

      this._section = element;
      this._source += callEmitterMethod.call(this, 'SectionStart');
      traverse.call(this, element);
      this._source += callEmitterMethod.call(this, 'SectionEnd');
    }
  }

  if (hasSections) {
    this._source += callEmitterMethod.call(this, 'SectionsEnd');
  }
}

function drainBuffers() {
  for (let type of this._config.pageObject.order) {
    if (type === 'navigator') {
      if (!this._config.pageObject.keepElementAndMethodsTogether && !this._navigatorEmitted) {
        this._source += callEmitterMethod.call(this, 'Navigator');
        this._navigatorEmitted = true;
      }
      continue;
    }

    let bufferName = '_' + type + 'Buffer';
    let buffer = this[bufferName];
    let order = this._config.pageObject[type + 'Order'];

    if (order === 'alphabetical') {
      buffer = _.sortBy(buffer, item => item.trim());
    }

    if (buffer.length > 0) {
      this._source += callEmitterMethod.call(this, _.upperFirst(type) + 'Start');

      this._source += buffer.join('');
      this[bufferName] = [];

      this._source += callEmitterMethod.call(this, _.upperFirst(type) + 'End');
    }
  }
}

function indent(times) {
  let tabCharacter = '\t';
  let indentSize = 1;

  if (this._config.pageObject.indentStyle === 'space') {
    tabCharacter = ' ';
    indentSize = this._config.pageObject.indentSize;
  }

  return tabCharacter.repeat(indentSize * times);
}

function normalizeNewLines(source, config) {
  let lines = source.split(config.pageObject.newLineCharacter);
  let normalized = [];
  let numberOfNewLines = 0;

  for (let i = 0; i < lines.length; i++) {
    if (_.isEmpty(lines[i].trim())) {
      if (numberOfNewLines < config.pageObject.keepMaximumBlankLines) {
        normalized.push(lines[i].trim());
      }
      numberOfNewLines++;
    } else {
      numberOfNewLines = 0;
      normalized.push(lines[i]);
    }
  }

  return normalized.join(config.pageObject.newLineCharacter);
}

module.exports = EmitTraverser;