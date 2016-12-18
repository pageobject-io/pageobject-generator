var textPage = require('../../../../target/test-classes/textPageObject.js');

describe('text fields', function () {

  beforeEach(function () {
    browser.get('http://localhost:3000/resources/text.html');
  });

  it('should generate functional text field methods', function () {
    textPage.idModelShouldBeVisible();
    textPage.idModelShouldBeEnabled();
    textPage.shouldHaveIdModel('initialValue');
    textPage.setIdModel('updatedValue');
    textPage.shouldHaveIdModel('updatedValue');

    textPage.nameOverrideShouldNotBeEnabled();

    textPage.onlyModelShouldNotBeVisible();

    textPage.shouldHaveTelField('');
    textPage.setTelField('value');
    textPage.shouldHaveTelField('value');
    textPage.setTelField('');
    textPage.shouldHaveTelField('');

    textPage.shouldHaveSearchField('');
    textPage.setSearchField('value');
    textPage.shouldHaveSearchField('value');
    textPage.setSearchField('');
    textPage.shouldHaveSearchField('');

    textPage.shouldHaveUrlField('');
    textPage.setUrlField('value');
    textPage.shouldHaveUrlField('value');
    textPage.setUrlField('');
    textPage.shouldHaveUrlField('');

    textPage.shouldHaveEmailField('');
    textPage.setEmailField('value');
    textPage.shouldHaveEmailField('value');
    textPage.setEmailField('');
    textPage.shouldHaveEmailField('');

    textPage.shouldHavePasswordField('');
    textPage.setPasswordField('value');
    textPage.shouldHavePasswordField('value');
    textPage.setPasswordField('');
    textPage.shouldHavePasswordField('');

    textPage.shouldHaveNumberField('');
    textPage.setNumberField('12');
    textPage.shouldHaveNumberField('12');
    textPage.setNumberField('');
    textPage.shouldHaveNumberField('');

    textPage.shouldHaveRepeatedTextField(0, '');
    textPage.shouldHaveRepeatedTextField(1, '');
    textPage.setRepeatedTextField(0, 'value');
    textPage.shouldHaveRepeatedTextField(0, 'value');
    textPage.shouldHaveRepeatedTextField(1, '');
    textPage.repeatedTextFieldShouldBeVisible(0);
    textPage.repeatedTextFieldShouldBeVisible(1);
    textPage.repeatedTextFieldShouldBeEnabled(0);
    textPage.repeatedTextFieldShouldBeEnabled(1);

    textPage.shouldHaveNestedRepeaterTextField(0, 0, '');
    textPage.shouldHaveNestedRepeaterTextField(1, 1, '');
    textPage.setNestedRepeaterTextField(0, 0, 'value');
    textPage.shouldHaveNestedRepeaterTextField(0, 0, 'value');
    textPage.shouldHaveNestedRepeaterTextField(1, 1, '');
    textPage.nestedRepeaterTextFieldShouldBeVisible(0, 0);
    textPage.nestedRepeaterTextFieldShouldBeVisible(1, 1);
    textPage.nestedRepeaterTextFieldShouldBeEnabled(0, 0);
    textPage.nestedRepeaterTextFieldShouldBeEnabled(1, 1);
  });
});