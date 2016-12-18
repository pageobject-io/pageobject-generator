var RepeaterPage = function () {

  this.get = function () {
    browser.get('');
  };

  this.clickSharedItemsLink = function (rowIndex1) {
    this.sharedItemsLink.get(rowIndex1).click();
  };

  this.sharedItemsLinkShouldBeVisible = function (rowIndex1) {
    expect(this.sharedItemsLink.get(rowIndex1).isDisplayed()).toBeTruthy();
  };

  this.sharedItemsLinkShouldNotBeVisible = function (rowIndex1) {
    expect(this.sharedItemsLink.get(rowIndex1).isDisplayed()).toBeFalsy();
  };

  this.sharedItemsLinkShouldHaveClass = function (rowIndex1, className) {
    this.sharedItemsLink.get(rowIndex1).getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) !== -1).toBeTruthy();
    });
  };

  this.sharedItemsLinkShouldNotHaveClass = function (rowIndex1, className) {
    this.sharedItemsLink.get(rowIndex1).getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) === -1).toBeTruthy();
    });
  };

  this.sharedItemsLink = element.all(by.exactRepeater('item in sharedItems'));

  this.sharedItemsLinkCountShouldBe = function (count) {
    expect(this.sharedItemsLink.count()).toBe(count);
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

  this.nestedItemsCountShouldBe = function (rowIndex1, count) {
    expect(this.items.get(rowIndex1).all(by.exactRepeater('element in nestedItems')).count()).toBe(count);
  };

  this.clickElementLink = function (rowIndex1, rowIndex2) {
    this.items.get(rowIndex1).element(by.exactRepeater('element in nestedItems').row(rowIndex2)).element(by.exactBinding('element')).click();
  };

  this.elementLinkShouldBeVisible = function (rowIndex1, rowIndex2) {
    expect(this.items.get(rowIndex1).element(by.exactRepeater('element in nestedItems').row(rowIndex2)).element(by.exactBinding('element')).isDisplayed()).toBeTruthy();
  };

  this.elementLinkShouldNotBeVisible = function (rowIndex1, rowIndex2) {
    expect(this.items.get(rowIndex1).element(by.exactRepeater('element in nestedItems').row(rowIndex2)).element(by.exactBinding('element')).isDisplayed()).toBeFalsy();
  };

  this.elementLinkShouldHaveClass = function (rowIndex1, rowIndex2, className) {
    this.items.get(rowIndex1).element(by.exactRepeater('element in nestedItems').row(rowIndex2)).element(by.exactBinding('element')).getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) !== -1).toBeTruthy();
    });
  };

  this.elementLinkShouldNotHaveClass = function (rowIndex1, rowIndex2, className) {
    this.items.get(rowIndex1).element(by.exactRepeater('element in nestedItems').row(rowIndex2)).element(by.exactBinding('element')).getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) === -1).toBeTruthy();
    });
  };

  this.elementLinkShouldHaveText = function (rowIndex1, rowIndex2, value) {
    expect(this.items.get(rowIndex1).element(by.exactRepeater('element in nestedItems').row(rowIndex2)).element(by.exactBinding('element')).getText()).toBe(value);
  };

  this.library = element.all(by.exactRepeater('book in library'));

  this.libraryCountShouldBe = function (count) {
    expect(this.library.count()).toBe(count);
  };

  this.clickLibrary = function (rowIndex1) {
    this.library.get(rowIndex1).click();
  };

  this.libraryShouldBeVisible = function (rowIndex1) {
    expect(this.library.get(rowIndex1).isDisplayed()).toBeTruthy();
  };

  this.libraryShouldNotBeVisible = function (rowIndex1) {
    expect(this.library.get(rowIndex1).isDisplayed()).toBeFalsy();
  };

  this.libraryShouldHaveClass = function (rowIndex1, className) {
    this.library.get(rowIndex1).getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) !== -1).toBeTruthy();
    });
  };

  this.libraryShouldNotHaveClass = function (rowIndex1, className) {
    this.library.get(rowIndex1).getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) === -1).toBeTruthy();
    });
  };

  this.indexShouldHaveText = function (rowIndex1, value) {
    expect(this.library.get(rowIndex1).element(by.exactBinding('$index')).getText()).toBe(value);
  };

  this.indexShouldHaveClass = function (rowIndex1, className) {
    this.library.get(rowIndex1).element(by.exactBinding('$index')).getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) !== -1).toBeTruthy();
    });
  };

  this.indexShouldNotHaveClass = function (rowIndex1, className) {
    this.library.get(rowIndex1).element(by.exactBinding('$index')).getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) === -1).toBeTruthy();
    });
  };

  this.clickRepeaterLink = function (rowIndex1) {
    this.library.get(rowIndex1).element(by.name(`repeaterLink${rowIndex1}`)).click();
  };

  this.repeaterLinkShouldBeVisible = function (rowIndex1) {
    expect(this.library.get(rowIndex1).element(by.name(`repeaterLink${rowIndex1}`)).isDisplayed()).toBeTruthy();
  };

  this.repeaterLinkShouldNotBeVisible = function (rowIndex1) {
    expect(this.library.get(rowIndex1).element(by.name(`repeaterLink${rowIndex1}`)).isDisplayed()).toBeFalsy();
  };

  this.repeaterLinkShouldHaveClass = function (rowIndex1, className) {
    this.library.get(rowIndex1).element(by.name(`repeaterLink${rowIndex1}`)).getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) !== -1).toBeTruthy();
    });
  };

  this.repeaterLinkShouldNotHaveClass = function (rowIndex1, className) {
    this.library.get(rowIndex1).element(by.name(`repeaterLink${rowIndex1}`)).getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) === -1).toBeTruthy();
    });
  };

  this.bookNameShouldHaveText = function (rowIndex1, value) {
    expect(this.library.get(rowIndex1).element(by.exactBinding('book.name')).getText()).toBe(value);
  };

  this.bookNameShouldHaveClass = function (rowIndex1, className) {
    this.library.get(rowIndex1).element(by.exactBinding('book.name')).getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) !== -1).toBeTruthy();
    });
  };

  this.bookNameShouldNotHaveClass = function (rowIndex1, className) {
    this.library.get(rowIndex1).element(by.exactBinding('book.name')).getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) === -1).toBeTruthy();
    });
  };

  this.bookBlurbShouldHaveText = function (rowIndex1, value) {
    expect(this.library.get(rowIndex1).element(by.exactBinding('book.blurb')).getText()).toBe(value);
  };

  this.bookBlurbShouldHaveClass = function (rowIndex1, className) {
    this.library.get(rowIndex1).element(by.exactBinding('book.blurb')).getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) !== -1).toBeTruthy();
    });
  };

  this.bookBlurbShouldNotHaveClass = function (rowIndex1, className) {
    this.library.get(rowIndex1).element(by.exactBinding('book.blurb')).getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) === -1).toBeTruthy();
    });
  };

  this.clickItems2Link = function (rowIndex1) {
    this.items2Link.get(rowIndex1).click();
  };

  this.items2LinkShouldBeVisible = function (rowIndex1) {
    expect(this.items2Link.get(rowIndex1).isDisplayed()).toBeTruthy();
  };

  this.items2LinkShouldNotBeVisible = function (rowIndex1) {
    expect(this.items2Link.get(rowIndex1).isDisplayed()).toBeFalsy();
  };

  this.items2LinkShouldHaveClass = function (rowIndex1, className) {
    this.items2Link.get(rowIndex1).getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) !== -1).toBeTruthy();
    });
  };

  this.items2LinkShouldNotHaveClass = function (rowIndex1, className) {
    this.items2Link.get(rowIndex1).getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) === -1).toBeTruthy();
    });
  };

  this.items2Link = element.all(by.exactRepeater('item in items2'));

  this.items2LinkCountShouldBe = function (count) {
    expect(this.items2Link.count()).toBe(count);
  };

};

module.exports = new RepeaterPage();