'use strict';

const expect = require('chai').expect;
const parse5 = require('parse5');
const ButtonPostfixNamePostProcessor = require('../../lib/name/button-postfix-name-post-processor');

describe('ButtonPostfixNamePostProcessor', () => {
  let processor = new ButtonPostfixNamePostProcessor();

  it('should match on buttons', () => {
    expect(matches('<button id="name1"></button>')).to.be.true;
    expect(matches('<input type="button" />')).to.be.true;
  });

  it('should process buttons', () => {
    expect(process('<button id="name1"></button>', 'name1')).to.equal('name1Button');
    expect(process('<button id="name1"></button>', 'name1Button')).to.equal('name1Button');
    expect(process('<button id="name1"></button>', '')).to.equal('');
  });

  function matches(fragment) {
    let documentFragment = parse5.parseFragment(fragment, {treeAdapter: parse5.treeAdapters.htmlparser2});
    let element = documentFragment.childNodes[0];
    return processor.isMatchingElement(element);
  }

  function process(fragment, name) {
    let documentFragment = parse5.parseFragment(fragment, {treeAdapter: parse5.treeAdapters.htmlparser2});
    let element = documentFragment.childNodes[0];
    return processor.process(name, element);
  }
});