var TextPage = function () {

  this.get = function () {
    browser.get('');
  };

  this.idModel = element(by.id('onlyId'));

  this.setIdModel = function (value) {
    this.idModel.clear();
    this.idModel.sendKeys(value);
  };

  this.shouldHaveIdModel = function (value) {
    expect(this.idModel.getAttribute('value')).toEqual(value);
  };

  this.idModelShouldBeVisible = function () {
    expect(this.idModel.isDisplayed()).toBeTruthy();
  };

  this.idModelShouldNotBeVisible = function () {
    expect(this.idModel.isDisplayed()).toBeFalsy();
  };

  this.idModelShouldBeEnabled = function () {
    expect(this.idModel.isEnabled()).toBeTruthy();
  };

  this.idModelShouldNotBeEnabled = function () {
    expect(this.idModel.isEnabled()).toBeFalsy();
  };

  this.nameOverride = element(by.id('ignoredId'));

  this.setNameOverride = function (value) {
    this.nameOverride.clear();
    this.nameOverride.sendKeys(value);
  };

  this.shouldHaveNameOverride = function (value) {
    expect(this.nameOverride.getAttribute('value')).toEqual(value);
  };

  this.nameOverrideShouldBeVisible = function () {
    expect(this.nameOverride.isDisplayed()).toBeTruthy();
  };

  this.nameOverrideShouldNotBeVisible = function () {
    expect(this.nameOverride.isDisplayed()).toBeFalsy();
  };

  this.nameOverrideShouldBeEnabled = function () {
    expect(this.nameOverride.isEnabled()).toBeTruthy();
  };

  this.nameOverrideShouldNotBeEnabled = function () {
    expect(this.nameOverride.isEnabled()).toBeFalsy();
  };

  this.onlyModel = element(by.model('onlyModel'));

  this.setOnlyModel = function (value) {
    this.onlyModel.clear();
    this.onlyModel.sendKeys(value);
  };

  this.shouldHaveOnlyModel = function (value) {
    expect(this.onlyModel.getAttribute('value')).toEqual(value);
  };

  this.onlyModelShouldBeVisible = function () {
    expect(this.onlyModel.isDisplayed()).toBeTruthy();
  };

  this.onlyModelShouldNotBeVisible = function () {
    expect(this.onlyModel.isDisplayed()).toBeFalsy();
  };

  this.onlyModelShouldBeEnabled = function () {
    expect(this.onlyModel.isEnabled()).toBeTruthy();
  };

  this.onlyModelShouldNotBeEnabled = function () {
    expect(this.onlyModel.isEnabled()).toBeFalsy();
  };

  this.telField = element(by.name('telField'));

  this.setTelField = function (value) {
    this.telField.clear();
    this.telField.sendKeys(value);
  };

  this.shouldHaveTelField = function (value) {
    expect(this.telField.getAttribute('value')).toEqual(value);
  };

  this.telFieldShouldBeVisible = function () {
    expect(this.telField.isDisplayed()).toBeTruthy();
  };

  this.telFieldShouldNotBeVisible = function () {
    expect(this.telField.isDisplayed()).toBeFalsy();
  };

  this.telFieldShouldBeEnabled = function () {
    expect(this.telField.isEnabled()).toBeTruthy();
  };

  this.telFieldShouldNotBeEnabled = function () {
    expect(this.telField.isEnabled()).toBeFalsy();
  };

  this.searchField = element(by.name('searchField'));

  this.setSearchField = function (value) {
    this.searchField.clear();
    this.searchField.sendKeys(value);
  };

  this.shouldHaveSearchField = function (value) {
    expect(this.searchField.getAttribute('value')).toEqual(value);
  };

  this.searchFieldShouldBeVisible = function () {
    expect(this.searchField.isDisplayed()).toBeTruthy();
  };

  this.searchFieldShouldNotBeVisible = function () {
    expect(this.searchField.isDisplayed()).toBeFalsy();
  };

  this.searchFieldShouldBeEnabled = function () {
    expect(this.searchField.isEnabled()).toBeTruthy();
  };

  this.searchFieldShouldNotBeEnabled = function () {
    expect(this.searchField.isEnabled()).toBeFalsy();
  };

  this.urlField = element(by.name('urlField'));

  this.setUrlField = function (value) {
    this.urlField.clear();
    this.urlField.sendKeys(value);
  };

  this.shouldHaveUrlField = function (value) {
    expect(this.urlField.getAttribute('value')).toEqual(value);
  };

  this.urlFieldShouldBeVisible = function () {
    expect(this.urlField.isDisplayed()).toBeTruthy();
  };

  this.urlFieldShouldNotBeVisible = function () {
    expect(this.urlField.isDisplayed()).toBeFalsy();
  };

  this.urlFieldShouldBeEnabled = function () {
    expect(this.urlField.isEnabled()).toBeTruthy();
  };

  this.urlFieldShouldNotBeEnabled = function () {
    expect(this.urlField.isEnabled()).toBeFalsy();
  };

  this.emailField = element(by.name('emailField'));

  this.setEmailField = function (value) {
    this.emailField.clear();
    this.emailField.sendKeys(value);
  };

  this.shouldHaveEmailField = function (value) {
    expect(this.emailField.getAttribute('value')).toEqual(value);
  };

  this.emailFieldShouldBeVisible = function () {
    expect(this.emailField.isDisplayed()).toBeTruthy();
  };

  this.emailFieldShouldNotBeVisible = function () {
    expect(this.emailField.isDisplayed()).toBeFalsy();
  };

  this.emailFieldShouldBeEnabled = function () {
    expect(this.emailField.isEnabled()).toBeTruthy();
  };

  this.emailFieldShouldNotBeEnabled = function () {
    expect(this.emailField.isEnabled()).toBeFalsy();
  };

  this.passwordField = element(by.name('passwordField'));

  this.setPasswordField = function (value) {
    this.passwordField.clear();
    this.passwordField.sendKeys(value);
  };

  this.shouldHavePasswordField = function (value) {
    expect(this.passwordField.getAttribute('value')).toEqual(value);
  };

  this.passwordFieldShouldBeVisible = function () {
    expect(this.passwordField.isDisplayed()).toBeTruthy();
  };

  this.passwordFieldShouldNotBeVisible = function () {
    expect(this.passwordField.isDisplayed()).toBeFalsy();
  };

  this.passwordFieldShouldBeEnabled = function () {
    expect(this.passwordField.isEnabled()).toBeTruthy();
  };

  this.passwordFieldShouldNotBeEnabled = function () {
    expect(this.passwordField.isEnabled()).toBeFalsy();
  };

  this.numberField = element(by.name('numberField'));

  this.setNumberField = function (value) {
    this.numberField.clear();
    this.numberField.sendKeys(value);
  };

  this.shouldHaveNumberField = function (value) {
    expect(this.numberField.getAttribute('value')).toEqual(value);
  };

  this.numberFieldShouldBeVisible = function () {
    expect(this.numberField.isDisplayed()).toBeTruthy();
  };

  this.numberFieldShouldNotBeVisible = function () {
    expect(this.numberField.isDisplayed()).toBeFalsy();
  };

  this.numberFieldShouldBeEnabled = function () {
    expect(this.numberField.isEnabled()).toBeTruthy();
  };

  this.numberFieldShouldNotBeEnabled = function () {
    expect(this.numberField.isEnabled()).toBeFalsy();
  };

  this.items = element.all(by.exactRepeater('item in items'));

  this.itemsCountShouldBe = function (count) {
    expect(this.items.count()).toBe(count);
  };

  this.itemsShouldHaveText = function (rowIndex1, value) {
    expect(this.items.get(rowIndex1).getText()).toBe(value);
  };

  this.itemsShouldHaveClass = function (rowIndex1, className) {
    this.items.get(rowIndex1).getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) !== -1).toBeTruthy();
    });
  };

  this.itemsShouldNotHaveClass = function (rowIndex1, className) {
    this.items.get(rowIndex1).getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) === -1).toBeTruthy();
    });
  };

  this.setRepeatedTextField = function (rowIndex1, value) {
    this.items.get(rowIndex1).element(by.name('repeatedTextField')).clear();
    this.items.get(rowIndex1).element(by.name('repeatedTextField')).sendKeys(value);
  };

  this.shouldHaveRepeatedTextField = function (rowIndex1, value) {
    expect(this.items.get(rowIndex1).element(by.name('repeatedTextField')).getAttribute('value')).toEqual(value);
  };

  this.repeatedTextFieldShouldBeVisible = function (rowIndex1) {
    expect(this.items.get(rowIndex1).element(by.name('repeatedTextField')).isDisplayed()).toBeTruthy();
  };

  this.repeatedTextFieldShouldNotBeVisible = function (rowIndex1) {
    expect(this.items.get(rowIndex1).element(by.name('repeatedTextField')).isDisplayed()).toBeFalsy();
  };

  this.repeatedTextFieldShouldBeEnabled = function (rowIndex1) {
    expect(this.items.get(rowIndex1).element(by.name('repeatedTextField')).isEnabled()).toBeTruthy();
  };

  this.repeatedTextFieldShouldNotBeEnabled = function (rowIndex1) {
    expect(this.items.get(rowIndex1).element(by.name('repeatedTextField')).isEnabled()).toBeFalsy();
  };

  this.elementsCountShouldBe = function (rowIndex1, count) {
    expect(this.items.get(rowIndex1).all(by.exactRepeater('element in elements')).count()).toBe(count);
  };

  this.elementsShouldHaveText = function (rowIndex1, rowIndex2, value) {
    expect(this.items.get(rowIndex1).element(by.exactRepeater('element in elements').row(rowIndex2)).getText()).toBe(value);
  };

  this.elementsShouldHaveClass = function (rowIndex1, rowIndex2, className) {
    this.items.get(rowIndex1).element(by.exactRepeater('element in elements').row(rowIndex2)).getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) !== -1).toBeTruthy();
    });
  };

  this.elementsShouldNotHaveClass = function (rowIndex1, rowIndex2, className) {
    this.items.get(rowIndex1).element(by.exactRepeater('element in elements').row(rowIndex2)).getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) === -1).toBeTruthy();
    });
  };

  this.setNestedRepeaterTextField = function (rowIndex1, rowIndex2, value) {
    this.items.get(rowIndex1).element(by.exactRepeater('element in elements').row(rowIndex2)).element(by.model('nestedRepeaterTextField')).clear();
    this.items.get(rowIndex1).element(by.exactRepeater('element in elements').row(rowIndex2)).element(by.model('nestedRepeaterTextField')).sendKeys(value);
  };

  this.shouldHaveNestedRepeaterTextField = function (rowIndex1, rowIndex2, value) {
    expect(this.items.get(rowIndex1).element(by.exactRepeater('element in elements').row(rowIndex2)).element(by.model('nestedRepeaterTextField')).getAttribute('value')).toEqual(value);
  };

  this.nestedRepeaterTextFieldShouldBeVisible = function (rowIndex1, rowIndex2) {
    expect(this.items.get(rowIndex1).element(by.exactRepeater('element in elements').row(rowIndex2)).element(by.model('nestedRepeaterTextField')).isDisplayed()).toBeTruthy();
  };

  this.nestedRepeaterTextFieldShouldNotBeVisible = function (rowIndex1, rowIndex2) {
    expect(this.items.get(rowIndex1).element(by.exactRepeater('element in elements').row(rowIndex2)).element(by.model('nestedRepeaterTextField')).isDisplayed()).toBeFalsy();
  };

  this.nestedRepeaterTextFieldShouldBeEnabled = function (rowIndex1, rowIndex2) {
    expect(this.items.get(rowIndex1).element(by.exactRepeater('element in elements').row(rowIndex2)).element(by.model('nestedRepeaterTextField')).isEnabled()).toBeTruthy();
  };

  this.nestedRepeaterTextFieldShouldNotBeEnabled = function (rowIndex1, rowIndex2) {
    expect(this.items.get(rowIndex1).element(by.exactRepeater('element in elements').row(rowIndex2)).element(by.model('nestedRepeaterTextField')).isEnabled()).toBeFalsy();
  };

};

module.exports = new TextPage();