"use strict";

const AbstractNameSource = require('../abstract-name-source');
const extractNameFromNgFor = require('../../expressions').extractNameFromNgFor;
const getAttribute = require('../../dom-helpers').getAttribute;
const _ = require('lodash');

class NgForNameSource extends AbstractNameSource {

  extractName(element) {
    let ngFor = getAttribute(element, "*ngFor");
    return _.isEmpty(ngFor) ? null : extractNameFromNgFor(ngFor);
  }

}

module.exports = NgForNameSource;