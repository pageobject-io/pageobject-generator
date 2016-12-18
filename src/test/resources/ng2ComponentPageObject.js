var Ng2ComponentPage = function () {

  this.get = function () {
    browser.get('');
  };

  this.totalCountLabel = element(by.id('totalCountLabel'));

  this.clickTotalCountLabel = function () {
    this.totalCountLabel.click();
  };

  this.totalCountLabelShouldBeVisible = function () {
    expect(this.totalCountLabel.isDisplayed()).toBeTruthy();
  };

  this.totalCountLabelShouldNotBeVisible = function () {
    expect(this.totalCountLabel.isDisplayed()).toBeFalsy();
  };

  this.totalCountLabelShouldHaveClass = function (className) {
    this.totalCountLabel.getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) !== -1).toBeTruthy();
    });
  };

  this.totalCountLabelShouldNotHaveClass = function (className) {
    this.totalCountLabel.getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) === -1).toBeTruthy();
    });
  };

  this.totalCountLabelShouldHaveText = function (value) {
    expect(this.totalCountLabel.getText()).toBe(value);
  };

  this.namedLink = element(by.name('named-link'));

  this.clickNamedLink = function () {
    this.namedLink.click();
  };

  this.namedLinkShouldBeVisible = function () {
    expect(this.namedLink.isDisplayed()).toBeTruthy();
  };

  this.namedLinkShouldNotBeVisible = function () {
    expect(this.namedLink.isDisplayed()).toBeFalsy();
  };

  this.namedLinkShouldHaveClass = function (className) {
    this.namedLink.getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) !== -1).toBeTruthy();
    });
  };

  this.namedLinkShouldNotHaveClass = function (className) {
    this.namedLink.getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) === -1).toBeTruthy();
    });
  };

  this.namedLinkShouldHaveText = function (value) {
    expect(this.namedLink.getText()).toBe(value);
  };

  this.linkText2Link = element(by.css('div.row > div.col-md-12 > a.a-link'));

  this.clickLinkText2Link = function () {
    this.linkText2Link.click();
  };

  this.linkText2LinkShouldBeVisible = function () {
    expect(this.linkText2Link.isDisplayed()).toBeTruthy();
  };

  this.linkText2LinkShouldNotBeVisible = function () {
    expect(this.linkText2Link.isDisplayed()).toBeFalsy();
  };

  this.linkText2LinkShouldHaveClass = function (className) {
    this.linkText2Link.getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) !== -1).toBeTruthy();
    });
  };

  this.linkText2LinkShouldNotHaveClass = function (className) {
    this.linkText2Link.getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) === -1).toBeTruthy();
    });
  };

  this.linkText2LinkShouldHaveText = function (value) {
    expect(this.linkText2Link.getText()).toBe(value);
  };

  this.addButton = element(by.buttonText('Add'));

  this.clickAddButton = function () {
    this.addButton.click();
  };

  this.addButtonShouldBeVisible = function () {
    expect(this.addButton.isDisplayed()).toBeTruthy();
  };

  this.addButtonShouldNotBeVisible = function () {
    expect(this.addButton.isDisplayed()).toBeFalsy();
  };

  this.addButtonShouldHaveClass = function (className) {
    this.addButton.getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) !== -1).toBeTruthy();
    });
  };

  this.addButtonShouldNotHaveClass = function (className) {
    this.addButton.getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) === -1).toBeTruthy();
    });
  };

  this.addPart = element(by.css('div.row > div.col-md-12 > span:nth-of-type(2)'));

  this.addPartShouldHaveText = function (value) {
    expect(this.addPart.getText()).toBe(value);
  };

  this.addPartShouldHaveClass = function (className) {
    this.addPart.getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) !== -1).toBeTruthy();
    });
  };

  this.addPartShouldNotHaveClass = function (className) {
    this.addPart.getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) === -1).toBeTruthy();
    });
  };

  this.parts = element.all(by.css('#parts-table > tbody > tr.part-row'));

  this.partsCountShouldBe = function (count) {
    expect(this.parts.count()).toBe(count);
  };

  this.partIdShouldHaveText = function (rowIndex1, value) {
    expect(this.parts.get(rowIndex1).element(by.css('td.vert-align.text-center:nth-of-type(1)')).getText()).toBe(value);
  };

  this.partIdShouldHaveClass = function (rowIndex1, className) {
    this.parts.get(rowIndex1).element(by.css('td.vert-align.text-center:nth-of-type(1)')).getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) !== -1).toBeTruthy();
    });
  };

  this.partIdShouldNotHaveClass = function (rowIndex1, className) {
    this.parts.get(rowIndex1).element(by.css('td.vert-align.text-center:nth-of-type(1)')).getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) === -1).toBeTruthy();
    });
  };

  this.partHaveItYesNoShouldHaveText = function (rowIndex1, value) {
    expect(this.parts.get(rowIndex1).element(by.css('td.vert-align.text-center:nth-of-type(2)')).getText()).toBe(value);
  };

  this.partHaveItYesNoShouldHaveClass = function (rowIndex1, className) {
    this.parts.get(rowIndex1).element(by.css('td.vert-align.text-center:nth-of-type(2)')).getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) !== -1).toBeTruthy();
    });
  };

  this.partHaveItYesNoShouldNotHaveClass = function (rowIndex1, className) {
    this.parts.get(rowIndex1).element(by.css('td.vert-align.text-center:nth-of-type(2)')).getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) === -1).toBeTruthy();
    });
  };

  this.clickEditPartButton = function (rowIndex1) {
    this.parts.get(rowIndex1).element(by.buttonText('Edit')).click();
  };

  this.editPartButtonShouldBeVisible = function (rowIndex1) {
    expect(this.parts.get(rowIndex1).element(by.buttonText('Edit')).isDisplayed()).toBeTruthy();
  };

  this.editPartButtonShouldNotBeVisible = function (rowIndex1) {
    expect(this.parts.get(rowIndex1).element(by.buttonText('Edit')).isDisplayed()).toBeFalsy();
  };

  this.editPartButtonShouldHaveClass = function (rowIndex1, className) {
    this.parts.get(rowIndex1).element(by.buttonText('Edit')).getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) !== -1).toBeTruthy();
    });
  };

  this.editPartButtonShouldNotHaveClass = function (rowIndex1, className) {
    this.parts.get(rowIndex1).element(by.buttonText('Edit')).getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) === -1).toBeTruthy();
    });
  };

  this.modelShouldHaveText = function (rowIndex1, value) {
    expect(this.parts.get(rowIndex1).element(by.css('td:nth-of-type(4)')).getText()).toBe(value);
  };

  this.modelShouldHaveClass = function (rowIndex1, className) {
    this.parts.get(rowIndex1).element(by.css('td:nth-of-type(4)')).getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) !== -1).toBeTruthy();
    });
  };

  this.modelShouldNotHaveClass = function (rowIndex1, className) {
    this.parts.get(rowIndex1).element(by.css('td:nth-of-type(4)')).getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) === -1).toBeTruthy();
    });
  };

  this.pages = element.all(by.css('div.row > div.col-md-12 > ul > li'));

  this.pagesCountShouldBe = function (count) {
    expect(this.pages.count()).toBe(count);
  };

  this.pagesShouldHaveText = function (rowIndex1, value) {
    expect(this.pages.get(rowIndex1).getText()).toBe(value);
  };

  this.pagesShouldHaveClass = function (rowIndex1, className) {
    this.pages.get(rowIndex1).getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) !== -1).toBeTruthy();
    });
  };

  this.pagesShouldNotHaveClass = function (rowIndex1, className) {
    this.pages.get(rowIndex1).getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) === -1).toBeTruthy();
    });
  };

  this.pageShouldHaveText = function (rowIndex1, value) {
    expect(this.pages.get(rowIndex1).element(by.css('span')).getText()).toBe(value);
  };

  this.pageShouldHaveClass = function (rowIndex1, className) {
    this.pages.get(rowIndex1).element(by.css('span')).getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) !== -1).toBeTruthy();
    });
  };

  this.pageShouldNotHaveClass = function (rowIndex1, className) {
    this.pages.get(rowIndex1).element(by.css('span')).getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) === -1).toBeTruthy();
    });
  };

  this.itemsCountShouldBe = function (rowIndex1, count) {
    expect(this.pages.get(rowIndex1).all(by.css('ul > li')).count()).toBe(count);
  };

  this.clickItemLink = function (rowIndex1, rowIndex2) {
    this.pages.get(rowIndex1).all(by.css('ul > li')).get(rowIndex2).element(by.css('a')).click();
  };

  this.itemLinkShouldBeVisible = function (rowIndex1, rowIndex2) {
    expect(this.pages.get(rowIndex1).all(by.css('ul > li')).get(rowIndex2).element(by.css('a')).isDisplayed()).toBeTruthy();
  };

  this.itemLinkShouldNotBeVisible = function (rowIndex1, rowIndex2) {
    expect(this.pages.get(rowIndex1).all(by.css('ul > li')).get(rowIndex2).element(by.css('a')).isDisplayed()).toBeFalsy();
  };

  this.itemLinkShouldHaveClass = function (rowIndex1, rowIndex2, className) {
    this.pages.get(rowIndex1).all(by.css('ul > li')).get(rowIndex2).element(by.css('a')).getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) !== -1).toBeTruthy();
    });
  };

  this.itemLinkShouldNotHaveClass = function (rowIndex1, rowIndex2, className) {
    this.pages.get(rowIndex1).all(by.css('ul > li')).get(rowIndex2).element(by.css('a')).getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) === -1).toBeTruthy();
    });
  };

  this.itemLinkShouldHaveText = function (rowIndex1, rowIndex2, value) {
    expect(this.pages.get(rowIndex1).all(by.css('ul > li')).get(rowIndex2).element(by.css('a')).getText()).toBe(value);
  };

  this.nestedClick = element(by.css('div.row > div.col-md-12 > span:nth-of-type(3)'));

  this.nestedClickShouldHaveText = function (value) {
    expect(this.nestedClick.getText()).toBe(value);
  };

  this.nestedClickShouldHaveClass = function (className) {
    this.nestedClick.getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) !== -1).toBeTruthy();
    });
  };

  this.nestedClickShouldNotHaveClass = function (className) {
    this.nestedClick.getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) === -1).toBeTruthy();
    });
  };

};

module.exports = new Ng2ComponentPage();