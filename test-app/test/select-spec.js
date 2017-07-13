var SelectPage = require('../../test/fixtures/selectPageObject.po');

describe('select fields', function () {
  var selectPage;

  beforeEach(function () {
    browser.get('http://localhost:3000/select.html');
    selectPage = new SelectPage();
  });

  it('simple select', function () {
    selectPage.unitTypeShouldBeVisible();
    selectPage.unitTypeShouldBeEnabled();
    selectPage.unitTypeByPartialTextShouldNotBeSelected('Miner');
    selectPage.unitTypeByPartialTextShouldNotBeSelected('Puffer');
    selectPage.unitTypeByPartialTextShouldNotBeSelected('Snipey');
    selectPage.unitTypeByPartialTextShouldNotBeSelected('er');
    selectPage.unitTypeByPartialTextShouldNotBeSelected('Miner', 'Puffer', 'Snipey', 'Max', 'Firebot');
    selectPage.unitTypeByPartialTextShouldNotBeSelected(['Miner', 'er', 'Snipey', 'Max', 'Firebot']);
    selectPage.unitTypeByTextShouldNotBeSelected('Miner');
    selectPage.unitTypeByTextShouldNotBeSelected('Puffer');
    selectPage.unitTypeByTextShouldNotBeSelected('Snipey');
    selectPage.unitTypeByTextShouldNotBeSelected('Miner', 'Puffer', 'Snipey', 'Max', 'Firebot');
    selectPage.unitTypeByTextShouldNotBeSelected(['Miner', 'Puffer', 'Snipey', 'Max', 'Firebot']);
    selectPage.unitTypeByValueShouldNotBeSelected('1');
    selectPage.unitTypeByValueShouldNotBeSelected('2');
    selectPage.unitTypeByValueShouldNotBeSelected('3');
    selectPage.unitTypeByValueShouldNotBeSelected('1', '2', '3', '4', '5');
    selectPage.unitTypeByValueShouldNotBeSelected(['1', '2', '3', '4', '5']);

    selectPage.selectUnitTypeByPartialText('iner');
    selectPage.unitTypeByPartialTextShouldBeSelected('Miner');
    selectPage.unitTypeByPartialTextShouldBeSelected('iner');
    selectPage.unitTypeByPartialTextShouldNotBeSelected('Puffer', 'Snipey', 'Max', 'Firebot');
    selectPage.unitTypeByTextShouldBeSelected('Miner');
    selectPage.unitTypeByTextShouldNotBeSelected('Puffer', 'Snipey', 'Max', 'Firebot');
    selectPage.unitTypeByValueShouldBeSelected('1');
    selectPage.unitTypeByValueShouldNotBeSelected('2', '3', '4', '5');

    selectPage.selectUnitTypeByText('Max');
    selectPage.unitTypeByPartialTextShouldBeSelected('Max');
    selectPage.unitTypeByPartialTextShouldBeSelected('ax');
    selectPage.unitTypeByPartialTextShouldNotBeSelected('Puffer', 'Miner', 'Snipey', 'Firebot');
    selectPage.unitTypeByTextShouldBeSelected('Max');
    selectPage.unitTypeByTextShouldNotBeSelected('Puffer', 'Miner', 'Snipey', 'Firebot');
    selectPage.unitTypeByValueShouldBeSelected('4');
    selectPage.unitTypeByValueShouldNotBeSelected('1', '2', '3', '5');

    selectPage.selectUnitTypeByValue('3');
    selectPage.unitTypeByPartialTextShouldBeSelected('Snipey');
    selectPage.unitTypeByPartialTextShouldBeSelected('Sni');
    selectPage.unitTypeByPartialTextShouldNotBeSelected('Puffer', 'Miner', 'Max', 'Firebot');
    selectPage.unitTypeByTextShouldBeSelected('Snipey');
    selectPage.unitTypeByTextShouldNotBeSelected('Puffer', 'Miner', 'Max', 'Firebot');
    selectPage.unitTypeByValueShouldBeSelected('3');
    selectPage.unitTypeByValueShouldNotBeSelected('1', '2', '4', '5');

    selectPage.selectUnitTypeByValue('');
    selectPage.unitTypeByPartialTextShouldNotBeSelected('Miner', 'Puffer', 'Snipey', 'Max', 'Firebot');
    selectPage.unitTypeByTextShouldNotBeSelected('Miner', 'Puffer', 'Snipey', 'Max', 'Firebot');
    selectPage.unitTypeByValueShouldNotBeSelected('1', '2', '3', '4', '5');
  });

  it('multi select', function () {
    selectPage.multipleUnitTypeShouldBeVisible();
    selectPage.multipleUnitTypeShouldBeEnabled();
    selectPage.multipleUnitTypeByPartialTextShouldNotBeSelected('Miner');
    selectPage.multipleUnitTypeByPartialTextShouldNotBeSelected('Puffer');
    selectPage.multipleUnitTypeByPartialTextShouldNotBeSelected('Snipey');
    selectPage.multipleUnitTypeByPartialTextShouldNotBeSelected('er');
    selectPage.multipleUnitTypeByPartialTextShouldNotBeSelected('Miner', 'Puffer', 'Snipey', 'Max', 'Firebot');
    selectPage.multipleUnitTypeByPartialTextShouldNotBeSelected(['Miner', 'er', 'Snipey', 'Max', 'Firebot']);
    selectPage.multipleUnitTypeByTextShouldNotBeSelected('Miner');
    selectPage.multipleUnitTypeByTextShouldNotBeSelected('Puffer');
    selectPage.multipleUnitTypeByTextShouldNotBeSelected('Snipey');
    selectPage.multipleUnitTypeByTextShouldNotBeSelected('Miner', 'Puffer', 'Snipey', 'Max', 'Firebot');
    selectPage.multipleUnitTypeByTextShouldNotBeSelected(['Miner', 'Puffer', 'Snipey', 'Max', 'Firebot']);
    selectPage.multipleUnitTypeByValueShouldNotBeSelected('1');
    selectPage.multipleUnitTypeByValueShouldNotBeSelected('2');
    selectPage.multipleUnitTypeByValueShouldNotBeSelected('3');
    selectPage.multipleUnitTypeByValueShouldNotBeSelected('1', '2', '3', '4', '5');
    selectPage.multipleUnitTypeByValueShouldNotBeSelected(['1', '2', '3', '4', '5']);

    selectPage.selectMultipleUnitTypeByPartialText('er');
    selectPage.multipleUnitTypeByPartialTextShouldBeSelected('Miner', 'Puffer');
    selectPage.multipleUnitTypeByPartialTextShouldBeSelected('er');
    selectPage.multipleUnitTypeByPartialTextShouldNotBeSelected('Snipey', 'Max', 'Firebot');
    selectPage.multipleUnitTypeByTextShouldBeSelected('Miner', 'Puffer');
    selectPage.multipleUnitTypeByTextShouldNotBeSelected('Snipey', 'Max', 'Firebot');
    selectPage.multipleUnitTypeByValueShouldBeSelected('1', '2');
    selectPage.multipleUnitTypeByValueShouldNotBeSelected('3', '4', '5');

    selectPage.selectMultipleUnitTypeByText('Snipey');
    selectPage.selectMultipleUnitTypeByText('Max');
    selectPage.multipleUnitTypeByPartialTextShouldBeSelected('Miner', 'Puffer', 'Snipey', 'Max');
    selectPage.multipleUnitTypeByPartialTextShouldBeSelected('er', 'Snipey', 'Max');
    selectPage.multipleUnitTypeByPartialTextShouldNotBeSelected('Firebot');
    selectPage.multipleUnitTypeByTextShouldBeSelected('Miner', 'Puffer', 'Snipey', 'Max');
    selectPage.multipleUnitTypeByTextShouldNotBeSelected('Firebot');
    selectPage.multipleUnitTypeByValueShouldBeSelected('1', '2', '3', '4');
    selectPage.multipleUnitTypeByValueShouldNotBeSelected('5');

    selectPage.selectMultipleUnitTypeByValue('5');
    selectPage.multipleUnitTypeByPartialTextShouldBeSelected('Miner', 'Puffer', 'Snipey', 'Max', 'Firebot');
    selectPage.multipleUnitTypeByPartialTextShouldBeSelected('er', 'Snipey', 'Max', 'Firebot');
    selectPage.multipleUnitTypeByTextShouldBeSelected('Miner', 'Puffer', 'Snipey', 'Max', 'Firebot');
    selectPage.multipleUnitTypeByValueShouldBeSelected('1', '2', '3', '4', '5');

    selectPage.selectMultipleUnitTypeByValue('1');
    selectPage.selectMultipleUnitTypeByValue('2');
    selectPage.selectMultipleUnitTypeByValue('3');
    selectPage.selectMultipleUnitTypeByValue('4');
    selectPage.selectMultipleUnitTypeByValue('5');
    selectPage.multipleUnitTypeByPartialTextShouldNotBeSelected('Miner');
    selectPage.multipleUnitTypeByPartialTextShouldNotBeSelected('Puffer');
    selectPage.multipleUnitTypeByPartialTextShouldNotBeSelected('Snipey');
    selectPage.multipleUnitTypeByPartialTextShouldNotBeSelected('er');
    selectPage.multipleUnitTypeByPartialTextShouldNotBeSelected('Miner', 'Puffer', 'Snipey', 'Max', 'Firebot');
    selectPage.multipleUnitTypeByPartialTextShouldNotBeSelected(['Miner', 'er', 'Snipey', 'Max', 'Firebot']);
    selectPage.multipleUnitTypeByTextShouldNotBeSelected('Miner');
    selectPage.multipleUnitTypeByTextShouldNotBeSelected('Puffer');
    selectPage.multipleUnitTypeByTextShouldNotBeSelected('Snipey');
    selectPage.multipleUnitTypeByTextShouldNotBeSelected('Miner', 'Puffer', 'Snipey', 'Max', 'Firebot');
    selectPage.multipleUnitTypeByTextShouldNotBeSelected(['Miner', 'Puffer', 'Snipey', 'Max', 'Firebot']);
    selectPage.multipleUnitTypeByValueShouldNotBeSelected('1');
    selectPage.multipleUnitTypeByValueShouldNotBeSelected('2');
    selectPage.multipleUnitTypeByValueShouldNotBeSelected('3');
    selectPage.multipleUnitTypeByValueShouldNotBeSelected('1', '2', '3', '4', '5');
    selectPage.multipleUnitTypeByValueShouldNotBeSelected(['1', '2', '3', '4', '5']);
  });

  it('repeat select', function () {
    selectPage.repeatSelectShouldBeVisible();
    selectPage.repeatSelectShouldBeEnabled();
    selectPage.repeatSelectByPartialTextShouldNotBeSelected('Opt');
    selectPage.repeatSelectByPartialTextShouldNotBeSelected('Option A', 'Option B', 'Option C');
    selectPage.repeatSelectByTextShouldNotBeSelected('Option A');
    selectPage.repeatSelectByTextShouldNotBeSelected('Option B');
    selectPage.repeatSelectByTextShouldNotBeSelected('Option C');
    selectPage.repeatSelectByTextShouldNotBeSelected(['Option A', 'Option B', 'Option C']);
    selectPage.repeatSelectByValueShouldNotBeSelected('1');
    selectPage.repeatSelectByValueShouldNotBeSelected('2');
    selectPage.repeatSelectByValueShouldNotBeSelected('3');
    selectPage.repeatSelectByValueShouldNotBeSelected('1', '2', '3');

    selectPage.selectRepeatSelectByPartialText('C');
    selectPage.repeatSelectByPartialTextShouldBeSelected('Option C');
    selectPage.repeatSelectByPartialTextShouldBeSelected('tion C');
    selectPage.repeatSelectByPartialTextShouldNotBeSelected('Option A', 'Option B');
    selectPage.repeatSelectByTextShouldBeSelected('Option C');
    selectPage.repeatSelectByTextShouldNotBeSelected('Option A', 'Option B');
    selectPage.repeatSelectByValueShouldBeSelected('3');
    selectPage.repeatSelectByValueShouldNotBeSelected('1', '2');

    selectPage.selectRepeatSelectByText('Option A');
    selectPage.repeatSelectByPartialTextShouldBeSelected('Option A');
    selectPage.repeatSelectByPartialTextShouldBeSelected('on A');
    selectPage.repeatSelectByPartialTextShouldNotBeSelected('Option B', 'Option C');
    selectPage.repeatSelectByTextShouldBeSelected('Option A');
    selectPage.repeatSelectByTextShouldNotBeSelected('Option B', 'Option C');
    selectPage.repeatSelectByValueShouldBeSelected('1');
    selectPage.repeatSelectByValueShouldNotBeSelected('2', '3');

    selectPage.selectRepeatSelectByValue('3');
    selectPage.repeatSelectByPartialTextShouldBeSelected('Option C');
    selectPage.repeatSelectByPartialTextShouldBeSelected('tion C');
    selectPage.repeatSelectByPartialTextShouldNotBeSelected('Option A', 'Option B');
    selectPage.repeatSelectByTextShouldBeSelected('Option C');
    selectPage.repeatSelectByTextShouldNotBeSelected('Option A', 'Option B');
    selectPage.repeatSelectByValueShouldBeSelected('3');
    selectPage.repeatSelectByValueShouldNotBeSelected('1', '2');
  });

  it('ngValue select', function () {
    selectPage.ngValueSelectShouldBeVisible();
    selectPage.ngValueSelectShouldBeEnabled();
    selectPage.ngValueSelectByPartialTextShouldNotBeSelected('string');
    selectPage.ngValueSelectByPartialTextShouldNotBeSelected('integer');
    selectPage.ngValueSelectByPartialTextShouldNotBeSelected('boolean');
    selectPage.ngValueSelectByPartialTextShouldNotBeSelected('null');
    selectPage.ngValueSelectByPartialTextShouldNotBeSelected('obj');
    selectPage.ngValueSelectByPartialTextShouldNotBeSelected('ray');
    selectPage.ngValueSelectByPartialTextShouldNotBeSelected('string', 'integer', 'boolean', 'null', 'obj', 'array');
    selectPage.ngValueSelectByPartialTextShouldNotBeSelected(['string', 'integer', 'boolean', 'null', 'obj', 'array']);
    selectPage.ngValueSelectByTextShouldNotBeSelected('string');
    selectPage.ngValueSelectByTextShouldNotBeSelected('integer');
    selectPage.ngValueSelectByTextShouldNotBeSelected('boolean');
    selectPage.ngValueSelectByTextShouldNotBeSelected('null');
    selectPage.ngValueSelectByTextShouldNotBeSelected('object');
    selectPage.ngValueSelectByTextShouldNotBeSelected('array');
    selectPage.ngValueSelectByTextShouldNotBeSelected('string', 'integer', 'boolean', 'null', 'object', 'array');
    selectPage.ngValueSelectByTextShouldNotBeSelected(['string', 'integer', 'boolean', 'null', 'object', 'array']);
    selectPage.ngValueSelectByValueShouldNotBeSelected('myString');
    selectPage.ngValueSelectByValueShouldNotBeSelected('1');
    selectPage.ngValueSelectByValueShouldNotBeSelected('true');
    selectPage.ngValueSelectByValueShouldNotBeSelected('null');
    selectPage.ngValueSelectByValueShouldNotBeSelected('myString', '1', 'true', 'null');
    selectPage.ngValueSelectByValueShouldNotBeSelected(['myString', '1', 'true', 'null']);

    selectPage.selectNgValueSelectByPartialText('in');
    selectPage.ngValueSelectByPartialTextShouldBeSelected('str', 'int');
    selectPage.ngValueSelectByPartialTextShouldNotBeSelected('boolean', 'null', 'object', 'array');
    selectPage.ngValueSelectByTextShouldBeSelected('string', 'integer');
    selectPage.ngValueSelectByTextShouldNotBeSelected('boolean', 'null', 'object', 'array');
    selectPage.ngValueSelectByValueShouldBeSelected('myString', '1');
    selectPage.ngValueSelectByValueShouldNotBeSelected('true');

    selectPage.selectNgValueSelectByText('boolean');
    selectPage.selectNgValueSelectByText('null');
    selectPage.ngValueSelectByPartialTextShouldBeSelected('str', 'int', 'boolean', 'null');
    selectPage.ngValueSelectByPartialTextShouldNotBeSelected('object', 'array');
    selectPage.ngValueSelectByTextShouldBeSelected('string', 'integer', 'boolean', 'null');
    selectPage.ngValueSelectByTextShouldNotBeSelected('object', 'array');
    selectPage.ngValueSelectByValueShouldBeSelected('myString', '1', 'true');

    selectPage.selectNgValueSelectByValue('true');
    selectPage.ngValueSelectByPartialTextShouldBeSelected('str', 'int', 'null');
    selectPage.ngValueSelectByPartialTextShouldNotBeSelected('boolean', 'object', 'array');
    selectPage.ngValueSelectByTextShouldBeSelected('string', 'integer', 'null');
    selectPage.ngValueSelectByTextShouldNotBeSelected('boolean', 'object', 'array');
    selectPage.ngValueSelectByValueShouldBeSelected('myString', '1');
    selectPage.ngValueSelectByValueShouldNotBeSelected('true');
  });

  it('ngOptions select', function () {
    selectPage.ngOptionsSelectShouldBeVisible();
    selectPage.ngOptionsSelectShouldBeEnabled();
    selectPage.ngOptionsSelectByPartialTextShouldNotBeSelected('Option A', 'Option B');
    selectPage.ngOptionsSelectByPartialTextShouldBeSelected('Option C');
    selectPage.ngOptionsSelectByTextShouldNotBeSelected('Option A');
    selectPage.ngOptionsSelectByTextShouldNotBeSelected('Option B');
    selectPage.ngOptionsSelectByTextShouldBeSelected('Option C');
    selectPage.ngOptionsSelectByTextShouldNotBeSelected(['Option A', 'Option B']);
    selectPage.ngOptionsSelectByValueShouldNotBeSelected('1');
    selectPage.ngOptionsSelectByValueShouldNotBeSelected('2');
    selectPage.ngOptionsSelectByValueShouldBeSelected('3');
    selectPage.ngOptionsSelectByValueShouldNotBeSelected('1', '2');

    selectPage.selectNgOptionsSelectByPartialText('C');
    selectPage.ngOptionsSelectByPartialTextShouldBeSelected('Option C');
    selectPage.ngOptionsSelectByPartialTextShouldBeSelected('tion C');
    selectPage.ngOptionsSelectByPartialTextShouldNotBeSelected('Option A', 'Option B');
    selectPage.ngOptionsSelectByTextShouldBeSelected('Option C');
    selectPage.ngOptionsSelectByTextShouldNotBeSelected('Option A', 'Option B');
    selectPage.ngOptionsSelectByValueShouldBeSelected('3');
    selectPage.ngOptionsSelectByValueShouldNotBeSelected('1', '2');

    selectPage.selectNgOptionsSelectByText('Option A');
    selectPage.ngOptionsSelectByPartialTextShouldBeSelected('Option A');
    selectPage.ngOptionsSelectByPartialTextShouldBeSelected('on A');
    selectPage.ngOptionsSelectByPartialTextShouldNotBeSelected('Option B', 'Option C');
    selectPage.ngOptionsSelectByTextShouldBeSelected('Option A');
    selectPage.ngOptionsSelectByTextShouldNotBeSelected('Option B', 'Option C');
    selectPage.ngOptionsSelectByValueShouldBeSelected('1');
    selectPage.ngOptionsSelectByValueShouldNotBeSelected('2', '3');

    selectPage.selectNgOptionsSelectByValue('3');
    selectPage.ngOptionsSelectByPartialTextShouldBeSelected('Option C');
    selectPage.ngOptionsSelectByPartialTextShouldBeSelected('tion C');
    selectPage.ngOptionsSelectByPartialTextShouldNotBeSelected('Option A', 'Option B');
    selectPage.ngOptionsSelectByTextShouldBeSelected('Option C');
    selectPage.ngOptionsSelectByTextShouldNotBeSelected('Option A', 'Option B');
    selectPage.ngOptionsSelectByValueShouldBeSelected('3');
    selectPage.ngOptionsSelectByValueShouldNotBeSelected('1', '2');
  });

  it('repeated simple select', function () {
    selectPage.repeaterUnitTypeShouldBeVisible(0);
    selectPage.repeaterUnitTypeShouldBeVisible(1);
    selectPage.repeaterUnitTypeShouldBeEnabled(0);
    selectPage.repeaterUnitTypeShouldBeEnabled(1);
    selectPage.repeaterUnitTypeByPartialTextShouldNotBeSelected(0, 'Miner');
    selectPage.repeaterUnitTypeByPartialTextShouldNotBeSelected(0, 'Puffer');
    selectPage.repeaterUnitTypeByPartialTextShouldNotBeSelected(0, 'Snipey');
    selectPage.repeaterUnitTypeByPartialTextShouldNotBeSelected(0, 'er');
    selectPage.repeaterUnitTypeByPartialTextShouldNotBeSelected(0, 'Miner', 'Puffer', 'Snipey', 'Max', 'Firebot');
    selectPage.repeaterUnitTypeByPartialTextShouldNotBeSelected(0, ['Miner', 'er', 'Snipey', 'Max', 'Firebot']);
    selectPage.repeaterUnitTypeByPartialTextShouldNotBeSelected(1, 'Miner');
    selectPage.repeaterUnitTypeByPartialTextShouldNotBeSelected(1, 'Puffer');
    selectPage.repeaterUnitTypeByPartialTextShouldNotBeSelected(1, 'Snipey');
    selectPage.repeaterUnitTypeByPartialTextShouldNotBeSelected(1, 'er');
    selectPage.repeaterUnitTypeByPartialTextShouldNotBeSelected(1, 'Miner', 'Puffer', 'Snipey', 'Max', 'Firebot');
    selectPage.repeaterUnitTypeByPartialTextShouldNotBeSelected(1, ['Miner', 'er', 'Snipey', 'Max', 'Firebot']);
    selectPage.repeaterUnitTypeByTextShouldNotBeSelected(0, 'Miner');
    selectPage.repeaterUnitTypeByTextShouldNotBeSelected(0, 'Puffer');
    selectPage.repeaterUnitTypeByTextShouldNotBeSelected(0, 'Snipey');
    selectPage.repeaterUnitTypeByTextShouldNotBeSelected(0, 'Miner', 'Puffer', 'Snipey', 'Max', 'Firebot');
    selectPage.repeaterUnitTypeByTextShouldNotBeSelected(0, ['Miner', 'Puffer', 'Snipey', 'Max', 'Firebot']);
    selectPage.repeaterUnitTypeByTextShouldNotBeSelected(1, 'Miner');
    selectPage.repeaterUnitTypeByTextShouldNotBeSelected(1, 'Puffer');
    selectPage.repeaterUnitTypeByTextShouldNotBeSelected(1, 'Snipey');
    selectPage.repeaterUnitTypeByTextShouldNotBeSelected(1, 'Miner', 'Puffer', 'Snipey', 'Max', 'Firebot');
    selectPage.repeaterUnitTypeByTextShouldNotBeSelected(1, ['Miner', 'Puffer', 'Snipey', 'Max', 'Firebot']);
    selectPage.repeaterUnitTypeByValueShouldNotBeSelected(0, '1');
    selectPage.repeaterUnitTypeByValueShouldNotBeSelected(0, '2');
    selectPage.repeaterUnitTypeByValueShouldNotBeSelected(0, '3');
    selectPage.repeaterUnitTypeByValueShouldNotBeSelected(0, '1', '2', '3', '4', '5');
    selectPage.repeaterUnitTypeByValueShouldNotBeSelected(0, ['1', '2', '3', '4', '5']);
    selectPage.repeaterUnitTypeByValueShouldNotBeSelected(1, '1');
    selectPage.repeaterUnitTypeByValueShouldNotBeSelected(1, '2');
    selectPage.repeaterUnitTypeByValueShouldNotBeSelected(1, '3');
    selectPage.repeaterUnitTypeByValueShouldNotBeSelected(1, '1', '2', '3', '4', '5');
    selectPage.repeaterUnitTypeByValueShouldNotBeSelected(1, ['1', '2', '3', '4', '5']);

    selectPage.selectRepeaterUnitTypeByPartialText(0, 'iner');
    selectPage.repeaterUnitTypeByPartialTextShouldBeSelected(0, 'Miner');
    selectPage.repeaterUnitTypeByPartialTextShouldBeSelected(0, 'iner');
    selectPage.repeaterUnitTypeByPartialTextShouldNotBeSelected(0, 'Puffer', 'Snipey', 'Max', 'Firebot');
    selectPage.repeaterUnitTypeByTextShouldBeSelected(0, 'Miner');
    selectPage.repeaterUnitTypeByTextShouldNotBeSelected(0, 'Puffer', 'Snipey', 'Max', 'Firebot');
    selectPage.repeaterUnitTypeByValueShouldBeSelected(0, '1');
    selectPage.repeaterUnitTypeByValueShouldNotBeSelected(0, '2', '3', '4', '5');

    selectPage.selectRepeaterUnitTypeByText(1, 'Max');
    selectPage.repeaterUnitTypeByPartialTextShouldBeSelected(1, 'Max');
    selectPage.repeaterUnitTypeByPartialTextShouldBeSelected(1, 'ax');
    selectPage.repeaterUnitTypeByPartialTextShouldNotBeSelected(1, 'Puffer', 'Miner', 'Snipey', 'Firebot');
    selectPage.repeaterUnitTypeByTextShouldBeSelected(1, 'Max');
    selectPage.repeaterUnitTypeByTextShouldNotBeSelected(1, 'Puffer', 'Miner', 'Snipey', 'Firebot');
    selectPage.repeaterUnitTypeByValueShouldBeSelected(1, '4');
    selectPage.repeaterUnitTypeByValueShouldNotBeSelected(1, '1', '2', '3', '5');

    selectPage.selectRepeaterUnitTypeByValue(0, '3');
    selectPage.repeaterUnitTypeByPartialTextShouldBeSelected(0, 'Snipey');
    selectPage.repeaterUnitTypeByPartialTextShouldBeSelected(0, 'Sni');
    selectPage.repeaterUnitTypeByPartialTextShouldNotBeSelected(0, 'Puffer', 'Miner', 'Max', 'Firebot');
    selectPage.repeaterUnitTypeByTextShouldBeSelected(0, 'Snipey');
    selectPage.repeaterUnitTypeByTextShouldNotBeSelected(0, 'Puffer', 'Miner', 'Max', 'Firebot');
    selectPage.repeaterUnitTypeByValueShouldBeSelected(0, '3');
    selectPage.repeaterUnitTypeByValueShouldNotBeSelected(0, '1', '2', '4', '5');

    selectPage.selectRepeaterUnitTypeByValue(1, '');
    selectPage.repeaterUnitTypeByPartialTextShouldNotBeSelected(1, 'Miner', 'Puffer', 'Snipey', 'Max', 'Firebot');
    selectPage.repeaterUnitTypeByTextShouldNotBeSelected(1, 'Miner', 'Puffer', 'Snipey', 'Max', 'Firebot');
    selectPage.repeaterUnitTypeByValueShouldNotBeSelected(1, '1', '2', '3', '4', '5');
  });

  it('nested repeater simple select', function () {
    selectPage.nestedRepeaterUnitTypeShouldBeVisible(0, 0);
    selectPage.nestedRepeaterUnitTypeShouldBeVisible(1, 1);
    selectPage.nestedRepeaterUnitTypeShouldBeEnabled(0, 0);
    selectPage.nestedRepeaterUnitTypeShouldBeEnabled(1, 1);
    selectPage.nestedRepeaterUnitTypeByPartialTextShouldNotBeSelected(0, 0, 'Miner');
    selectPage.nestedRepeaterUnitTypeByPartialTextShouldNotBeSelected(0, 0, 'Puffer');
    selectPage.nestedRepeaterUnitTypeByPartialTextShouldNotBeSelected(0, 0, 'Snipey');
    selectPage.nestedRepeaterUnitTypeByPartialTextShouldNotBeSelected(0, 0, 'er');
    selectPage.nestedRepeaterUnitTypeByPartialTextShouldNotBeSelected(0,
                                                                      0,
                                                                      'Miner',
                                                                      'Puffer',
                                                                      'Snipey',
                                                                      'Max',
                                                                      'Firebot');
    selectPage.nestedRepeaterUnitTypeByPartialTextShouldNotBeSelected(0,
                                                                      0,
                                                                      ['Miner', 'er', 'Snipey', 'Max', 'Firebot']);
    selectPage.nestedRepeaterUnitTypeByPartialTextShouldNotBeSelected(1, 1, 'Miner');
    selectPage.nestedRepeaterUnitTypeByPartialTextShouldNotBeSelected(1, 1, 'Puffer');
    selectPage.nestedRepeaterUnitTypeByPartialTextShouldNotBeSelected(1, 1, 'Snipey');
    selectPage.nestedRepeaterUnitTypeByPartialTextShouldNotBeSelected(1, 1, 'er');
    selectPage.nestedRepeaterUnitTypeByPartialTextShouldNotBeSelected(1,
                                                                      1,
                                                                      'Miner',
                                                                      'Puffer',
                                                                      'Snipey',
                                                                      'Max',
                                                                      'Firebot');
    selectPage.nestedRepeaterUnitTypeByPartialTextShouldNotBeSelected(1,
                                                                      1,
                                                                      ['Miner', 'er', 'Snipey', 'Max', 'Firebot']);
    selectPage.nestedRepeaterUnitTypeByTextShouldNotBeSelected(0, 0, 'Miner');
    selectPage.nestedRepeaterUnitTypeByTextShouldNotBeSelected(0, 0, 'Puffer');
    selectPage.nestedRepeaterUnitTypeByTextShouldNotBeSelected(0, 0, 'Snipey');
    selectPage.nestedRepeaterUnitTypeByTextShouldNotBeSelected(0, 0, 'Miner', 'Puffer', 'Snipey', 'Max', 'Firebot');
    selectPage.nestedRepeaterUnitTypeByTextShouldNotBeSelected(0, 0, ['Miner', 'Puffer', 'Snipey', 'Max', 'Firebot']);
    selectPage.nestedRepeaterUnitTypeByTextShouldNotBeSelected(1, 1, 'Miner');
    selectPage.nestedRepeaterUnitTypeByTextShouldNotBeSelected(1, 1, 'Puffer');
    selectPage.nestedRepeaterUnitTypeByTextShouldNotBeSelected(1, 1, 'Snipey');
    selectPage.nestedRepeaterUnitTypeByTextShouldNotBeSelected(1, 1, 'Miner', 'Puffer', 'Snipey', 'Max', 'Firebot');
    selectPage.nestedRepeaterUnitTypeByTextShouldNotBeSelected(1, 1, ['Miner', 'Puffer', 'Snipey', 'Max', 'Firebot']);
    selectPage.nestedRepeaterUnitTypeByValueShouldNotBeSelected(0, 0, '1');
    selectPage.nestedRepeaterUnitTypeByValueShouldNotBeSelected(0, 0, '2');
    selectPage.nestedRepeaterUnitTypeByValueShouldNotBeSelected(0, 0, '3');
    selectPage.nestedRepeaterUnitTypeByValueShouldNotBeSelected(0, 0, '1', '2', '3', '4', '5');
    selectPage.nestedRepeaterUnitTypeByValueShouldNotBeSelected(0, 0, ['1', '2', '3', '4', '5']);
    selectPage.nestedRepeaterUnitTypeByValueShouldNotBeSelected(1, 1, '1');
    selectPage.nestedRepeaterUnitTypeByValueShouldNotBeSelected(1, 1, '2');
    selectPage.nestedRepeaterUnitTypeByValueShouldNotBeSelected(1, 1, '3');
    selectPage.nestedRepeaterUnitTypeByValueShouldNotBeSelected(1, 1, '1', '2', '3', '4', '5');
    selectPage.nestedRepeaterUnitTypeByValueShouldNotBeSelected(1, 1, ['1', '2', '3', '4', '5']);

    selectPage.selectNestedRepeaterUnitTypeByPartialText(0, 0, 'iner');
    selectPage.nestedRepeaterUnitTypeByPartialTextShouldBeSelected(0, 0, 'Miner');
    selectPage.nestedRepeaterUnitTypeByPartialTextShouldBeSelected(0, 0, 'iner');
    selectPage.nestedRepeaterUnitTypeByPartialTextShouldNotBeSelected(0, 0, 'Puffer', 'Snipey', 'Max', 'Firebot');
    selectPage.nestedRepeaterUnitTypeByTextShouldBeSelected(0, 0, 'Miner');
    selectPage.nestedRepeaterUnitTypeByTextShouldNotBeSelected(0, 0, 'Puffer', 'Snipey', 'Max', 'Firebot');
    selectPage.nestedRepeaterUnitTypeByValueShouldBeSelected(0, 0, '1');
    selectPage.nestedRepeaterUnitTypeByValueShouldNotBeSelected(0, 0, '2', '3', '4', '5');

    selectPage.selectNestedRepeaterUnitTypeByText(1, 1, 'Max');
    selectPage.nestedRepeaterUnitTypeByPartialTextShouldBeSelected(1, 1, 'Max');
    selectPage.nestedRepeaterUnitTypeByPartialTextShouldBeSelected(1, 1, 'ax');
    selectPage.nestedRepeaterUnitTypeByPartialTextShouldNotBeSelected(1, 1, 'Puffer', 'Miner', 'Snipey', 'Firebot');
    selectPage.nestedRepeaterUnitTypeByTextShouldBeSelected(1, 1, 'Max');
    selectPage.nestedRepeaterUnitTypeByTextShouldNotBeSelected(1, 1, 'Puffer', 'Miner', 'Snipey', 'Firebot');
    selectPage.nestedRepeaterUnitTypeByValueShouldBeSelected(1, 1, '4');
    selectPage.nestedRepeaterUnitTypeByValueShouldNotBeSelected(1, 1, '1', '2', '3', '5');

    selectPage.selectNestedRepeaterUnitTypeByValue(0, 0, '3');
    selectPage.nestedRepeaterUnitTypeByPartialTextShouldBeSelected(0, 0, 'Snipey');
    selectPage.nestedRepeaterUnitTypeByPartialTextShouldBeSelected(0, 0, 'Sni');
    selectPage.nestedRepeaterUnitTypeByPartialTextShouldNotBeSelected(0, 0, 'Puffer', 'Miner', 'Max', 'Firebot');
    selectPage.nestedRepeaterUnitTypeByTextShouldBeSelected(0, 0, 'Snipey');
    selectPage.nestedRepeaterUnitTypeByTextShouldNotBeSelected(0, 0, 'Puffer', 'Miner', 'Max', 'Firebot');
    selectPage.nestedRepeaterUnitTypeByValueShouldBeSelected(0, 0, '3');
    selectPage.nestedRepeaterUnitTypeByValueShouldNotBeSelected(0, 0, '1', '2', '4', '5');

    selectPage.selectNestedRepeaterUnitTypeByValue(1, 1, '');
    selectPage.nestedRepeaterUnitTypeByPartialTextShouldNotBeSelected(1,
                                                                      1,
                                                                      'Miner',
                                                                      'Puffer',
                                                                      'Snipey',
                                                                      'Max',
                                                                      'Firebot');
    selectPage.nestedRepeaterUnitTypeByTextShouldNotBeSelected(1, 1, 'Miner', 'Puffer', 'Snipey', 'Max', 'Firebot');
    selectPage.nestedRepeaterUnitTypeByValueShouldNotBeSelected(1, 1, '1', '2', '3', '4', '5');
  });
});