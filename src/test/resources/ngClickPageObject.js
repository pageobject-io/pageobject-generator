var NgclickPage = function () {

  this.get = function () {
    browser.get('');
  };

  this.idDiv = element(by.id('id-div'));

  this.clickIdDiv = function () {
    this.idDiv.click();
  };

  this.idDivShouldBeVisible = function () {
    expect(this.idDiv.isDisplayed()).toBeTruthy();
  };

  this.idDivShouldNotBeVisible = function () {
    expect(this.idDiv.isDisplayed()).toBeFalsy();
  };

  this.idDivShouldHaveClass = function (className) {
    this.idDiv.getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) !== -1).toBeTruthy();
    });
  };

  this.idDivShouldNotHaveClass = function (className) {
    this.idDiv.getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) === -1).toBeTruthy();
    });
  };

  this.nameInput = element(by.name('name-input'));

  this.setNameInput = function (value) {
    this.nameInput.clear();
    this.nameInput.sendKeys(value);
  };

  this.shouldHaveNameInput = function (value) {
    expect(this.nameInput.getAttribute('value')).toEqual(value);
  };

  this.nameInputShouldBeVisible = function () {
    expect(this.nameInput.isDisplayed()).toBeTruthy();
  };

  this.nameInputShouldNotBeVisible = function () {
    expect(this.nameInput.isDisplayed()).toBeFalsy();
  };

  this.nameInputShouldBeEnabled = function () {
    expect(this.nameInput.isEnabled()).toBeTruthy();
  };

  this.nameInputShouldNotBeEnabled = function () {
    expect(this.nameInput.isEnabled()).toBeFalsy();
  };

  this.clickNameInput = function () {
    this.nameInput.click();
  };

  this.nameInputShouldHaveClass = function (className) {
    this.nameInput.getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) !== -1).toBeTruthy();
    });
  };

  this.nameInputShouldNotHaveClass = function (className) {
    this.nameInput.getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) === -1).toBeTruthy();
    });
  };

  this.titleLabel = element(by.id('title-label'));

  this.clickTitleLabel = function () {
    this.titleLabel.click();
  };

  this.titleLabelShouldBeVisible = function () {
    expect(this.titleLabel.isDisplayed()).toBeTruthy();
  };

  this.titleLabelShouldNotBeVisible = function () {
    expect(this.titleLabel.isDisplayed()).toBeFalsy();
  };

  this.titleLabelShouldHaveClass = function (className) {
    this.titleLabel.getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) !== -1).toBeTruthy();
    });
  };

  this.titleLabelShouldNotHaveClass = function (className) {
    this.titleLabel.getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) === -1).toBeTruthy();
    });
  };

  this.modelInput = element(by.model('model-input'));

  this.setModelInput = function (value) {
    this.modelInput.clear();
    this.modelInput.sendKeys(value);
  };

  this.shouldHaveModelInput = function (value) {
    expect(this.modelInput.getAttribute('value')).toEqual(value);
  };

  this.modelInputShouldBeVisible = function () {
    expect(this.modelInput.isDisplayed()).toBeTruthy();
  };

  this.modelInputShouldNotBeVisible = function () {
    expect(this.modelInput.isDisplayed()).toBeFalsy();
  };

  this.modelInputShouldBeEnabled = function () {
    expect(this.modelInput.isEnabled()).toBeTruthy();
  };

  this.modelInputShouldNotBeEnabled = function () {
    expect(this.modelInput.isEnabled()).toBeFalsy();
  };

  this.clickModelInput = function () {
    this.modelInput.click();
  };

  this.modelInputShouldHaveClass = function (className) {
    this.modelInput.getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) !== -1).toBeTruthy();
    });
  };

  this.modelInputShouldNotHaveClass = function (className) {
    this.modelInput.getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) === -1).toBeTruthy();
    });
  };

  this.ngOptionsSelect = element(by.id('ngOptionsSelect'));

  this.selectNgOptionsSelectByPartialText = function (text) {
    this.ngOptionsSelect.all(by.cssContainingText('option', text)).click();
  };

  this.selectNgOptionsSelectByText = function (text) {
    this.ngOptionsSelect.all(by.xpath('option[.="' + text + '"]')).click();
  };

  this.selectNgOptionsSelectByValue = function (value) {
    this.ngOptionsSelect.all(by.css('option[value="' + value + '"]')).click();
  };

  this.ngOptionsSelectByPartialTextShouldBeSelected = function () {
    var expectedOptions = [];
    for (var i = 0; i < arguments.length; i++) {
      expectedOptions = expectedOptions.concat(arguments[i]);
    }

    for (i = 0; i < expectedOptions.length; i++) {
      var options = this.ngOptionsSelect.all(by.cssContainingText('option', expectedOptions[i]));

      options.each(function (option) {
        expect(option.isSelected()).toBeTruthy();
      });

      expect(options.count()).toBeGreaterThan(0);
    }
  };

  this.ngOptionsSelectByPartialTextShouldNotBeSelected = function () {
    var expectedOptions = [];
    for (var i = 0; i < arguments.length; i++) {
      expectedOptions = expectedOptions.concat(arguments[i]);
    }

    for (i = 0; i < expectedOptions.length; i++) {
      this.ngOptionsSelect.all(by.cssContainingText('option', expectedOptions[i])).each(function (option) {
        expect(option.isSelected()).toBeFalsy();
      });
    }
  };

  this.ngOptionsSelectByTextShouldBeSelected = function () {
    var expectedOptions = [];
    for (var i = 0; i < arguments.length; i++) {
      expectedOptions = expectedOptions.concat(arguments[i]);
    }

    for (i = 0; i < expectedOptions.length; i++) {
      var options = this.ngOptionsSelect.all(by.xpath('option[.="' + expectedOptions[i] + '"]'));

      options.each(function (option) {
        expect(option.isSelected()).toBeTruthy();
      });

      expect(options.count()).toBeGreaterThan(0);
    }
  };

  this.ngOptionsSelectByTextShouldNotBeSelected = function () {
    var expectedOptions = [];
    for (var i = 0; i < arguments.length; i++) {
      expectedOptions = expectedOptions.concat(arguments[i]);
    }

    for (i = 0; i < expectedOptions.length; i++) {
      this.ngOptionsSelect.all(by.xpath('option[.="' + expectedOptions[i] + '"]')).each(function (option) {
        expect(option.isSelected()).toBeFalsy();
      });
    }
  };

  this.ngOptionsSelectByValueShouldBeSelected = function () {
    var expectedOptions = [];
    for (var i = 0; i < arguments.length; i++) {
      expectedOptions = expectedOptions.concat(arguments[i]);
    }

    for (i = 0; i < expectedOptions.length; i++) {
      var options = this.ngOptionsSelect.all(by.css('option[value="' + expectedOptions[i] + '"]'));

      options.each(function (option) {
        expect(option.isSelected()).toBeTruthy();
      });

      expect(options.count()).toBeGreaterThan(0);
    }
  };

  this.ngOptionsSelectByValueShouldNotBeSelected = function () {
    var expectedOptions = [];
    for (var i = 0; i < arguments.length; i++) {
      expectedOptions = expectedOptions.concat(arguments[i]);
    }

    for (i = 0; i < expectedOptions.length; i++) {
      this.ngOptionsSelect.all(by.css('option[value="' + expectedOptions[i] + '"]')).each(function (option) {
        expect(option.isSelected()).toBeFalsy();
      });
    }
  };

  this.ngOptionsSelectShouldBeVisible = function () {
    expect(this.ngOptionsSelect.isDisplayed()).toBeTruthy();
  };

  this.ngOptionsSelectShouldNotBeVisible = function () {
    expect(this.ngOptionsSelect.isDisplayed()).toBeFalsy();
  };

  this.ngOptionsSelectShouldBeEnabled = function () {
    expect(this.ngOptionsSelect.isEnabled()).toBeTruthy();
  };

  this.ngOptionsSelectShouldNotBeEnabled = function () {
    expect(this.ngOptionsSelect.isEnabled()).toBeFalsy();
  };

  this.ngOptionsSelectShouldHaveClass = function (className) {
    this.ngOptionsSelect.getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) !== -1).toBeTruthy();
    });
  };

  this.ngOptionsSelectShouldNotHaveClass = function (className) {
    this.ngOptionsSelect.getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) === -1).toBeTruthy();
    });
  };

  this.clickNgOptionsSelect = function () {
    this.ngOptionsSelect.click();
  };

  this.singleExpression = element(by.exactBinding('singleExpression'));

  this.singleExpressionShouldHaveText = function (value) {
    expect(this.singleExpression.getText()).toBe(value);
  };

  this.singleExpressionShouldHaveClass = function (className) {
    this.singleExpression.getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) !== -1).toBeTruthy();
    });
  };

  this.singleExpressionShouldNotHaveClass = function (className) {
    this.singleExpression.getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) === -1).toBeTruthy();
    });
  };

  this.clickSingleExpression = function () {
    this.singleExpression.click();
  };

  this.singleExpressionShouldBeVisible = function () {
    expect(this.singleExpression.isDisplayed()).toBeTruthy();
  };

  this.singleExpressionShouldNotBeVisible = function () {
    expect(this.singleExpression.isDisplayed()).toBeFalsy();
  };

  this.items = element.all(by.exactRepeater('item in items'));

  this.itemsCountShouldBe = function (count) {
    expect(this.items.count()).toBe(count);
  };

  this.itemShouldHaveText = function (rowIndex1, value) {
    expect(this.items.get(rowIndex1).element(by.exactBinding('item')).getText()).toBe(value);
  };

  this.itemShouldHaveClass = function (rowIndex1, className) {
    this.items.get(rowIndex1).element(by.exactBinding('item')).getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) !== -1).toBeTruthy();
    });
  };

  this.itemShouldNotHaveClass = function (rowIndex1, className) {
    this.items.get(rowIndex1).element(by.exactBinding('item')).getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) === -1).toBeTruthy();
    });
  };

  this.clickItem = function (rowIndex1) {
    this.items.get(rowIndex1).element(by.exactBinding('item')).click();
  };

  this.itemShouldBeVisible = function (rowIndex1) {
    expect(this.items.get(rowIndex1).element(by.exactBinding('item')).isDisplayed()).toBeTruthy();
  };

  this.itemShouldNotBeVisible = function (rowIndex1) {
    expect(this.items.get(rowIndex1).element(by.exactBinding('item')).isDisplayed()).toBeFalsy();
  };

  this.elementsCountShouldBe = function (rowIndex1, count) {
    expect(this.items.get(rowIndex1).all(by.exactRepeater('element in elements')).count()).toBe(count);
  };

  this.elementShouldHaveText = function (rowIndex1, rowIndex2, value) {
    expect(this.items.get(rowIndex1).element(by.exactRepeater('element in elements').row(rowIndex2)).element(by.exactBinding('element')).getText()).toBe(value);
  };

  this.elementShouldHaveClass = function (rowIndex1, rowIndex2, className) {
    this.items.get(rowIndex1).element(by.exactRepeater('element in elements').row(rowIndex2)).element(by.exactBinding('element')).getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) !== -1).toBeTruthy();
    });
  };

  this.elementShouldNotHaveClass = function (rowIndex1, rowIndex2, className) {
    this.items.get(rowIndex1).element(by.exactRepeater('element in elements').row(rowIndex2)).element(by.exactBinding('element')).getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) === -1).toBeTruthy();
    });
  };

  this.clickElement = function (rowIndex1, rowIndex2) {
    this.items.get(rowIndex1).element(by.exactRepeater('element in elements').row(rowIndex2)).element(by.exactBinding('element')).click();
  };

  this.elementShouldBeVisible = function (rowIndex1, rowIndex2) {
    expect(this.items.get(rowIndex1).element(by.exactRepeater('element in elements').row(rowIndex2)).element(by.exactBinding('element')).isDisplayed()).toBeTruthy();
  };

  this.elementShouldNotBeVisible = function (rowIndex1, rowIndex2) {
    expect(this.items.get(rowIndex1).element(by.exactRepeater('element in elements').row(rowIndex2)).element(by.exactBinding('element')).isDisplayed()).toBeFalsy();
  };

};

module.exports = new NgclickPage();