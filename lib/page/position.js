"use strict";

class Position {

  constructor(startOffset, endOffset) {
    this._startOffset = startOffset;
    this._endOffset = endOffset;
  }

  get startOffset() {
    return this._startOffset;
  }

  get endOffset() {
    return this._endOffset;
  }

}

module.exports = Position;