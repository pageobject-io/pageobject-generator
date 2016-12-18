var LinkPage = function () {

  this.get = function () {
    browser.get('');
  };

  this.idLink = element(by.id('id-link'));

  this.clickIdLink = function () {
    this.idLink.click();
  };

  this.idLinkShouldBeVisible = function () {
    expect(this.idLink.isDisplayed()).toBeTruthy();
  };

  this.idLinkShouldNotBeVisible = function () {
    expect(this.idLink.isDisplayed()).toBeFalsy();
  };

  this.idLinkShouldHaveClass = function (className) {
    this.idLink.getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) !== -1).toBeTruthy();
    });
  };

  this.idLinkShouldNotHaveClass = function (className) {
    this.idLink.getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) === -1).toBeTruthy();
    });
  };

  this.nameLink = element(by.name('name-link'));

  this.clickNameLink = function () {
    this.nameLink.click();
  };

  this.nameLinkShouldBeVisible = function () {
    expect(this.nameLink.isDisplayed()).toBeTruthy();
  };

  this.nameLinkShouldNotBeVisible = function () {
    expect(this.nameLink.isDisplayed()).toBeFalsy();
  };

  this.nameLinkShouldHaveClass = function (className) {
    this.nameLink.getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) !== -1).toBeTruthy();
    });
  };

  this.nameLinkShouldNotHaveClass = function (className) {
    this.nameLink.getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) === -1).toBeTruthy();
    });
  };

  this.titleLink = element(by.linkText('Link with title'));

  this.clickTitleLink = function () {
    this.titleLink.click();
  };

  this.titleLinkShouldBeVisible = function () {
    expect(this.titleLink.isDisplayed()).toBeTruthy();
  };

  this.titleLinkShouldNotBeVisible = function () {
    expect(this.titleLink.isDisplayed()).toBeFalsy();
  };

  this.titleLinkShouldHaveClass = function (className) {
    this.titleLink.getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) !== -1).toBeTruthy();
    });
  };

  this.titleLinkShouldNotHaveClass = function (className) {
    this.titleLink.getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) === -1).toBeTruthy();
    });
  };

  this.singleExpressionLink = element(by.exactBinding('singleExpression'));

  this.clickSingleExpressionLink = function () {
    this.singleExpressionLink.click();
  };

  this.singleExpressionLinkShouldBeVisible = function () {
    expect(this.singleExpressionLink.isDisplayed()).toBeTruthy();
  };

  this.singleExpressionLinkShouldNotBeVisible = function () {
    expect(this.singleExpressionLink.isDisplayed()).toBeFalsy();
  };

  this.singleExpressionLinkShouldHaveClass = function (className) {
    this.singleExpressionLink.getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) !== -1).toBeTruthy();
    });
  };

  this.singleExpressionLinkShouldNotHaveClass = function (className) {
    this.singleExpressionLink.getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) === -1).toBeTruthy();
    });
  };

  this.singleExpressionLinkShouldHaveText = function (value) {
    expect(this.singleExpressionLink.getText()).toBe(value);
  };

  this.multiExpressionLink = element(by.exactBinding('multiExpression'));

  this.clickMultiExpressionLink = function () {
    this.multiExpressionLink.click();
  };

  this.multiExpressionLinkShouldBeVisible = function () {
    expect(this.multiExpressionLink.isDisplayed()).toBeTruthy();
  };

  this.multiExpressionLinkShouldNotBeVisible = function () {
    expect(this.multiExpressionLink.isDisplayed()).toBeFalsy();
  };

  this.multiExpressionLinkShouldHaveClass = function (className) {
    this.multiExpressionLink.getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) !== -1).toBeTruthy();
    });
  };

  this.multiExpressionLinkShouldNotHaveClass = function (className) {
    this.multiExpressionLink.getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) === -1).toBeTruthy();
    });
  };

  this.multiExpressionLinkShouldHaveText = function (value) {
    expect(this.multiExpressionLink.getText()).toBe(value);
  };

  this.textOnlyLink = element(by.linkText('Text only'));

  this.clickTextOnlyLink = function () {
    this.textOnlyLink.click();
  };

  this.textOnlyLinkShouldBeVisible = function () {
    expect(this.textOnlyLink.isDisplayed()).toBeTruthy();
  };

  this.textOnlyLinkShouldNotBeVisible = function () {
    expect(this.textOnlyLink.isDisplayed()).toBeFalsy();
  };

  this.textOnlyLinkShouldHaveClass = function (className) {
    this.textOnlyLink.getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) !== -1).toBeTruthy();
    });
  };

  this.textOnlyLinkShouldNotHaveClass = function (className) {
    this.textOnlyLink.getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) === -1).toBeTruthy();
    });
  };

  this.items = element.all(by.exactRepeater('item in items'));

  this.itemsCountShouldBe = function (count) {
    expect(this.items.count()).toBe(count);
  };

  this.clickItemLink = function (rowIndex1) {
    this.items.get(rowIndex1).element(by.exactBinding('item')).click();
  };

  this.itemLinkShouldBeVisible = function (rowIndex1) {
    expect(this.items.get(rowIndex1).element(by.exactBinding('item')).isDisplayed()).toBeTruthy();
  };

  this.itemLinkShouldNotBeVisible = function (rowIndex1) {
    expect(this.items.get(rowIndex1).element(by.exactBinding('item')).isDisplayed()).toBeFalsy();
  };

  this.itemLinkShouldHaveClass = function (rowIndex1, className) {
    this.items.get(rowIndex1).element(by.exactBinding('item')).getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) !== -1).toBeTruthy();
    });
  };

  this.itemLinkShouldNotHaveClass = function (rowIndex1, className) {
    this.items.get(rowIndex1).element(by.exactBinding('item')).getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) === -1).toBeTruthy();
    });
  };

  this.itemLinkShouldHaveText = function (rowIndex1, value) {
    expect(this.items.get(rowIndex1).element(by.exactBinding('item')).getText()).toBe(value);
  };

  this.elementsCountShouldBe = function (rowIndex1, count) {
    expect(this.items.get(rowIndex1).all(by.exactRepeater('element in elements')).count()).toBe(count);
  };

  this.clickElementLink = function (rowIndex1, rowIndex2) {
    this.items.get(rowIndex1).element(by.exactRepeater('element in elements').row(rowIndex2)).element(by.exactBinding('element')).click();
  };

  this.elementLinkShouldBeVisible = function (rowIndex1, rowIndex2) {
    expect(this.items.get(rowIndex1).element(by.exactRepeater('element in elements').row(rowIndex2)).element(by.exactBinding('element')).isDisplayed()).toBeTruthy();
  };

  this.elementLinkShouldNotBeVisible = function (rowIndex1, rowIndex2) {
    expect(this.items.get(rowIndex1).element(by.exactRepeater('element in elements').row(rowIndex2)).element(by.exactBinding('element')).isDisplayed()).toBeFalsy();
  };

  this.elementLinkShouldHaveClass = function (rowIndex1, rowIndex2, className) {
    this.items.get(rowIndex1).element(by.exactRepeater('element in elements').row(rowIndex2)).element(by.exactBinding('element')).getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) !== -1).toBeTruthy();
    });
  };

  this.elementLinkShouldNotHaveClass = function (rowIndex1, rowIndex2, className) {
    this.items.get(rowIndex1).element(by.exactRepeater('element in elements').row(rowIndex2)).element(by.exactBinding('element')).getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) === -1).toBeTruthy();
    });
  };

  this.elementLinkShouldHaveText = function (rowIndex1, rowIndex2, value) {
    expect(this.items.get(rowIndex1).element(by.exactRepeater('element in elements').row(rowIndex2)).element(by.exactBinding('element')).getText()).toBe(value);
  };

  this.whatIsAPageObjectLink = element(by.linkText('What is a Page Object?'));

  this.clickWhatIsAPageObjectLink = function () {
    this.whatIsAPageObjectLink.click();
  };

  this.whatIsAPageObjectLinkShouldBeVisible = function () {
    expect(this.whatIsAPageObjectLink.isDisplayed()).toBeTruthy();
  };

  this.whatIsAPageObjectLinkShouldNotBeVisible = function () {
    expect(this.whatIsAPageObjectLink.isDisplayed()).toBeFalsy();
  };

  this.whatIsAPageObjectLinkShouldHaveClass = function (className) {
    this.whatIsAPageObjectLink.getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) !== -1).toBeTruthy();
    });
  };

  this.whatIsAPageObjectLinkShouldNotHaveClass = function (className) {
    this.whatIsAPageObjectLink.getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) === -1).toBeTruthy();
    });
  };

};

module.exports = new LinkPage();