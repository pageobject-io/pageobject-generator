'use strict';

class HtmlAttribute {
  constructor(name, attributeName) {
    this._name = name;
    this._attributeName = attributeName;
  }

  get attributeName() {
    return this._attributeName;
  }
}

HtmlAttribute.ID = new HtmlAttribute('ID', 'id');
HtmlAttribute.NAME = new HtmlAttribute('NAME', 'name');
HtmlAttribute.NG_MODEL = new HtmlAttribute('NG_MODEL', 'ng-model');
HtmlAttribute.NG_OPTIONS = new HtmlAttribute('NG_OPTIONS', 'ng-options');
HtmlAttribute.VALUE = new HtmlAttribute('VALUE', 'value');
HtmlAttribute.TITLE = new HtmlAttribute('TITLE', 'title');
HtmlAttribute.NG_BIND = new HtmlAttribute('NG_BIND', 'ng-bind');
HtmlAttribute.NG_BIND_HTML = new HtmlAttribute('NG_BIND_HTML', 'ng-bind-html');
HtmlAttribute.NG_BIND_TEMPLATE = new HtmlAttribute('NG_BIND_TEMPLATE', 'ng-bind-template');
HtmlAttribute.NG_REPEAT = new HtmlAttribute('NG_REPEAT', 'ng-repeat');
HtmlAttribute.NG_REPEAT_START = new HtmlAttribute('NG_REPEAT_START', 'ng-repeat-start');

module.exports = HtmlAttribute;

