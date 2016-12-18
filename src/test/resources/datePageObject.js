var DatePage = function () {

  this.get = function () {
    browser.get('');
  };

  this.dateField = element(by.name('dateField'));

  this.setDateField = function (value) {
    // https://github.com/angular/protractor/issues/562
    var element = this.dateField;
    element.getAttribute('value').then(function (text) {
      var backspaceSeries = Array(text.length + 1).join(protractor.Key.BACK_SPACE);
      element.sendKeys(backspaceSeries);
      element.sendKeys(value);
    });
  };

  this.shouldHaveDateField = function (value) {
    expect(this.dateField.getAttribute('value')).toEqual(value);
  };

  this.dateFieldShouldBeVisible = function () {
    expect(this.dateField.isDisplayed()).toBeTruthy();
  };

  this.dateFieldShouldNotBeVisible = function () {
    expect(this.dateField.isDisplayed()).toBeFalsy();
  };

  this.dateFieldShouldBeEnabled = function () {
    expect(this.dateField.isEnabled()).toBeTruthy();
  };

  this.dateFieldShouldNotBeEnabled = function () {
    expect(this.dateField.isEnabled()).toBeFalsy();
  };

  this.dateFieldShouldHaveClass = function (className) {
    this.dateField.getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) !== -1).toBeTruthy();
    });
  };

  this.dateFieldShouldNotHaveClass = function (className) {
    this.dateField.getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) === -1).toBeTruthy();
    });
  };

  this.timeField = element(by.name('timeField'));

  this.setTimeField = function (value) {
    // https://github.com/angular/protractor/issues/562
    var element = this.timeField;
    element.getAttribute('value').then(function (text) {
      var backspaceSeries = Array(text.length + 1).join(protractor.Key.BACK_SPACE);
      element.sendKeys(backspaceSeries);
      element.sendKeys(value);
    });
  };

  this.shouldHaveTimeField = function (value) {
    expect(this.timeField.getAttribute('value')).toEqual(value);
  };

  this.timeFieldShouldBeVisible = function () {
    expect(this.timeField.isDisplayed()).toBeTruthy();
  };

  this.timeFieldShouldNotBeVisible = function () {
    expect(this.timeField.isDisplayed()).toBeFalsy();
  };

  this.timeFieldShouldBeEnabled = function () {
    expect(this.timeField.isEnabled()).toBeTruthy();
  };

  this.timeFieldShouldNotBeEnabled = function () {
    expect(this.timeField.isEnabled()).toBeFalsy();
  };

  this.timeFieldShouldHaveClass = function (className) {
    this.timeField.getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) !== -1).toBeTruthy();
    });
  };

  this.timeFieldShouldNotHaveClass = function (className) {
    this.timeField.getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) === -1).toBeTruthy();
    });
  };

  this.dateTimeLocalField = element(by.name('dateTimeLocalField'));

  this.setDateTimeLocalField = function (value) {
    // https://github.com/angular/protractor/issues/562
    var element = this.dateTimeLocalField;
    element.getAttribute('value').then(function (text) {
      var backspaceSeries = Array(text.length + 1).join(protractor.Key.BACK_SPACE);
      element.sendKeys(backspaceSeries);
      element.sendKeys(value);
    });
  };

  this.shouldHaveDateTimeLocalField = function (value) {
    expect(this.dateTimeLocalField.getAttribute('value')).toEqual(value);
  };

  this.dateTimeLocalFieldShouldBeVisible = function () {
    expect(this.dateTimeLocalField.isDisplayed()).toBeTruthy();
  };

  this.dateTimeLocalFieldShouldNotBeVisible = function () {
    expect(this.dateTimeLocalField.isDisplayed()).toBeFalsy();
  };

  this.dateTimeLocalFieldShouldBeEnabled = function () {
    expect(this.dateTimeLocalField.isEnabled()).toBeTruthy();
  };

  this.dateTimeLocalFieldShouldNotBeEnabled = function () {
    expect(this.dateTimeLocalField.isEnabled()).toBeFalsy();
  };

  this.dateTimeLocalFieldShouldHaveClass = function (className) {
    this.dateTimeLocalField.getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) !== -1).toBeTruthy();
    });
  };

  this.dateTimeLocalFieldShouldNotHaveClass = function (className) {
    this.dateTimeLocalField.getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) === -1).toBeTruthy();
    });
  };

  this.dateTimeField = element(by.name('dateTimeField'));

  this.setDateTimeField = function (value) {
    // https://github.com/angular/protractor/issues/562
    var element = this.dateTimeField;
    element.getAttribute('value').then(function (text) {
      var backspaceSeries = Array(text.length + 1).join(protractor.Key.BACK_SPACE);
      element.sendKeys(backspaceSeries);
      element.sendKeys(value);
    });
  };

  this.shouldHaveDateTimeField = function (value) {
    expect(this.dateTimeField.getAttribute('value')).toEqual(value);
  };

  this.dateTimeFieldShouldBeVisible = function () {
    expect(this.dateTimeField.isDisplayed()).toBeTruthy();
  };

  this.dateTimeFieldShouldNotBeVisible = function () {
    expect(this.dateTimeField.isDisplayed()).toBeFalsy();
  };

  this.dateTimeFieldShouldBeEnabled = function () {
    expect(this.dateTimeField.isEnabled()).toBeTruthy();
  };

  this.dateTimeFieldShouldNotBeEnabled = function () {
    expect(this.dateTimeField.isEnabled()).toBeFalsy();
  };

  this.dateTimeFieldShouldHaveClass = function (className) {
    this.dateTimeField.getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) !== -1).toBeTruthy();
    });
  };

  this.dateTimeFieldShouldNotHaveClass = function (className) {
    this.dateTimeField.getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) === -1).toBeTruthy();
    });
  };

  this.monthField = element(by.name('monthField'));

  this.setMonthField = function (value) {
    // https://github.com/angular/protractor/issues/562
    var element = this.monthField;
    element.getAttribute('value').then(function (text) {
      var backspaceSeries = Array(text.length + 1).join(protractor.Key.BACK_SPACE);
      element.sendKeys(backspaceSeries);
      element.sendKeys(value);
    });
  };

  this.shouldHaveMonthField = function (value) {
    expect(this.monthField.getAttribute('value')).toEqual(value);
  };

  this.monthFieldShouldBeVisible = function () {
    expect(this.monthField.isDisplayed()).toBeTruthy();
  };

  this.monthFieldShouldNotBeVisible = function () {
    expect(this.monthField.isDisplayed()).toBeFalsy();
  };

  this.monthFieldShouldBeEnabled = function () {
    expect(this.monthField.isEnabled()).toBeTruthy();
  };

  this.monthFieldShouldNotBeEnabled = function () {
    expect(this.monthField.isEnabled()).toBeFalsy();
  };

  this.monthFieldShouldHaveClass = function (className) {
    this.monthField.getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) !== -1).toBeTruthy();
    });
  };

  this.monthFieldShouldNotHaveClass = function (className) {
    this.monthField.getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) === -1).toBeTruthy();
    });
  };

  this.weekField = element(by.name('weekField'));

  this.setWeekField = function (value) {
    // https://github.com/angular/protractor/issues/562
    var element = this.weekField;
    element.getAttribute('value').then(function (text) {
      var backspaceSeries = Array(text.length + 1).join(protractor.Key.BACK_SPACE);
      element.sendKeys(backspaceSeries);
      element.sendKeys(value);
    });
  };

  this.shouldHaveWeekField = function (value) {
    expect(this.weekField.getAttribute('value')).toEqual(value);
  };

  this.weekFieldShouldBeVisible = function () {
    expect(this.weekField.isDisplayed()).toBeTruthy();
  };

  this.weekFieldShouldNotBeVisible = function () {
    expect(this.weekField.isDisplayed()).toBeFalsy();
  };

  this.weekFieldShouldBeEnabled = function () {
    expect(this.weekField.isEnabled()).toBeTruthy();
  };

  this.weekFieldShouldNotBeEnabled = function () {
    expect(this.weekField.isEnabled()).toBeFalsy();
  };

  this.weekFieldShouldHaveClass = function (className) {
    this.weekField.getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) !== -1).toBeTruthy();
    });
  };

  this.weekFieldShouldNotHaveClass = function (className) {
    this.weekField.getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) === -1).toBeTruthy();
    });
  };

};

module.exports = new DatePage();