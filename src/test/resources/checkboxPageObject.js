var CheckboxesPage = function () {

  this.get = function () {
    browser.get('');
  };

  this.onlyId = element(by.id('onlyId'));

  this.clickOnlyId = function () {
    this.onlyId.click();
  };

  this.onlyIdShouldBeSelected = function () {
    expect(this.onlyId.isSelected()).toBeTruthy();
  };

  this.onlyIdShouldNotBeSelected = function () {
    expect(this.onlyId.isSelected()).toBeFalsy();
  };

  this.onlyIdShouldBeVisible = function () {
    expect(this.onlyId.isDisplayed()).toBeTruthy();
  };

  this.onlyIdShouldNotBeVisible = function () {
    expect(this.onlyId.isDisplayed()).toBeFalsy();
  };

  this.onlyIdShouldBeEnabled = function () {
    expect(this.onlyId.isEnabled()).toBeTruthy();
  };

  this.onlyIdShouldNotBeEnabled = function () {
    expect(this.onlyId.isEnabled()).toBeFalsy();
  };

  this.onlyIdShouldHaveClass = function (className) {
    this.onlyId.getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) !== -1).toBeTruthy();
    });
  };

  this.onlyIdShouldNotHaveClass = function (className) {
    this.onlyId.getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) === -1).toBeTruthy();
    });
  };

  this.nameOverride = element(by.id('ignoredId'));

  this.clickNameOverride = function () {
    this.nameOverride.click();
  };

  this.nameOverrideShouldBeSelected = function () {
    expect(this.nameOverride.isSelected()).toBeTruthy();
  };

  this.nameOverrideShouldNotBeSelected = function () {
    expect(this.nameOverride.isSelected()).toBeFalsy();
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

  this.nameOverrideShouldHaveClass = function (className) {
    this.nameOverride.getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) !== -1).toBeTruthy();
    });
  };

  this.nameOverrideShouldNotHaveClass = function (className) {
    this.nameOverride.getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) === -1).toBeTruthy();
    });
  };

  this.onlyModel = element(by.model('onlyModel'));

  this.clickOnlyModel = function () {
    this.onlyModel.click();
  };

  this.onlyModelShouldBeSelected = function () {
    expect(this.onlyModel.isSelected()).toBeTruthy();
  };

  this.onlyModelShouldNotBeSelected = function () {
    expect(this.onlyModel.isSelected()).toBeFalsy();
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

  this.onlyModelShouldHaveClass = function (className) {
    this.onlyModel.getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) !== -1).toBeTruthy();
    });
  };

  this.onlyModelShouldNotHaveClass = function (className) {
    this.onlyModel.getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) === -1).toBeTruthy();
    });
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

  this.clickRepeatedCheckbox = function (rowIndex1) {
    this.items.get(rowIndex1).element(by.name('repeatedCheckbox')).click();
  };

  this.repeatedCheckboxShouldBeSelected = function (rowIndex1) {
    expect(this.items.get(rowIndex1).element(by.name('repeatedCheckbox')).isSelected()).toBeTruthy();
  };

  this.repeatedCheckboxShouldNotBeSelected = function (rowIndex1) {
    expect(this.items.get(rowIndex1).element(by.name('repeatedCheckbox')).isSelected()).toBeFalsy();
  };

  this.repeatedCheckboxShouldBeVisible = function (rowIndex1) {
    expect(this.items.get(rowIndex1).element(by.name('repeatedCheckbox')).isDisplayed()).toBeTruthy();
  };

  this.repeatedCheckboxShouldNotBeVisible = function (rowIndex1) {
    expect(this.items.get(rowIndex1).element(by.name('repeatedCheckbox')).isDisplayed()).toBeFalsy();
  };

  this.repeatedCheckboxShouldBeEnabled = function (rowIndex1) {
    expect(this.items.get(rowIndex1).element(by.name('repeatedCheckbox')).isEnabled()).toBeTruthy();
  };

  this.repeatedCheckboxShouldNotBeEnabled = function (rowIndex1) {
    expect(this.items.get(rowIndex1).element(by.name('repeatedCheckbox')).isEnabled()).toBeFalsy();
  };

  this.repeatedCheckboxShouldHaveClass = function (rowIndex1, className) {
    this.items.get(rowIndex1).element(by.name('repeatedCheckbox')).getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) !== -1).toBeTruthy();
    });
  };

  this.repeatedCheckboxShouldNotHaveClass = function (rowIndex1, className) {
    this.items.get(rowIndex1).element(by.name('repeatedCheckbox')).getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) === -1).toBeTruthy();
    });
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

  this.clickNestedRepeaterCheckbox = function (rowIndex1, rowIndex2) {
    this.items.get(rowIndex1).element(by.exactRepeater('element in elements').row(rowIndex2)).element(by.model('nestedRepeaterCheckbox')).click();
  };

  this.nestedRepeaterCheckboxShouldBeSelected = function (rowIndex1, rowIndex2) {
    expect(this.items.get(rowIndex1).element(by.exactRepeater('element in elements').row(rowIndex2)).element(by.model('nestedRepeaterCheckbox')).isSelected()).toBeTruthy();
  };

  this.nestedRepeaterCheckboxShouldNotBeSelected = function (rowIndex1, rowIndex2) {
    expect(this.items.get(rowIndex1).element(by.exactRepeater('element in elements').row(rowIndex2)).element(by.model('nestedRepeaterCheckbox')).isSelected()).toBeFalsy();
  };

  this.nestedRepeaterCheckboxShouldBeVisible = function (rowIndex1, rowIndex2) {
    expect(this.items.get(rowIndex1).element(by.exactRepeater('element in elements').row(rowIndex2)).element(by.model('nestedRepeaterCheckbox')).isDisplayed()).toBeTruthy();
  };

  this.nestedRepeaterCheckboxShouldNotBeVisible = function (rowIndex1, rowIndex2) {
    expect(this.items.get(rowIndex1).element(by.exactRepeater('element in elements').row(rowIndex2)).element(by.model('nestedRepeaterCheckbox')).isDisplayed()).toBeFalsy();
  };

  this.nestedRepeaterCheckboxShouldBeEnabled = function (rowIndex1, rowIndex2) {
    expect(this.items.get(rowIndex1).element(by.exactRepeater('element in elements').row(rowIndex2)).element(by.model('nestedRepeaterCheckbox')).isEnabled()).toBeTruthy();
  };

  this.nestedRepeaterCheckboxShouldNotBeEnabled = function (rowIndex1, rowIndex2) {
    expect(this.items.get(rowIndex1).element(by.exactRepeater('element in elements').row(rowIndex2)).element(by.model('nestedRepeaterCheckbox')).isEnabled()).toBeFalsy();
  };

  this.nestedRepeaterCheckboxShouldHaveClass = function (rowIndex1, rowIndex2, className) {
    this.items.get(rowIndex1).element(by.exactRepeater('element in elements').row(rowIndex2)).element(by.model('nestedRepeaterCheckbox')).getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) !== -1).toBeTruthy();
    });
  };

  this.nestedRepeaterCheckboxShouldNotHaveClass = function (rowIndex1, rowIndex2, className) {
    this.items.get(rowIndex1).element(by.exactRepeater('element in elements').row(rowIndex2)).element(by.model('nestedRepeaterCheckbox')).getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) === -1).toBeTruthy();
    });
  };

};

module.exports = new CheckboxesPage();