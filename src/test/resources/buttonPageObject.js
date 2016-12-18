var ButtonPage = function () {

  this.get = function () {
    browser.get('');
  };

  this.idButton = element(by.id('id-button'));

  this.clickIdButton = function () {
    this.idButton.click();
  };

  this.idButtonShouldBeVisible = function () {
    expect(this.idButton.isDisplayed()).toBeTruthy();
  };

  this.idButtonShouldNotBeVisible = function () {
    expect(this.idButton.isDisplayed()).toBeFalsy();
  };

  this.idButtonShouldHaveClass = function (className) {
    this.idButton.getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) !== -1).toBeTruthy();
    });
  };

  this.idButtonShouldNotHaveClass = function (className) {
    this.idButton.getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) === -1).toBeTruthy();
    });
  };

  this.nameButton = element(by.name('name-button'));

  this.clickNameButton = function () {
    this.nameButton.click();
  };

  this.nameButtonShouldBeVisible = function () {
    expect(this.nameButton.isDisplayed()).toBeTruthy();
  };

  this.nameButtonShouldNotBeVisible = function () {
    expect(this.nameButton.isDisplayed()).toBeFalsy();
  };

  this.nameButtonShouldHaveClass = function (className) {
    this.nameButton.getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) !== -1).toBeTruthy();
    });
  };

  this.nameButtonShouldNotHaveClass = function (className) {
    this.nameButton.getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) === -1).toBeTruthy();
    });
  };

  this.titleButton = element(by.buttonText('Button with title'));

  this.clickTitleButton = function () {
    this.titleButton.click();
  };

  this.titleButtonShouldBeVisible = function () {
    expect(this.titleButton.isDisplayed()).toBeTruthy();
  };

  this.titleButtonShouldNotBeVisible = function () {
    expect(this.titleButton.isDisplayed()).toBeFalsy();
  };

  this.titleButtonShouldHaveClass = function (className) {
    this.titleButton.getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) !== -1).toBeTruthy();
    });
  };

  this.titleButtonShouldNotHaveClass = function (className) {
    this.titleButton.getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) === -1).toBeTruthy();
    });
  };

  this.singleExpressionButton = element(by.exactBinding('main.singleExpression'));

  this.clickSingleExpressionButton = function () {
    this.singleExpressionButton.click();
  };

  this.singleExpressionButtonShouldBeVisible = function () {
    expect(this.singleExpressionButton.isDisplayed()).toBeTruthy();
  };

  this.singleExpressionButtonShouldNotBeVisible = function () {
    expect(this.singleExpressionButton.isDisplayed()).toBeFalsy();
  };

  this.singleExpressionButtonShouldHaveClass = function (className) {
    this.singleExpressionButton.getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) !== -1).toBeTruthy();
    });
  };

  this.singleExpressionButtonShouldNotHaveClass = function (className) {
    this.singleExpressionButton.getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) === -1).toBeTruthy();
    });
  };

  this.singleExpressionButtonShouldHaveText = function (value) {
    expect(this.singleExpressionButton.getText()).toBe(value);
  };

  this.multiExpressionButton = element(by.exactBinding('main.multiExpression'));

  this.clickMultiExpressionButton = function () {
    this.multiExpressionButton.click();
  };

  this.multiExpressionButtonShouldBeVisible = function () {
    expect(this.multiExpressionButton.isDisplayed()).toBeTruthy();
  };

  this.multiExpressionButtonShouldNotBeVisible = function () {
    expect(this.multiExpressionButton.isDisplayed()).toBeFalsy();
  };

  this.multiExpressionButtonShouldHaveClass = function (className) {
    this.multiExpressionButton.getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) !== -1).toBeTruthy();
    });
  };

  this.multiExpressionButtonShouldNotHaveClass = function (className) {
    this.multiExpressionButton.getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) === -1).toBeTruthy();
    });
  };

  this.multiExpressionButtonShouldHaveText = function (value) {
    expect(this.multiExpressionButton.getText()).toBe(value);
  };

  this.textOnlyButton = element(by.buttonText('Text only'));

  this.clickTextOnlyButton = function () {
    this.textOnlyButton.click();
  };

  this.textOnlyButtonShouldBeVisible = function () {
    expect(this.textOnlyButton.isDisplayed()).toBeTruthy();
  };

  this.textOnlyButtonShouldNotBeVisible = function () {
    expect(this.textOnlyButton.isDisplayed()).toBeFalsy();
  };

  this.textOnlyButtonShouldHaveClass = function (className) {
    this.textOnlyButton.getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) !== -1).toBeTruthy();
    });
  };

  this.textOnlyButtonShouldNotHaveClass = function (className) {
    this.textOnlyButton.getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) === -1).toBeTruthy();
    });
  };

  this.submitButton = element(by.buttonText('Submit'));

  this.clickSubmitButton = function () {
    this.submitButton.click();
  };

  this.submitButtonShouldBeVisible = function () {
    expect(this.submitButton.isDisplayed()).toBeTruthy();
  };

  this.submitButtonShouldNotBeVisible = function () {
    expect(this.submitButton.isDisplayed()).toBeFalsy();
  };

  this.submitButtonShouldHaveClass = function (className) {
    this.submitButton.getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) !== -1).toBeTruthy();
    });
  };

  this.submitButtonShouldNotHaveClass = function (className) {
    this.submitButton.getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) === -1).toBeTruthy();
    });
  };

  this.inputButton = element(by.buttonText('InputButton'));

  this.clickInputButton = function () {
    this.inputButton.click();
  };

  this.inputButtonShouldBeVisible = function () {
    expect(this.inputButton.isDisplayed()).toBeTruthy();
  };

  this.inputButtonShouldNotBeVisible = function () {
    expect(this.inputButton.isDisplayed()).toBeFalsy();
  };

  this.inputButtonShouldHaveClass = function (className) {
    this.inputButton.getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) !== -1).toBeTruthy();
    });
  };

  this.inputButtonShouldNotHaveClass = function (className) {
    this.inputButton.getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) === -1).toBeTruthy();
    });
  };

  this.items = element.all(by.exactRepeater('item in main.items'));

  this.itemsCountShouldBe = function (count) {
    expect(this.items.count()).toBe(count);
  };

  this.clickItemButton = function (rowIndex1) {
    this.items.get(rowIndex1).element(by.exactBinding('item')).click();
  };

  this.itemButtonShouldBeVisible = function (rowIndex1) {
    expect(this.items.get(rowIndex1).element(by.exactBinding('item')).isDisplayed()).toBeTruthy();
  };

  this.itemButtonShouldNotBeVisible = function (rowIndex1) {
    expect(this.items.get(rowIndex1).element(by.exactBinding('item')).isDisplayed()).toBeFalsy();
  };

  this.itemButtonShouldHaveClass = function (rowIndex1, className) {
    this.items.get(rowIndex1).element(by.exactBinding('item')).getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) !== -1).toBeTruthy();
    });
  };

  this.itemButtonShouldNotHaveClass = function (rowIndex1, className) {
    this.items.get(rowIndex1).element(by.exactBinding('item')).getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) === -1).toBeTruthy();
    });
  };

  this.itemButtonShouldHaveText = function (rowIndex1, value) {
    expect(this.items.get(rowIndex1).element(by.exactBinding('item')).getText()).toBe(value);
  };

  this.elementsCountShouldBe = function (rowIndex1, count) {
    expect(this.items.get(rowIndex1).all(by.exactRepeater('element in main.elements')).count()).toBe(count);
  };

  this.clickElementButton = function (rowIndex1, rowIndex2) {
    this.items.get(rowIndex1).element(by.exactRepeater('element in main.elements').row(rowIndex2)).element(by.exactBinding('element')).click();
  };

  this.elementButtonShouldBeVisible = function (rowIndex1, rowIndex2) {
    expect(this.items.get(rowIndex1).element(by.exactRepeater('element in main.elements').row(rowIndex2)).element(by.exactBinding('element')).isDisplayed()).toBeTruthy();
  };

  this.elementButtonShouldNotBeVisible = function (rowIndex1, rowIndex2) {
    expect(this.items.get(rowIndex1).element(by.exactRepeater('element in main.elements').row(rowIndex2)).element(by.exactBinding('element')).isDisplayed()).toBeFalsy();
  };

  this.elementButtonShouldHaveClass = function (rowIndex1, rowIndex2, className) {
    this.items.get(rowIndex1).element(by.exactRepeater('element in main.elements').row(rowIndex2)).element(by.exactBinding('element')).getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) !== -1).toBeTruthy();
    });
  };

  this.elementButtonShouldNotHaveClass = function (rowIndex1, rowIndex2, className) {
    this.items.get(rowIndex1).element(by.exactRepeater('element in main.elements').row(rowIndex2)).element(by.exactBinding('element')).getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) === -1).toBeTruthy();
    });
  };

  this.elementButtonShouldHaveText = function (rowIndex1, rowIndex2, value) {
    expect(this.items.get(rowIndex1).element(by.exactRepeater('element in main.elements').row(rowIndex2)).element(by.exactBinding('element')).getText()).toBe(value);
  };

};

module.exports = new ButtonPage();