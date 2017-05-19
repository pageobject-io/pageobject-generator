"use strict";

const _ = require('lodash');
const TypescriptParser = require('./typescript-parser');
const HtmlParser = require('./html-parser');

class ParserFactory {

  constructor(path) {
    this._source = path;
  }

  createParser() {
    if (_.endsWith(this._source, '.html')) {
      return new HtmlParser(this._source, true);
    } else if (_.endsWith(this._source, '.ts') && !_.endsWith(this._source, '.d.ts')) {
      return new TypescriptParser(this._source);
    } else {
      return new HtmlParser(this._source, false);
    }
  }

}

module.exports = ParserFactory;