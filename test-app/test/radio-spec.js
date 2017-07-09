var RadioPage = require('../../test/fixtures/radioPageObject.po');

describe('radios', function () {

  beforeEach(function () {
    browser.get('http://localhost:3000/radio.html');
  });

  it('should generate functional radio methods', function () {
    var radioPage = new RadioPage();

    radioPage.colorByIndexShouldBeVisible(0);
    radioPage.colorByIndexShouldBeVisible(1);
    radioPage.colorByIndexShouldBeVisible(2);
    radioPage.colorByIndexShouldBeEnabled(0);
    radioPage.colorByIndexShouldBeEnabled(1);
    radioPage.colorByIndexShouldBeEnabled(2);
    radioPage.colorByIndexShouldNotBeEnabled(3);

    radioPage.colorByIndexShouldNotBeSelected(0);
    radioPage.colorByIndexShouldNotBeSelected(1);
    radioPage.colorByIndexShouldNotBeSelected(2);
    radioPage.colorByValueShouldNotBeSelected('red');
    radioPage.colorByValueShouldNotBeSelected('yellow');
    radioPage.colorByValueShouldNotBeSelected('blue');

    radioPage.clickColorByIndex(0);
    radioPage.colorByIndexShouldBeSelected(0);
    radioPage.colorByValueShouldBeSelected('red');
    radioPage.colorByIndexShouldNotBeSelected(1);
    radioPage.colorByIndexShouldNotBeSelected(2);
    radioPage.colorByValueShouldNotBeSelected('yellow');
    radioPage.colorByValueShouldNotBeSelected('blue');

    radioPage.clickColorByIndex(1);
    radioPage.colorByIndexShouldNotBeSelected(0);
    radioPage.colorByIndexShouldBeSelected(1);
    radioPage.colorByValueShouldBeSelected('blue');
    radioPage.colorByIndexShouldNotBeSelected(2);
    radioPage.colorByValueShouldNotBeSelected('red');
    radioPage.colorByValueShouldNotBeSelected('yellow');

    radioPage.clickColorByValue('yellow');
    radioPage.colorByIndexShouldNotBeSelected(0);
    radioPage.colorByIndexShouldNotBeSelected(1);
    radioPage.colorByIndexShouldBeSelected(2);
    radioPage.colorByValueShouldBeSelected('yellow');
    radioPage.colorByValueShouldNotBeSelected('red');
    radioPage.colorByValueShouldNotBeSelected('blue');

    radioPage.clickColorByValue('red');
    radioPage.colorByIndexShouldBeSelected(0);
    radioPage.colorByValueShouldBeSelected('red');
    radioPage.colorByIndexShouldNotBeSelected(1);
    radioPage.colorByIndexShouldNotBeSelected(2);
    radioPage.colorByValueShouldNotBeSelected('yellow');
    radioPage.colorByValueShouldNotBeSelected('blue');

    radioPage.widthByIndexShouldBeVisible(0);
    radioPage.widthByIndexShouldBeVisible(1);
    radioPage.widthByIndexShouldNotBeVisible(2);
    radioPage.widthByIndexShouldBeEnabled(0);
    radioPage.widthByIndexShouldBeEnabled(1);
    radioPage.widthByIndexShouldBeEnabled(2);

    radioPage.widthByIndexShouldNotBeSelected(0);
    radioPage.widthByIndexShouldNotBeSelected(1);
    radioPage.widthByIndexShouldNotBeSelected(2);
    radioPage.widthByValueShouldNotBeSelected('10cm');
    radioPage.widthByValueShouldNotBeSelected('20cm');
    radioPage.widthByValueShouldNotBeSelected('30cm');

    radioPage.clickWidthByIndex(0);
    radioPage.widthByIndexShouldBeSelected(0);
    radioPage.widthByValueShouldBeSelected('10cm');
    radioPage.widthByIndexShouldNotBeSelected(1);
    radioPage.widthByIndexShouldNotBeSelected(2);
    radioPage.widthByValueShouldNotBeSelected('20cm');
    radioPage.widthByValueShouldNotBeSelected('30cm');

    radioPage.clickWidthByIndex(1);
    radioPage.widthByIndexShouldNotBeSelected(0);
    radioPage.widthByIndexShouldBeSelected(1);
    radioPage.widthByValueShouldBeSelected('20cm');
    radioPage.widthByIndexShouldNotBeSelected(2);
    radioPage.widthByValueShouldNotBeSelected('10cm');
    radioPage.widthByValueShouldNotBeSelected('30cm');

    radioPage.clickWidthByValue('10cm');
    radioPage.widthByIndexShouldNotBeSelected(1);
    radioPage.widthByIndexShouldNotBeSelected(2);
    radioPage.widthByIndexShouldBeSelected(0);
    radioPage.widthByValueShouldBeSelected('10cm');
    radioPage.widthByValueShouldNotBeSelected('20cm');
    radioPage.widthByValueShouldNotBeSelected('30cm');

    radioPage.clickWidthByValue('20cm');
    radioPage.widthByIndexShouldBeSelected(1);
    radioPage.widthByValueShouldBeSelected('20cm');
    radioPage.widthByIndexShouldNotBeSelected(0);
    radioPage.widthByIndexShouldNotBeSelected(2);
    radioPage.widthByValueShouldNotBeSelected('10cm');
    radioPage.widthByValueShouldNotBeSelected('30cm');

    radioPage.selectedItemByIndexShouldBeVisible(0);
    radioPage.selectedItemByIndexShouldBeVisible(1);
    radioPage.selectedItemByIndexShouldBeVisible(2);
    radioPage.selectedItemByIndexShouldBeEnabled(0);
    radioPage.selectedItemByIndexShouldBeEnabled(1);
    radioPage.selectedItemByIndexShouldBeEnabled(2);

    radioPage.selectedItemByIndexShouldNotBeSelected(0);
    radioPage.selectedItemByIndexShouldNotBeSelected(1);
    radioPage.selectedItemByIndexShouldNotBeSelected(2);
    radioPage.selectedItemByValueShouldNotBeSelected('1');
    radioPage.selectedItemByValueShouldNotBeSelected('2');
    radioPage.selectedItemByValueShouldNotBeSelected('3');

    radioPage.clickSelectedItemByIndex(0);
    radioPage.selectedItemByIndexShouldBeSelected(0);
    radioPage.selectedItemByValueShouldBeSelected('1');
    radioPage.selectedItemByIndexShouldNotBeSelected(1);
    radioPage.selectedItemByIndexShouldNotBeSelected(2);
    radioPage.selectedItemByValueShouldNotBeSelected('2');
    radioPage.selectedItemByValueShouldNotBeSelected('3');

    radioPage.clickSelectedItemByIndex(1);
    radioPage.selectedItemByIndexShouldNotBeSelected(0);
    radioPage.selectedItemByIndexShouldBeSelected(1);
    radioPage.selectedItemByValueShouldBeSelected('2');
    radioPage.selectedItemByIndexShouldNotBeSelected(2);
    radioPage.selectedItemByValueShouldNotBeSelected('1');
    radioPage.selectedItemByValueShouldNotBeSelected('3');

    radioPage.clickSelectedItemByValue('3');
    radioPage.selectedItemByIndexShouldNotBeSelected(0);
    radioPage.selectedItemByIndexShouldNotBeSelected(1);
    radioPage.selectedItemByIndexShouldBeSelected(2);
    radioPage.selectedItemByValueShouldBeSelected('3');
    radioPage.selectedItemByValueShouldNotBeSelected('1');
    radioPage.selectedItemByValueShouldNotBeSelected('2');

    radioPage.clickSelectedItemByValue('1');
    radioPage.selectedItemByIndexShouldBeSelected(0);
    radioPage.selectedItemByValueShouldBeSelected('1');
    radioPage.selectedItemByIndexShouldNotBeSelected(1);
    radioPage.selectedItemByIndexShouldNotBeSelected(2);
    radioPage.selectedItemByValueShouldNotBeSelected('2');
    radioPage.selectedItemByValueShouldNotBeSelected('3');

    radioPage.nestedRepeaterRadioFieldByIndexShouldBeVisible(0, 0);
    radioPage.nestedRepeaterRadioFieldByIndexShouldBeVisible(1, 1);
    radioPage.nestedRepeaterRadioFieldByIndexShouldBeVisible(2, 2);
    radioPage.nestedRepeaterRadioFieldByIndexShouldBeEnabled(0, 0);
    radioPage.nestedRepeaterRadioFieldByIndexShouldBeEnabled(1, 1);
    radioPage.nestedRepeaterRadioFieldByIndexShouldBeEnabled(2, 2);

    radioPage.nestedRepeaterRadioFieldByIndexShouldNotBeSelected(0, 0);
    radioPage.nestedRepeaterRadioFieldByIndexShouldNotBeSelected(1, 1);
    radioPage.nestedRepeaterRadioFieldByIndexShouldNotBeSelected(2, 2);
    radioPage.nestedRepeaterRadioFieldByValueShouldNotBeSelected(0, '1');
    radioPage.nestedRepeaterRadioFieldByValueShouldNotBeSelected(1, '2');
    radioPage.nestedRepeaterRadioFieldByValueShouldNotBeSelected(2, '3');

    radioPage.clickNestedRepeaterRadioFieldByIndex(0, 0);
    radioPage.clickNestedRepeaterRadioFieldByIndex(1, 1);
    radioPage.clickNestedRepeaterRadioFieldByIndex(2, 2);
    radioPage.nestedRepeaterRadioFieldByIndexShouldBeSelected(0, 0);
    radioPage.nestedRepeaterRadioFieldByIndexShouldBeSelected(1, 1);
    radioPage.nestedRepeaterRadioFieldByIndexShouldBeSelected(2, 2);
    radioPage.nestedRepeaterRadioFieldByValueShouldBeSelected(0, '1');
    radioPage.nestedRepeaterRadioFieldByValueShouldBeSelected(1, '2');
    radioPage.nestedRepeaterRadioFieldByValueShouldBeSelected(2, '3');
    radioPage.nestedRepeaterRadioFieldByIndexShouldNotBeSelected(0, 1);
    radioPage.nestedRepeaterRadioFieldByIndexShouldNotBeSelected(0, 2);
    radioPage.nestedRepeaterRadioFieldByIndexShouldNotBeSelected(1, 0);
    radioPage.nestedRepeaterRadioFieldByIndexShouldNotBeSelected(1, 2);
    radioPage.nestedRepeaterRadioFieldByIndexShouldNotBeSelected(2, 0);
    radioPage.nestedRepeaterRadioFieldByIndexShouldNotBeSelected(2, 1);
    radioPage.nestedRepeaterRadioFieldByValueShouldNotBeSelected(0, '2');
    radioPage.nestedRepeaterRadioFieldByValueShouldNotBeSelected(0, '3');
    radioPage.nestedRepeaterRadioFieldByValueShouldNotBeSelected(1, '1');
    radioPage.nestedRepeaterRadioFieldByValueShouldNotBeSelected(1, '3');
    radioPage.nestedRepeaterRadioFieldByValueShouldNotBeSelected(2, '1');
    radioPage.nestedRepeaterRadioFieldByValueShouldNotBeSelected(2, '2');

    radioPage.clickNestedRepeaterRadioFieldByIndex(0, 2);
    radioPage.clickNestedRepeaterRadioFieldByIndex(1, 0);
    radioPage.clickNestedRepeaterRadioFieldByIndex(2, 0);
    radioPage.nestedRepeaterRadioFieldByIndexShouldBeSelected(0, 2);
    radioPage.nestedRepeaterRadioFieldByIndexShouldBeSelected(1, 0);
    radioPage.nestedRepeaterRadioFieldByIndexShouldBeSelected(2, 0);
    radioPage.nestedRepeaterRadioFieldByValueShouldBeSelected(0, '3');
    radioPage.nestedRepeaterRadioFieldByValueShouldBeSelected(1, '1');
    radioPage.nestedRepeaterRadioFieldByValueShouldBeSelected(2, '1');
    radioPage.nestedRepeaterRadioFieldByIndexShouldNotBeSelected(0, 0);
    radioPage.nestedRepeaterRadioFieldByIndexShouldNotBeSelected(0, 1);
    radioPage.nestedRepeaterRadioFieldByIndexShouldNotBeSelected(1, 1);
    radioPage.nestedRepeaterRadioFieldByIndexShouldNotBeSelected(1, 2);
    radioPage.nestedRepeaterRadioFieldByIndexShouldNotBeSelected(2, 1);
    radioPage.nestedRepeaterRadioFieldByIndexShouldNotBeSelected(2, 2);
    radioPage.nestedRepeaterRadioFieldByValueShouldNotBeSelected(0, '1');
    radioPage.nestedRepeaterRadioFieldByValueShouldNotBeSelected(0, '2');
    radioPage.nestedRepeaterRadioFieldByValueShouldNotBeSelected(1, '2');
    radioPage.nestedRepeaterRadioFieldByValueShouldNotBeSelected(1, '3');
    radioPage.nestedRepeaterRadioFieldByValueShouldNotBeSelected(2, '2');
    radioPage.nestedRepeaterRadioFieldByValueShouldNotBeSelected(2, '3');

    radioPage.clickNestedRepeaterRadioFieldByValue(0, '1');
    radioPage.clickNestedRepeaterRadioFieldByValue(1, '2');
    radioPage.clickNestedRepeaterRadioFieldByValue(2, '3');
    radioPage.nestedRepeaterRadioFieldByIndexShouldBeSelected(0, 0);
    radioPage.nestedRepeaterRadioFieldByIndexShouldBeSelected(1, 1);
    radioPage.nestedRepeaterRadioFieldByIndexShouldBeSelected(2, 2);
    radioPage.nestedRepeaterRadioFieldByValueShouldBeSelected(0, '1');
    radioPage.nestedRepeaterRadioFieldByValueShouldBeSelected(1, '2');
    radioPage.nestedRepeaterRadioFieldByValueShouldBeSelected(2, '3');
    radioPage.nestedRepeaterRadioFieldByIndexShouldNotBeSelected(0, 1);
    radioPage.nestedRepeaterRadioFieldByIndexShouldNotBeSelected(0, 2);
    radioPage.nestedRepeaterRadioFieldByIndexShouldNotBeSelected(1, 0);
    radioPage.nestedRepeaterRadioFieldByIndexShouldNotBeSelected(1, 2);
    radioPage.nestedRepeaterRadioFieldByIndexShouldNotBeSelected(2, 0);
    radioPage.nestedRepeaterRadioFieldByIndexShouldNotBeSelected(2, 1);
    radioPage.nestedRepeaterRadioFieldByValueShouldNotBeSelected(0, '2');
    radioPage.nestedRepeaterRadioFieldByValueShouldNotBeSelected(0, '3');
    radioPage.nestedRepeaterRadioFieldByValueShouldNotBeSelected(1, '1');
    radioPage.nestedRepeaterRadioFieldByValueShouldNotBeSelected(1, '3');
    radioPage.nestedRepeaterRadioFieldByValueShouldNotBeSelected(2, '1');
    radioPage.nestedRepeaterRadioFieldByValueShouldNotBeSelected(2, '2');

    radioPage.clickNestedRepeaterRadioFieldByValue(0, '3');
    radioPage.clickNestedRepeaterRadioFieldByValue(1, '1');
    radioPage.clickNestedRepeaterRadioFieldByValue(2, '1');
    radioPage.nestedRepeaterRadioFieldByIndexShouldBeSelected(0, 2);
    radioPage.nestedRepeaterRadioFieldByIndexShouldBeSelected(1, 0);
    radioPage.nestedRepeaterRadioFieldByIndexShouldBeSelected(2, 0);
    radioPage.nestedRepeaterRadioFieldByValueShouldBeSelected(0, '3');
    radioPage.nestedRepeaterRadioFieldByValueShouldBeSelected(1, '1');
    radioPage.nestedRepeaterRadioFieldByValueShouldBeSelected(2, '1');
    radioPage.nestedRepeaterRadioFieldByIndexShouldNotBeSelected(0, 0);
    radioPage.nestedRepeaterRadioFieldByIndexShouldNotBeSelected(0, 1);
    radioPage.nestedRepeaterRadioFieldByIndexShouldNotBeSelected(1, 1);
    radioPage.nestedRepeaterRadioFieldByIndexShouldNotBeSelected(1, 2);
    radioPage.nestedRepeaterRadioFieldByIndexShouldNotBeSelected(2, 1);
    radioPage.nestedRepeaterRadioFieldByIndexShouldNotBeSelected(2, 2);
    radioPage.nestedRepeaterRadioFieldByValueShouldNotBeSelected(0, '1');
    radioPage.nestedRepeaterRadioFieldByValueShouldNotBeSelected(0, '2');
    radioPage.nestedRepeaterRadioFieldByValueShouldNotBeSelected(1, '2');
    radioPage.nestedRepeaterRadioFieldByValueShouldNotBeSelected(1, '3');
    radioPage.nestedRepeaterRadioFieldByValueShouldNotBeSelected(2, '2');
    radioPage.nestedRepeaterRadioFieldByValueShouldNotBeSelected(2, '3');

    radioPage.nested2RepeaterRadioField2ByIndexShouldBeVisible(0, 0, 0);
    radioPage.nested2RepeaterRadioField2ByIndexShouldBeVisible(1, 1, 1);
    radioPage.nested2RepeaterRadioField2ByIndexShouldBeVisible(2, 2, 0);
    radioPage.nested2RepeaterRadioField2ByIndexShouldBeEnabled(0, 0, 0);
    radioPage.nested2RepeaterRadioField2ByIndexShouldBeEnabled(1, 1, 1);
    radioPage.nested2RepeaterRadioField2ByIndexShouldBeEnabled(2, 2, 0);

    radioPage.nested2RepeaterRadioField2ByIndexShouldNotBeSelected(0, 0, 0);
    radioPage.nested2RepeaterRadioField2ByIndexShouldNotBeSelected(1, 1, 1);
    radioPage.nested2RepeaterRadioField2ByIndexShouldNotBeSelected(2, 2, 0);
    radioPage.nested2RepeaterRadioField2ByValueShouldNotBeSelected(0, 0, 'true');
    radioPage.nested2RepeaterRadioField2ByValueShouldNotBeSelected(1, 1, 'false');
    radioPage.nested2RepeaterRadioField2ByValueShouldNotBeSelected(2, 2, 'false');

    radioPage.clickNested2RepeaterRadioField2ByIndex(0, 0, 0);
    radioPage.clickNested2RepeaterRadioField2ByIndex(1, 1, 1);
    radioPage.clickNested2RepeaterRadioField2ByIndex(2, 2, 0);
    radioPage.nested2RepeaterRadioField2ByIndexShouldBeSelected(0, 0, 0);
    radioPage.nested2RepeaterRadioField2ByIndexShouldBeSelected(1, 1, 1);
    radioPage.nested2RepeaterRadioField2ByIndexShouldBeSelected(2, 2, 0);
    radioPage.nested2RepeaterRadioField2ByValueShouldBeSelected(0, 0, 'true');
    radioPage.nested2RepeaterRadioField2ByValueShouldBeSelected(1, 1, 'false');
    radioPage.nested2RepeaterRadioField2ByValueShouldBeSelected(2, 2, 'true');
    radioPage.nested2RepeaterRadioField2ByIndexShouldNotBeSelected(0, 0, 1);
    radioPage.nested2RepeaterRadioField2ByIndexShouldNotBeSelected(1, 1, 0);
    radioPage.nested2RepeaterRadioField2ByIndexShouldNotBeSelected(2, 2, 1);
    radioPage.nested2RepeaterRadioField2ByValueShouldNotBeSelected(0, 0, 'false');
    radioPage.nested2RepeaterRadioField2ByValueShouldNotBeSelected(1, 1, 'true');
    radioPage.nested2RepeaterRadioField2ByValueShouldNotBeSelected(2, 2, 'false');

    radioPage.clickNested2RepeaterRadioField2ByIndex(0, 0, 1);
    radioPage.clickNested2RepeaterRadioField2ByIndex(1, 1, 0);
    radioPage.clickNested2RepeaterRadioField2ByIndex(2, 2, 1);
    radioPage.nested2RepeaterRadioField2ByIndexShouldBeSelected(0, 0, 1);
    radioPage.nested2RepeaterRadioField2ByIndexShouldBeSelected(1, 1, 0);
    radioPage.nested2RepeaterRadioField2ByIndexShouldBeSelected(2, 2, 1);
    radioPage.nested2RepeaterRadioField2ByValueShouldBeSelected(0, 0, 'false');
    radioPage.nested2RepeaterRadioField2ByValueShouldBeSelected(1, 1, 'true');
    radioPage.nested2RepeaterRadioField2ByValueShouldBeSelected(2, 2, 'false');
    radioPage.nested2RepeaterRadioField2ByIndexShouldNotBeSelected(0, 0, 0);
    radioPage.nested2RepeaterRadioField2ByIndexShouldNotBeSelected(1, 1, 1);
    radioPage.nested2RepeaterRadioField2ByIndexShouldNotBeSelected(2, 2, 0);
    radioPage.nested2RepeaterRadioField2ByValueShouldNotBeSelected(0, 0, 'true');
    radioPage.nested2RepeaterRadioField2ByValueShouldNotBeSelected(1, 1, 'false');
    radioPage.nested2RepeaterRadioField2ByValueShouldNotBeSelected(2, 2, 'true');

    radioPage.clickNested2RepeaterRadioField2ByValue(0, 0, 'true');
    radioPage.clickNested2RepeaterRadioField2ByValue(1, 1, 'false');
    radioPage.clickNested2RepeaterRadioField2ByValue(2, 2, 'true');
    radioPage.nested2RepeaterRadioField2ByIndexShouldBeSelected(0, 0, 0);
    radioPage.nested2RepeaterRadioField2ByIndexShouldBeSelected(1, 1, 1);
    radioPage.nested2RepeaterRadioField2ByIndexShouldBeSelected(2, 2, 0);
    radioPage.nested2RepeaterRadioField2ByValueShouldBeSelected(0, 0, 'true');
    radioPage.nested2RepeaterRadioField2ByValueShouldBeSelected(1, 1, 'false');
    radioPage.nested2RepeaterRadioField2ByValueShouldBeSelected(2, 2, 'true');
    radioPage.nested2RepeaterRadioField2ByIndexShouldNotBeSelected(0, 0, 1);
    radioPage.nested2RepeaterRadioField2ByIndexShouldNotBeSelected(1, 1, 0);
    radioPage.nested2RepeaterRadioField2ByIndexShouldNotBeSelected(2, 2, 1);
    radioPage.nested2RepeaterRadioField2ByValueShouldNotBeSelected(0, 0, 'false');
    radioPage.nested2RepeaterRadioField2ByValueShouldNotBeSelected(1, 1, 'true');
    radioPage.nested2RepeaterRadioField2ByValueShouldNotBeSelected(2, 2, 'false');

    radioPage.clickNested2RepeaterRadioField2ByValue(0, 0, 'false');
    radioPage.clickNested2RepeaterRadioField2ByValue(1, 1, 'true');
    radioPage.clickNested2RepeaterRadioField2ByValue(2, 2, 'false');
    radioPage.nested2RepeaterRadioField2ByIndexShouldBeSelected(0, 0, 1);
    radioPage.nested2RepeaterRadioField2ByIndexShouldBeSelected(1, 1, 0);
    radioPage.nested2RepeaterRadioField2ByIndexShouldBeSelected(2, 2, 1);
    radioPage.nested2RepeaterRadioField2ByValueShouldBeSelected(0, 0, 'false');
    radioPage.nested2RepeaterRadioField2ByValueShouldBeSelected(1, 1, 'true');
    radioPage.nested2RepeaterRadioField2ByValueShouldBeSelected(2, 2, 'false');
    radioPage.nested2RepeaterRadioField2ByIndexShouldNotBeSelected(0, 0, 0);
    radioPage.nested2RepeaterRadioField2ByIndexShouldNotBeSelected(1, 1, 1);
    radioPage.nested2RepeaterRadioField2ByIndexShouldNotBeSelected(2, 2, 0);
    radioPage.nested2RepeaterRadioField2ByValueShouldNotBeSelected(0, 0, 'true');
    radioPage.nested2RepeaterRadioField2ByValueShouldNotBeSelected(1, 1, 'false');
    radioPage.nested2RepeaterRadioField2ByValueShouldNotBeSelected(2, 2, 'true');

    radioPage.selected2ItemByIndexShouldBeVisible(0, 0);
    radioPage.selected2ItemByIndexShouldBeVisible(1, 1);
    radioPage.selected2ItemByIndexShouldBeVisible(2, 0);
    radioPage.selected2ItemByIndexShouldBeEnabled(0, 0);
    radioPage.selected2ItemByIndexShouldBeEnabled(1, 1);
    radioPage.selected2ItemByIndexShouldBeEnabled(2, 0);

    radioPage.selected2ItemByIndexShouldNotBeSelected(0, 0);
    radioPage.selected2ItemByIndexShouldNotBeSelected(1, 1);
    radioPage.selected2ItemByIndexShouldNotBeSelected(2, 0);
    radioPage.selected2ItemByValueShouldNotBeSelected(0, 'true');
    radioPage.selected2ItemByValueShouldNotBeSelected(1, 'false');
    radioPage.selected2ItemByValueShouldNotBeSelected(2, 'true');

    radioPage.clickSelected2ItemByIndex(0, 0);
    radioPage.clickSelected2ItemByIndex(1, 1);
    radioPage.clickSelected2ItemByIndex(2, 0);
    radioPage.selected2ItemByIndexShouldBeSelected(0, 0);
    radioPage.selected2ItemByIndexShouldBeSelected(1, 1);
    radioPage.selected2ItemByIndexShouldBeSelected(2, 0);
    radioPage.selected2ItemByValueShouldBeSelected(0, 'true');
    radioPage.selected2ItemByValueShouldBeSelected(1, 'false');
    radioPage.selected2ItemByValueShouldBeSelected(2, 'true');
    radioPage.selected2ItemByIndexShouldNotBeSelected(0, 1);
    radioPage.selected2ItemByIndexShouldNotBeSelected(1, 0);
    radioPage.selected2ItemByIndexShouldNotBeSelected(2, 1);
    radioPage.selected2ItemByValueShouldNotBeSelected(0, 'false');
    radioPage.selected2ItemByValueShouldNotBeSelected(1, 'true');
    radioPage.selected2ItemByValueShouldNotBeSelected(2, 'false');

    radioPage.clickSelected2ItemByIndex(0, 1);
    radioPage.clickSelected2ItemByIndex(1, 0);
    radioPage.clickSelected2ItemByIndex(2, 1);
    radioPage.selected2ItemByIndexShouldBeSelected(0, 1);
    radioPage.selected2ItemByIndexShouldBeSelected(1, 0);
    radioPage.selected2ItemByIndexShouldBeSelected(2, 1);
    radioPage.selected2ItemByValueShouldBeSelected(0, 'false');
    radioPage.selected2ItemByValueShouldBeSelected(1, 'true');
    radioPage.selected2ItemByValueShouldBeSelected(2, 'false');
    radioPage.selected2ItemByIndexShouldNotBeSelected(0, 0);
    radioPage.selected2ItemByIndexShouldNotBeSelected(1, 1);
    radioPage.selected2ItemByIndexShouldNotBeSelected(2, 0);
    radioPage.selected2ItemByValueShouldNotBeSelected(0, 'true');
    radioPage.selected2ItemByValueShouldNotBeSelected(1, 'false');
    radioPage.selected2ItemByValueShouldNotBeSelected(2, 'true');

    radioPage.clickSelected2ItemByValue(0, 'true');
    radioPage.clickSelected2ItemByValue(1, 'false');
    radioPage.clickSelected2ItemByValue(2, 'true');
    radioPage.selected2ItemByIndexShouldBeSelected(0, 0);
    radioPage.selected2ItemByIndexShouldBeSelected(1, 1);
    radioPage.selected2ItemByIndexShouldBeSelected(2, 0);
    radioPage.selected2ItemByValueShouldBeSelected(0, 'true');
    radioPage.selected2ItemByValueShouldBeSelected(1, 'false');
    radioPage.selected2ItemByValueShouldBeSelected(2, 'true');
    radioPage.selected2ItemByIndexShouldNotBeSelected(0, 1);
    radioPage.selected2ItemByIndexShouldNotBeSelected(1, 0);
    radioPage.selected2ItemByIndexShouldNotBeSelected(2, 1);
    radioPage.selected2ItemByValueShouldNotBeSelected(0, 'false');
    radioPage.selected2ItemByValueShouldNotBeSelected(1, 'true');
    radioPage.selected2ItemByValueShouldNotBeSelected(2, 'false');

    radioPage.clickSelected2ItemByValue(0, 'false');
    radioPage.clickSelected2ItemByValue(1, 'true');
    radioPage.clickSelected2ItemByValue(2, 'false');
    radioPage.selected2ItemByIndexShouldBeSelected(0, 1);
    radioPage.selected2ItemByIndexShouldBeSelected(1, 0);
    radioPage.selected2ItemByIndexShouldBeSelected(2, 1);
    radioPage.selected2ItemByValueShouldBeSelected(0, 'false');
    radioPage.selected2ItemByValueShouldBeSelected(1, 'true');
    radioPage.selected2ItemByValueShouldBeSelected(2, 'false');
    radioPage.selected2ItemByIndexShouldNotBeSelected(0, 0);
    radioPage.selected2ItemByIndexShouldNotBeSelected(1, 1);
    radioPage.selected2ItemByIndexShouldNotBeSelected(2, 0);
    radioPage.selected2ItemByValueShouldNotBeSelected(0, 'true');
    radioPage.selected2ItemByValueShouldNotBeSelected(1, 'false');
    radioPage.selected2ItemByValueShouldNotBeSelected(2, 'true');
  });
});