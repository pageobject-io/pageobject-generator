'use strict';

const expect = require('chai').expect;
const Generator = require('../lib/generator');
const Position = require('../lib/page/position');
const fs = require('fs');
const eol = require('eol');

describe('Generator', () => {

  it('should generate binding po', () => {
    runTest('binding', 'bindingPageObject');
  });

  it('should generate button po', () => {
    runTest('button', 'buttonPageObject');
  });

  it('should generate checkbox po', () => {
    runTest('checkboxes', 'checkboxPageObject');
  });

  it('should generate css po', () => {
    runTest('css', 'cssPageObject');
  });

  it('should generate date po', () => {
    runTest('date', 'datePageObject');
  });

  it('should generate link po', () => {
    runTest('link', 'linkPageObject');
  });

  it('should generate ng2Component po', () => {
    runTest('ng2Component', 'ng2ComponentPageObject', {appFramework: 'angular'});
  });

  it('should generate ngClick po', () => {
    runTest('ngclick', 'ngClickPageObject');
  });

  it('should generate radio po', () => {
    runTest('radio', 'radioPageObject');
  });

  it('should generate repeater po', () => {
    runTest('repeater', 'repeaterPageObject');
  });

  it('should generate select po', () => {
    runTest('select', 'selectPageObject');
  });

  it('should generate text po', () => {
    runTest('text', 'textPageObject');
  });

  it('should generate textarea po', () => {
    runTest('textarea', 'textareaPageObject');
  });

  it('should generate positions', () => {
    let source = fs.readFileSync('./test/fixtures/positions.html', 'utf8');
    let generator = new Generator();
    let page = generator.generatePageModel(source);

    expect(page.elements[0].name).to.equal('collectionName');
    expect(page.elements[0].positions.length).to.equal(1);
    expect(page.elements[0].positions[0]).to.include(new Position(112, 201));

    expect(page.elements[1].name).to.equal('name');
    expect(page.elements[1].positions.length).to.equal(1);
    expect(page.elements[1].positions[0]).to.include(new Position(238, 414));

    expect(page.elements[2].name).to.equal('collectionNameError');
    expect(page.elements[2].positions.length).to.equal(1);
    expect(page.elements[2].positions[0]).to.include(new Position(423, 525));

    expect(page.elements[3].name).to.equal('color');
    expect(page.elements[3].positions.length).to.equal(4);
    expect(page.elements[3].positions[0]).to.include(new Position(585, 635));
    expect(page.elements[3].positions[1]).to.include(new Position(657, 708));
    expect(page.elements[3].positions[2]).to.include(new Position(732, 785));
    expect(page.elements[3].positions[3]).to.include(new Position(809, 882));

    expect(page.elements[4].name).to.equal('repeatSelect');
    expect(page.elements[4].positions.length).to.equal(1);
    expect(page.elements[4].positions[0]).to.include(new Position(899, 1129));

    expect(page.elements[5].name).to.equal('value1');
    expect(page.elements[5].positions.length).to.equal(1);
    expect(page.elements[5].positions[0]).to.include(new Position(976, 1013));

    expect(page.elements[6].name).to.equal('value2');
    expect(page.elements[6].positions.length).to.equal(1);
    expect(page.elements[6].positions[0]).to.include(new Position(1022, 1050));

    expect(page.elements[7].name).to.equal('value3');
    expect(page.elements[7].positions.length).to.equal(1);
    expect(page.elements[7].positions[0]).to.include(new Position(1050, 1087));

    expect(page.elements[8].name).to.equal('value4');
    expect(page.elements[8].positions.length).to.equal(1);
    expect(page.elements[8].positions[0]).to.include(new Position(1087, 1120));

    expect(page.elements[9].name).to.equal('autoCleanupEnabled');
    expect(page.elements[9].positions.length).to.equal(1);
    expect(page.elements[9].positions[0]).to.include(new Position(1228, 1346));

    expect(page.elements[10].name).to.equal('pnrSettingsAutoCleanupEnabled');
    expect(page.elements[10].positions.length).to.equal(1);
    expect(page.elements[10].positions[0]).to.include(new Position(1359, 1448));

    expect(page.elements[11].name).to.equal('todoListTodoText');
    expect(page.elements[11].positions.length).to.equal(1);
    expect(page.elements[11].positions[0]).to.include(new Position(1526, 1627));

    expect(page.elements[12].name).to.equal('addButton');
    expect(page.elements[12].positions.length).to.equal(1);
    expect(page.elements[12].positions[0]).to.include(new Position(1632, 1685));

    expect(page.elements[13].name).to.equal('items');
    expect(page.elements[13].positions.length).to.equal(1);
    expect(page.elements[13].positions[0]).to.include(new Position(1695, 1859));

    expect(page.elements[13].elements[0].name).to.equal('testLink');
    expect(page.elements[13].elements[0].positions.length).to.equal(1);
    expect(page.elements[13].elements[0].positions[0]).to.include(new Position(1736, 1752));

    expect(page.elements[13].elements[1].name).to.equal('elementsLink');
    expect(page.elements[13].elements[1].positions.length).to.equal(1);
    expect(page.elements[13].elements[1].positions[0]).to.include(new Position(1757, 1811));

    expect(page.elements[13].elements[2].name).to.equal('a0');
    expect(page.elements[13].elements[2].positions.length).to.equal(1);
    expect(page.elements[13].elements[2].positions[0]).to.include(new Position(1816, 1852));

    expect(page.elements[14].name).to.equal('parts');
    expect(page.elements[14].positions.length).to.equal(1);
    expect(page.elements[14].positions[0]).to.include(new Position(2135, 2528));

    expect(page.elements[14].elements[0].name).to.equal('partPurchaseDate');
    expect(page.elements[14].elements[0].positions.length).to.equal(1);
    expect(page.elements[14].elements[0].positions[0]).to.include(new Position(2196, 2257));

    expect(page.elements[14].elements[1].name).to.equal('partPrice');
    expect(page.elements[14].elements[1].positions.length).to.equal(1);
    expect(page.elements[14].elements[1].positions[0]).to.include(new Position(2266, 2320));

    expect(page.elements[14].elements[2].name).to.equal('editPartButton');
    expect(page.elements[14].elements[2].positions.length).to.equal(1);
    expect(page.elements[14].elements[2].positions[0]).to.include(new Position(2366, 2504));
  });

  function runTest(sourceFile, expectedPageObjectFile, options) {
    let source = fs.readFileSync('./test/fixtures/' + sourceFile + '.html', 'utf8');
    let expectedPageObject = fs.readFileSync('./test/fixtures/' + expectedPageObjectFile + '.po', 'utf8');
    expectedPageObject = eol.crlf(expectedPageObject);

    let generator = new Generator();
    let pageObject = generator.generate(source, options || {});

    expect(pageObject).to.equal(expectedPageObject);
  }
});