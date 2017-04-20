"use strict";

const AbstractNameSource = require('../../../name/abstract-name-source');
const extractNameFromNgFor = require('../../../expressions').extractNameFromNgFor;
const getAttribute = require('../../../dom/attributes').getAttribute;
const _ = require('lodash');

class NgForNameSource extends AbstractNameSource {

  extractName(element) {
    let ngFor = getAttribute(element, "*ngFor");
    return _.isEmpty(ngFor) ? null : extractNameFromNgFor(ngFor);
  }

}

module.exports = NgForNameSource;