var BindingPage = function () {

  this.get = function () {
    browser.get('');
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

  this.nameLinkShouldHaveText = function (value) {
    expect(this.nameLink.getText()).toBe(value);
  };

  this.idLi = element(by.id('id-li'));

  this.idLiShouldHaveText = function (value) {
    expect(this.idLi.getText()).toBe(value);
  };

  this.idLiShouldHaveClass = function (className) {
    this.idLi.getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) !== -1).toBeTruthy();
    });
  };

  this.idLiShouldNotHaveClass = function (className) {
    this.idLi.getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) === -1).toBeTruthy();
    });
  };

  this.singleExpression3 = element(by.exactBinding('singleExpression3'));

  this.singleExpression3ShouldHaveText = function (value) {
    expect(this.singleExpression3.getText()).toBe(value);
  };

  this.singleExpression3ShouldHaveClass = function (className) {
    this.singleExpression3.getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) !== -1).toBeTruthy();
    });
  };

  this.singleExpression3ShouldNotHaveClass = function (className) {
    this.singleExpression3.getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) === -1).toBeTruthy();
    });
  };

  this.singleExpression4 = element(by.exactBinding('singleExpression4'));

  this.singleExpression4ShouldHaveText = function (value) {
    expect(this.singleExpression4.getText()).toBe(value);
  };

  this.singleExpression4ShouldHaveClass = function (className) {
    this.singleExpression4.getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) !== -1).toBeTruthy();
    });
  };

  this.singleExpression4ShouldNotHaveClass = function (className) {
    this.singleExpression4.getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) === -1).toBeTruthy();
    });
  };

  this.model = element(by.model('model'));

  this.modelShouldHaveText = function (value) {
    expect(this.model.getText()).toBe(value);
  };

  this.modelShouldHaveClass = function (className) {
    this.model.getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) !== -1).toBeTruthy();
    });
  };

  this.modelShouldNotHaveClass = function (className) {
    this.model.getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) === -1).toBeTruthy();
    });
  };

  this.ngBindP = element(by.exactBinding('ngBindP'));

  this.ngBindPShouldHaveText = function (value) {
    expect(this.ngBindP.getText()).toBe(value);
  };

  this.ngBindPShouldHaveClass = function (className) {
    this.ngBindP.getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) !== -1).toBeTruthy();
    });
  };

  this.ngBindPShouldNotHaveClass = function (className) {
    this.ngBindP.getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) === -1).toBeTruthy();
    });
  };

  this.ngBindHtmlP = element(by.exactBinding('ngBindHtmlP'));

  this.ngBindHtmlPShouldHaveText = function (value) {
    expect(this.ngBindHtmlP.getText()).toBe(value);
  };

  this.ngBindHtmlPShouldHaveClass = function (className) {
    this.ngBindHtmlP.getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) !== -1).toBeTruthy();
    });
  };

  this.ngBindHtmlPShouldNotHaveClass = function (className) {
    this.ngBindHtmlP.getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) === -1).toBeTruthy();
    });
  };

  this.ngBindTemplateP = element(by.exactBinding('ngBindTemplateP'));

  this.ngBindTemplatePShouldHaveText = function (value) {
    expect(this.ngBindTemplateP.getText()).toBe(value);
  };

  this.ngBindTemplatePShouldHaveClass = function (className) {
    this.ngBindTemplateP.getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) !== -1).toBeTruthy();
    });
  };

  this.ngBindTemplatePShouldNotHaveClass = function (className) {
    this.ngBindTemplateP.getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) === -1).toBeTruthy();
    });
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

};

module.exports = new BindingPage();