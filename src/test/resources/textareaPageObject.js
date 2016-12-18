var TextareaPage = function () {

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

module.exports = new TextareaPage();