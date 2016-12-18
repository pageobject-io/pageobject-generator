var textAreaPage = require('../../../../target/test-classes/textareaPageObject.js');

describe('text areas', function () {

  beforeEach(function () {
    browser.get('http://localhost:3000/resources/textarea.html');
  });

  it('should generate functional text area methods', function () {
    textAreaPage.idModelShouldBeVisible();
    textAreaPage.idModelShouldBeEnabled();
    textAreaPage.shouldHaveIdModel('initialValue');
    textAreaPage.setIdModel('updatedValue');
    textAreaPage.shouldHaveIdModel('updatedValue');

    textAreaPage.nameOverrideShouldNotBeEnabled();

    textAreaPage.onlyModelShouldNotBeVisible();

    textAreaPage.shouldHaveRepeatedTextField(0, '');
    textAreaPage.shouldHaveRepeatedTextField(1, '');
    textAreaPage.setRepeatedTextField(0, 'value');
    textAreaPage.shouldHaveRepeatedTextField(0, 'value');
    textAreaPage.shouldHaveRepeatedTextField(1, '');
    textAreaPage.repeatedTextFieldShouldBeVisible(0);
    textAreaPage.repeatedTextFieldShouldBeVisible(1);
    textAreaPage.repeatedTextFieldShouldBeEnabled(0);
    textAreaPage.repeatedTextFieldShouldBeEnabled(1);

    textAreaPage.shouldHaveNestedRepeaterTextField(0, 0, '');
    textAreaPage.shouldHaveNestedRepeaterTextField(1, 1, '');
    textAreaPage.setNestedRepeaterTextField(0, 0, 'value');
    textAreaPage.shouldHaveNestedRepeaterTextField(0, 0, 'value');
    textAreaPage.shouldHaveNestedRepeaterTextField(1, 1, '');
    textAreaPage.nestedRepeaterTextFieldShouldBeVisible(0, 0);
    textAreaPage.nestedRepeaterTextFieldShouldBeVisible(1, 1);
    textAreaPage.nestedRepeaterTextFieldShouldBeEnabled(0, 0);
    textAreaPage.nestedRepeaterTextFieldShouldBeEnabled(1, 1);
  });
});