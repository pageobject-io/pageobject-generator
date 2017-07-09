'use strict';

const expect = require('chai').expect;
const parse5 = require('parse5');
const LinkPostfixNamePostProcessor = require('../../lib/name/link-postfix-name-post-processor');

describe('LinkPostfixNamePostProcessor', () => {
  let processor = new LinkPostfixNamePostProcessor();

  it('should match on links', () => {
    expect(matches('<a id="name1"></a>')).to.be.true;
  });

  it('should process buttons', () => {
    expect(process('<a id="name1"></a>', 'name1')).to.equal('name1Link');
    expect(process('<a id="name1"></a>', 'name1Button')).to.equal('name1Button');
    expect(process('<a id="name1"></a>', 'name1Link')).to.equal('name1Link');
    expect(process('<a id="name1"></a>', '')).to.equal('');
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