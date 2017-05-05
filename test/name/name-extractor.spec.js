'use strict';

const expect = require('chai').expect;
const parse5 = require('parse5');
const select = require('css-select');
const NameExtractor = require('../../lib/name/name-extractor');
const ConfigurationFactory = require('../../lib/configuration-factory');
const Element = require('../../lib/page/element');
const Page = require('../../lib/page/page');
const NG_CONTROLLER = require('../../lib/types').NG_CONTROLLER;

describe('NameExtractor', () => {

  let nameExtractor;

  beforeEach(() => {
    let config = ConfigurationFactory.create({});
    nameExtractor = new NameExtractor(config.nameSources);
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
    let documentFragment = parse5.parseFragment(
      '<div ng-controller="Controller1 as myController"><div ng-controller="TodoListController as todoList"><div></div></div></div>',
      {treeAdapter: parse5.treeAdapters.htmlparser2});

    let divs = select('div', documentFragment);

    let page = new Page();

    let section1 = page.addSection(divs[0]);
    section1.name = 'myController';
    section1.addTypes(NG_CONTROLLER);

    let section2 = section1.addSection(divs[1]);
    section2.name = 'todoList';
    section2.addTypes(NG_CONTROLLER);

    let element = section2.addElement(divs[2]);

    element.domElement.attribs['title'] = 'todoList.name';
    expect(nameExtractor.extractName(element)).to.equal('name');

    element.domElement.attribs['title'] = 'myController.item';
    expect(nameExtractor.extractName(element)).to.equal('item');

    element.domElement.attribs['title'] = 'myControllerItem2';
    expect(nameExtractor.extractName(element)).to.equal('myControllerItem2');

    element.domElement.attribs['title'] = 'todoListName2';
    expect(nameExtractor.extractName(element)).to.equal('todoListName2');
  });

  function getName(tagName, ...attributes) {
    let documentFragment = parse5.parseFragment(`<${tagName}></${tagName}>`,
                                                {treeAdapter: parse5.treeAdapters.htmlparser2});

    let domElement = documentFragment.childNodes[0];

    for (var i = 0; i < attributes.length; i = i + 2) {
      domElement.attribs[attributes[i]] = attributes[i + 1];
    }

    let pageElement = new Element(domElement, null);
    return nameExtractor.extractName(pageElement);
  }
});