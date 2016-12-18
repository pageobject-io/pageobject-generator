var CssPage = function () {

  this.get = function () {
    browser.get('');
  };

  this.div1 = element(by.css('body > div > div:nth-of-type(1)'));

  this.clickDiv1 = function () {
    this.div1.click();
  };

  this.div1ShouldBeVisible = function () {
    expect(this.div1.isDisplayed()).toBeTruthy();
  };

  this.div1ShouldNotBeVisible = function () {
    expect(this.div1.isDisplayed()).toBeFalsy();
  };

  this.div1ShouldHaveClass = function (className) {
    this.div1.getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) !== -1).toBeTruthy();
    });
  };

  this.div1ShouldNotHaveClass = function (className) {
    this.div1.getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) === -1).toBeTruthy();
    });
  };

  this.div2 = element(by.css('body > div > div:nth-of-type(2)'));

  this.clickDiv2 = function () {
    this.div2.click();
  };

  this.div2ShouldBeVisible = function () {
    expect(this.div2.isDisplayed()).toBeTruthy();
  };

  this.div2ShouldNotBeVisible = function () {
    expect(this.div2.isDisplayed()).toBeFalsy();
  };

  this.div2ShouldHaveClass = function (className) {
    this.div2.getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) !== -1).toBeTruthy();
    });
  };

  this.div2ShouldNotHaveClass = function (className) {
    this.div2.getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) === -1).toBeTruthy();
    });
  };

  this.items = element.all(by.exactRepeater('item in items'));

  this.itemsCountShouldBe = function (count) {
    expect(this.items.count()).toBe(count);
  };

  this.elementsCountShouldBe = function (rowIndex1, count) {
    expect(this.items.get(rowIndex1).all(by.exactRepeater('element in elements')).count()).toBe(count);
  };

  this.clickDoubleNestedDiv1 = function (rowIndex1, rowIndex2) {
    this.items.get(rowIndex1).element(by.exactRepeater('element in elements').row(rowIndex2)).element(by.css('div:nth-of-type(1)')).click();
  };

  this.doubleNestedDiv1ShouldBeVisible = function (rowIndex1, rowIndex2) {
    expect(this.items.get(rowIndex1).element(by.exactRepeater('element in elements').row(rowIndex2)).element(by.css('div:nth-of-type(1)')).isDisplayed()).toBeTruthy();
  };

  this.doubleNestedDiv1ShouldNotBeVisible = function (rowIndex1, rowIndex2) {
    expect(this.items.get(rowIndex1).element(by.exactRepeater('element in elements').row(rowIndex2)).element(by.css('div:nth-of-type(1)')).isDisplayed()).toBeFalsy();
  };

  this.doubleNestedDiv1ShouldHaveClass = function (rowIndex1, rowIndex2, className) {
    this.items.get(rowIndex1).element(by.exactRepeater('element in elements').row(rowIndex2)).element(by.css('div:nth-of-type(1)')).getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) !== -1).toBeTruthy();
    });
  };

  this.doubleNestedDiv1ShouldNotHaveClass = function (rowIndex1, rowIndex2, className) {
    this.items.get(rowIndex1).element(by.exactRepeater('element in elements').row(rowIndex2)).element(by.css('div:nth-of-type(1)')).getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) === -1).toBeTruthy();
    });
  };

  this.clickDoubleNestedDiv2 = function (rowIndex1, rowIndex2) {
    this.items.get(rowIndex1).element(by.exactRepeater('element in elements').row(rowIndex2)).element(by.css('div:nth-of-type(2)')).click();
  };

  this.doubleNestedDiv2ShouldBeVisible = function (rowIndex1, rowIndex2) {
    expect(this.items.get(rowIndex1).element(by.exactRepeater('element in elements').row(rowIndex2)).element(by.css('div:nth-of-type(2)')).isDisplayed()).toBeTruthy();
  };

  this.doubleNestedDiv2ShouldNotBeVisible = function (rowIndex1, rowIndex2) {
    expect(this.items.get(rowIndex1).element(by.exactRepeater('element in elements').row(rowIndex2)).element(by.css('div:nth-of-type(2)')).isDisplayed()).toBeFalsy();
  };

  this.doubleNestedDiv2ShouldHaveClass = function (rowIndex1, rowIndex2, className) {
    this.items.get(rowIndex1).element(by.exactRepeater('element in elements').row(rowIndex2)).element(by.css('div:nth-of-type(2)')).getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) !== -1).toBeTruthy();
    });
  };

  this.doubleNestedDiv2ShouldNotHaveClass = function (rowIndex1, rowIndex2, className) {
    this.items.get(rowIndex1).element(by.exactRepeater('element in elements').row(rowIndex2)).element(by.css('div:nth-of-type(2)')).getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) === -1).toBeTruthy();
    });
  };

  this.items2 = element.all(by.exactRepeater('item in items2'));

  this.items2CountShouldBe = function (count) {
    expect(this.items2.count()).toBe(count);
  };

  this.clickOneLevelNestedDiv1 = function (rowIndex1) {
    this.items2.get(rowIndex1).element(by.css('div:nth-of-type(1)')).click();
  };

  this.oneLevelNestedDiv1ShouldBeVisible = function (rowIndex1) {
    expect(this.items2.get(rowIndex1).element(by.css('div:nth-of-type(1)')).isDisplayed()).toBeTruthy();
  };

  this.oneLevelNestedDiv1ShouldNotBeVisible = function (rowIndex1) {
    expect(this.items2.get(rowIndex1).element(by.css('div:nth-of-type(1)')).isDisplayed()).toBeFalsy();
  };

  this.oneLevelNestedDiv1ShouldHaveClass = function (rowIndex1, className) {
    this.items2.get(rowIndex1).element(by.css('div:nth-of-type(1)')).getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) !== -1).toBeTruthy();
    });
  };

  this.oneLevelNestedDiv1ShouldNotHaveClass = function (rowIndex1, className) {
    this.items2.get(rowIndex1).element(by.css('div:nth-of-type(1)')).getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) === -1).toBeTruthy();
    });
  };

  this.clickOneLevelNestedDiv2 = function (rowIndex1) {
    this.items2.get(rowIndex1).element(by.css('div:nth-of-type(2)')).click();
  };

  this.oneLevelNestedDiv2ShouldBeVisible = function (rowIndex1) {
    expect(this.items2.get(rowIndex1).element(by.css('div:nth-of-type(2)')).isDisplayed()).toBeTruthy();
  };

  this.oneLevelNestedDiv2ShouldNotBeVisible = function (rowIndex1) {
    expect(this.items2.get(rowIndex1).element(by.css('div:nth-of-type(2)')).isDisplayed()).toBeFalsy();
  };

  this.oneLevelNestedDiv2ShouldHaveClass = function (rowIndex1, className) {
    this.items2.get(rowIndex1).element(by.css('div:nth-of-type(2)')).getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) !== -1).toBeTruthy();
    });
  };

  this.oneLevelNestedDiv2ShouldNotHaveClass = function (rowIndex1, className) {
    this.items2.get(rowIndex1).element(by.css('div:nth-of-type(2)')).getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) === -1).toBeTruthy();
    });
  };

};

module.exports = new CssPage();