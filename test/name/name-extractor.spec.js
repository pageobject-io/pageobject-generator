'use strict';

const expect = require('chai').expect;
const parse5 = require('parse5');
const NameExtractor = require('../../lib/name/name-extractor');
const GeneratorContext = require('../../lib/generator-context');
const angularJs = require('../../lib/application-types').angularJs;
const ProtractorConfig = require('../../lib/protractor-config');

describe('NameExtractor', () => {

  let nameExtractor;

  beforeEach(() => {
    nameExtractor = new NameExtractor();
  });

  it('should leave valid name unchanged', () => {
    expect(getName('div', 'id', 'name')).to.equal('name');
  });

  it('should remove Angular bindings', () => {
    expect(getName('div', 'id', 'name{{i}}')).to.equal('name');
  });

  it('should remove array accessors', () => {
    expect(getName('div', 'id', 'name[i]')).to.equal('name');
  });

  it('should convert to camel case', () => {
    expect(getName('div', 'id', 'name-with-multiple-parts')).to.equal('nameWithMultipleParts');
    expect(getName('div', 'id', 'name1.with.multiple.parts')).to.equal('name1WithMultipleParts');
    expect(getName('div', 'id', 'name2:with:multiple:parts')).to.equal('name2WithMultipleParts');
    expect(getName('div', 'id', 'name3_with_multiple_parts')).to.equal('name3WithMultipleParts');
    expect(getName('div', 'id', 'name4_with-multiple:parts')).to.equal('name4WithMultipleParts');
  });

  it('should normalize complex name', () => {
    expect(getName('div', 'id', '\'name_with\'{{b}}-multiple{{i}}:parts[0] | piped')).to.equal('nameWithMultipleParts');
  });

  it('should remove accents', () => {
    expect(getName('div', 'id', 'árvíztűrőtükörfúrógép')).to.equal('arvizturotukorfurogep');
  });

  it('should respect attribute order', () => {
    expect(getName('div', 'id', 'ignored', 'name', 'name', 'ng-model', 'ignored')).to.equal('name');
    expect(getName('div', 'id', 'ignored', 'name', '{{i}}', 'ng-model', 'name1')).to.equal('name1');
    expect(getName('div', 'id', 'name2', 'name', '[0]', 'ng-model', '{{i}}')).to.equal('name2');
  });

  it('should check JavaScript validity', () => {
    expect(getName('div', 'id', 'this')).to.equal('div0');
    expect(getName('div', 'id', 'default')).to.equal('div1');
    expect(getName('div', 'id', 'this1')).to.equal('this1');
    expect(getName('div', 'id', 'do2')).to.equal('do2');
  });

  it('should handle postfixes', () => {
    expect(getName('a', 'id', 'name')).to.equal('nameLink');
    expect(getName('a', 'id', 'nameLink')).to.equal('nameLink');
    expect(getName('a', 'id', 'nameButton')).to.equal('nameButton');
    expect(getName('button', 'id', 'name1')).to.equal('name1Button');
    expect(getName('button', 'id', 'name1Button')).to.equal('name1Button');
  });

  it('should generate default names', () => {
    expect(getName('div', 'id', '{{i}}')).to.equal('div0');
    expect(getName('div', 'id', '{{i}}')).to.equal('div1');
    expect(getName('div', 'id', '{{i}}')).to.equal('div2');
  });

  it('should handle key-value repeaters', () => {
    expect(getName('div', 'ng-repeat', '(name, age) in {\'adam\':10, \'amalie\':12}')).to.equal('adam10Amalie12');
  });

  it('should not generate duplicate names', () => {
    expect(getName('div', 'id', 'name')).to.equal('name');
    expect(getName('div', 'id', 'name')).to.equal('div0');
  });

  it('should remove controller prefixes', () => {
    let context = new GeneratorContext(null, '', angularJs, new ProtractorConfig());

    context.pushController('myController');
    context.pushController('todoList');

    let documentFragment = parse5.parseFragment('<div></div>', {treeAdapter: parse5.treeAdapters.htmlparser2});

    let element = documentFragment.childNodes[0];
    context.element = element;

    element.attribs['title'] = 'todoList.name';
    expect(nameExtractor.extractName(context)).to.equal('name');

    element.attribs['title'] = 'myController.item';
    expect(nameExtractor.extractName(context)).to.equal('item');

    element.attribs['title'] = 'myControllerItem2';
    expect(nameExtractor.extractName(context)).to.equal('myControllerItem2');

    element.attribs['title'] = 'todoListName2';
    expect(nameExtractor.extractName(context)).to.equal('todoListName2');
  });

  function getName(tagName, ...attributes) {
    let documentFragment = parse5.parseFragment(`<${tagName}></${tagName}>`,
                                                {treeAdapter: parse5.treeAdapters.htmlparser2});

    let element = documentFragment.childNodes[0];

    for (var i = 0; i < attributes.length; i = i + 2) {
      element.attribs[attributes[i]] = attributes[i + 1];
    }

    let context = new GeneratorContext(null, '', angularJs, new ProtractorConfig());
    context.element = element;
    return nameExtractor.extractName(context);
  }
});