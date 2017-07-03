"use strict";

const _ = require('lodash');
const parse5 = require('parse5');
const fs = require('fs');
const ParseResult = require('./parse-result');

class HtmlParser {

  constructor(source, isPath) {
    this._source = source;
    this._isPath = isPath;
  }

  parse() {
    let source = this._isPath ? fs.readFileSync(this._source, 'utf8') : this._source;
    return new ParseResult(parse5.parse(source, {treeAdapter: parse5.treeAdapters.htmlparser2}), null);
  }

}

module.exports = HtmlParser;