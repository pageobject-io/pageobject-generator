var SelectPage = function () {

  this.get = function () {
    browser.get('');
  };

  this.unitType = element(by.model('unitType'));

  this.selectUnitTypeByPartialText = function (text) {
    this.unitType.all(by.cssContainingText('option', text)).click();
  };

  this.selectUnitTypeByText = function (text) {
    this.unitType.all(by.xpath('option[.="' + text + '"]')).click();
  };

  this.selectUnitTypeByValue = function (value) {
    this.unitType.all(by.css('option[value="' + value + '"]')).click();
  };

  this.unitTypeByPartialTextShouldBeSelected = function () {
    var expectedOptions = [];
    for (var i = 0; i < arguments.length; i++) {
      expectedOptions = expectedOptions.concat(arguments[i]);
    }

    for (i = 0; i < expectedOptions.length; i++) {
      var options = this.unitType.all(by.cssContainingText('option', expectedOptions[i]));

      options.each(function (option) {
        expect(option.isSelected()).toBeTruthy();
      });

      expect(options.count()).toBeGreaterThan(0);
    }
  };

  this.unitTypeByPartialTextShouldNotBeSelected = function () {
    var expectedOptions = [];
    for (var i = 0; i < arguments.length; i++) {
      expectedOptions = expectedOptions.concat(arguments[i]);
    }

    for (i = 0; i < expectedOptions.length; i++) {
      this.unitType.all(by.cssContainingText('option', expectedOptions[i])).each(function (option) {
        expect(option.isSelected()).toBeFalsy();
      });
    }
  };

  this.unitTypeByTextShouldBeSelected = function () {
    var expectedOptions = [];
    for (var i = 0; i < arguments.length; i++) {
      expectedOptions = expectedOptions.concat(arguments[i]);
    }

    for (i = 0; i < expectedOptions.length; i++) {
      var options = this.unitType.all(by.xpath('option[.="' + expectedOptions[i] + '"]'));

      options.each(function (option) {
        expect(option.isSelected()).toBeTruthy();
      });

      expect(options.count()).toBeGreaterThan(0);
    }
  };

  this.unitTypeByTextShouldNotBeSelected = function () {
    var expectedOptions = [];
    for (var i = 0; i < arguments.length; i++) {
      expectedOptions = expectedOptions.concat(arguments[i]);
    }

    for (i = 0; i < expectedOptions.length; i++) {
      this.unitType.all(by.xpath('option[.="' + expectedOptions[i] + '"]')).each(function (option) {
        expect(option.isSelected()).toBeFalsy();
      });
    }
  };

  this.unitTypeByValueShouldBeSelected = function () {
    var expectedOptions = [];
    for (var i = 0; i < arguments.length; i++) {
      expectedOptions = expectedOptions.concat(arguments[i]);
    }

    for (i = 0; i < expectedOptions.length; i++) {
      var options = this.unitType.all(by.css('option[value="' + expectedOptions[i] + '"]'));

      options.each(function (option) {
        expect(option.isSelected()).toBeTruthy();
      });

      expect(options.count()).toBeGreaterThan(0);
    }
  };

  this.unitTypeByValueShouldNotBeSelected = function () {
    var expectedOptions = [];
    for (var i = 0; i < arguments.length; i++) {
      expectedOptions = expectedOptions.concat(arguments[i]);
    }

    for (i = 0; i < expectedOptions.length; i++) {
      this.unitType.all(by.css('option[value="' + expectedOptions[i] + '"]')).each(function (option) {
        expect(option.isSelected()).toBeFalsy();
      });
    }
  };

  this.unitTypeShouldBeVisible = function () {
    expect(this.unitType.isDisplayed()).toBeTruthy();
  };

  this.unitTypeShouldNotBeVisible = function () {
    expect(this.unitType.isDisplayed()).toBeFalsy();
  };

  this.unitTypeShouldBeEnabled = function () {
    expect(this.unitType.isEnabled()).toBeTruthy();
  };

  this.unitTypeShouldNotBeEnabled = function () {
    expect(this.unitType.isEnabled()).toBeFalsy();
  };

  this.unitTypeShouldHaveClass = function (className) {
    this.unitType.getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) !== -1).toBeTruthy();
    });
  };

  this.unitTypeShouldNotHaveClass = function (className) {
    this.unitType.getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) === -1).toBeTruthy();
    });
  };

  this.multipleUnitType = element(by.model('multipleUnitType'));

  this.selectMultipleUnitTypeByPartialText = function (text) {
    this.multipleUnitType.all(by.cssContainingText('option', text)).click();
  };

  this.selectMultipleUnitTypeByText = function (text) {
    this.multipleUnitType.all(by.xpath('option[.="' + text + '"]')).click();
  };

  this.selectMultipleUnitTypeByValue = function (value) {
    this.multipleUnitType.all(by.css('option[value="' + value + '"]')).click();
  };

  this.multipleUnitTypeByPartialTextShouldBeSelected = function () {
    var expectedOptions = [];
    for (var i = 0; i < arguments.length; i++) {
      expectedOptions = expectedOptions.concat(arguments[i]);
    }

    for (i = 0; i < expectedOptions.length; i++) {
      var options = this.multipleUnitType.all(by.cssContainingText('option', expectedOptions[i]));

      options.each(function (option) {
        expect(option.isSelected()).toBeTruthy();
      });

      expect(options.count()).toBeGreaterThan(0);
    }
  };

  this.multipleUnitTypeByPartialTextShouldNotBeSelected = function () {
    var expectedOptions = [];
    for (var i = 0; i < arguments.length; i++) {
      expectedOptions = expectedOptions.concat(arguments[i]);
    }

    for (i = 0; i < expectedOptions.length; i++) {
      this.multipleUnitType.all(by.cssContainingText('option', expectedOptions[i])).each(function (option) {
        expect(option.isSelected()).toBeFalsy();
      });
    }
  };

  this.multipleUnitTypeByTextShouldBeSelected = function () {
    var expectedOptions = [];
    for (var i = 0; i < arguments.length; i++) {
      expectedOptions = expectedOptions.concat(arguments[i]);
    }

    for (i = 0; i < expectedOptions.length; i++) {
      var options = this.multipleUnitType.all(by.xpath('option[.="' + expectedOptions[i] + '"]'));

      options.each(function (option) {
        expect(option.isSelected()).toBeTruthy();
      });

      expect(options.count()).toBeGreaterThan(0);
    }
  };

  this.multipleUnitTypeByTextShouldNotBeSelected = function () {
    var expectedOptions = [];
    for (var i = 0; i < arguments.length; i++) {
      expectedOptions = expectedOptions.concat(arguments[i]);
    }

    for (i = 0; i < expectedOptions.length; i++) {
      this.multipleUnitType.all(by.xpath('option[.="' + expectedOptions[i] + '"]')).each(function (option) {
        expect(option.isSelected()).toBeFalsy();
      });
    }
  };

  this.multipleUnitTypeByValueShouldBeSelected = function () {
    var expectedOptions = [];
    for (var i = 0; i < arguments.length; i++) {
      expectedOptions = expectedOptions.concat(arguments[i]);
    }

    for (i = 0; i < expectedOptions.length; i++) {
      var options = this.multipleUnitType.all(by.css('option[value="' + expectedOptions[i] + '"]'));

      options.each(function (option) {
        expect(option.isSelected()).toBeTruthy();
      });

      expect(options.count()).toBeGreaterThan(0);
    }
  };

  this.multipleUnitTypeByValueShouldNotBeSelected = function () {
    var expectedOptions = [];
    for (var i = 0; i < arguments.length; i++) {
      expectedOptions = expectedOptions.concat(arguments[i]);
    }

    for (i = 0; i < expectedOptions.length; i++) {
      this.multipleUnitType.all(by.css('option[value="' + expectedOptions[i] + '"]')).each(function (option) {
        expect(option.isSelected()).toBeFalsy();
      });
    }
  };

  this.multipleUnitTypeShouldBeVisible = function () {
    expect(this.multipleUnitType.isDisplayed()).toBeTruthy();
  };

  this.multipleUnitTypeShouldNotBeVisible = function () {
    expect(this.multipleUnitType.isDisplayed()).toBeFalsy();
  };

  this.multipleUnitTypeShouldBeEnabled = function () {
    expect(this.multipleUnitType.isEnabled()).toBeTruthy();
  };

  this.multipleUnitTypeShouldNotBeEnabled = function () {
    expect(this.multipleUnitType.isEnabled()).toBeFalsy();
  };

  this.multipleUnitTypeShouldHaveClass = function (className) {
    this.multipleUnitType.getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) !== -1).toBeTruthy();
    });
  };

  this.multipleUnitTypeShouldNotHaveClass = function (className) {
    this.multipleUnitType.getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) === -1).toBeTruthy();
    });
  };

  this.repeatSelect = element(by.model('data.model'));

  this.selectRepeatSelectByPartialText = function (text) {
    this.repeatSelect.all(by.cssContainingText('option', text)).click();
  };

  this.selectRepeatSelectByText = function (text) {
    this.repeatSelect.all(by.xpath('option[.="' + text + '"]')).click();
  };

  this.selectRepeatSelectByValue = function (value) {
    this.repeatSelect.all(by.css('option[value="' + value + '"]')).click();
  };

  this.repeatSelectByPartialTextShouldBeSelected = function () {
    var expectedOptions = [];
    for (var i = 0; i < arguments.length; i++) {
      expectedOptions = expectedOptions.concat(arguments[i]);
    }

    for (i = 0; i < expectedOptions.length; i++) {
      var options = this.repeatSelect.all(by.cssContainingText('option', expectedOptions[i]));

      options.each(function (option) {
        expect(option.isSelected()).toBeTruthy();
      });

      expect(options.count()).toBeGreaterThan(0);
    }
  };

  this.repeatSelectByPartialTextShouldNotBeSelected = function () {
    var expectedOptions = [];
    for (var i = 0; i < arguments.length; i++) {
      expectedOptions = expectedOptions.concat(arguments[i]);
    }

    for (i = 0; i < expectedOptions.length; i++) {
      this.repeatSelect.all(by.cssContainingText('option', expectedOptions[i])).each(function (option) {
        expect(option.isSelected()).toBeFalsy();
      });
    }
  };

  this.repeatSelectByTextShouldBeSelected = function () {
    var expectedOptions = [];
    for (var i = 0; i < arguments.length; i++) {
      expectedOptions = expectedOptions.concat(arguments[i]);
    }

    for (i = 0; i < expectedOptions.length; i++) {
      var options = this.repeatSelect.all(by.xpath('option[.="' + expectedOptions[i] + '"]'));

      options.each(function (option) {
        expect(option.isSelected()).toBeTruthy();
      });

      expect(options.count()).toBeGreaterThan(0);
    }
  };

  this.repeatSelectByTextShouldNotBeSelected = function () {
    var expectedOptions = [];
    for (var i = 0; i < arguments.length; i++) {
      expectedOptions = expectedOptions.concat(arguments[i]);
    }

    for (i = 0; i < expectedOptions.length; i++) {
      this.repeatSelect.all(by.xpath('option[.="' + expectedOptions[i] + '"]')).each(function (option) {
        expect(option.isSelected()).toBeFalsy();
      });
    }
  };

  this.repeatSelectByValueShouldBeSelected = function () {
    var expectedOptions = [];
    for (var i = 0; i < arguments.length; i++) {
      expectedOptions = expectedOptions.concat(arguments[i]);
    }

    for (i = 0; i < expectedOptions.length; i++) {
      var options = this.repeatSelect.all(by.css('option[value="' + expectedOptions[i] + '"]'));

      options.each(function (option) {
        expect(option.isSelected()).toBeTruthy();
      });

      expect(options.count()).toBeGreaterThan(0);
    }
  };

  this.repeatSelectByValueShouldNotBeSelected = function () {
    var expectedOptions = [];
    for (var i = 0; i < arguments.length; i++) {
      expectedOptions = expectedOptions.concat(arguments[i]);
    }

    for (i = 0; i < expectedOptions.length; i++) {
      this.repeatSelect.all(by.css('option[value="' + expectedOptions[i] + '"]')).each(function (option) {
        expect(option.isSelected()).toBeFalsy();
      });
    }
  };

  this.repeatSelectShouldBeVisible = function () {
    expect(this.repeatSelect.isDisplayed()).toBeTruthy();
  };

  this.repeatSelectShouldNotBeVisible = function () {
    expect(this.repeatSelect.isDisplayed()).toBeFalsy();
  };

  this.repeatSelectShouldBeEnabled = function () {
    expect(this.repeatSelect.isEnabled()).toBeTruthy();
  };

  this.repeatSelectShouldNotBeEnabled = function () {
    expect(this.repeatSelect.isEnabled()).toBeFalsy();
  };

  this.repeatSelectShouldHaveClass = function (className) {
    this.repeatSelect.getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) !== -1).toBeTruthy();
    });
  };

  this.repeatSelectShouldNotHaveClass = function (className) {
    this.repeatSelect.getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) === -1).toBeTruthy();
    });
  };

  this.dataAvailableOptions = element.all(by.exactRepeater('option in data.availableOptions'));

  this.dataAvailableOptionsCountShouldBe = function (count) {
    expect(this.dataAvailableOptions.count()).toBe(count);
  };

  this.dataAvailableOptionsShouldHaveText = function (rowIndex1, value) {
    expect(this.dataAvailableOptions.get(rowIndex1).getText()).toBe(value);
  };

  this.dataAvailableOptionsShouldHaveClass = function (rowIndex1, className) {
    this.dataAvailableOptions.get(rowIndex1).getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) !== -1).toBeTruthy();
    });
  };

  this.dataAvailableOptionsShouldNotHaveClass = function (rowIndex1, className) {
    this.dataAvailableOptions.get(rowIndex1).getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) === -1).toBeTruthy();
    });
  };

  this.ngValueSelect = element(by.model('data1.model'));

  this.selectNgValueSelectByPartialText = function (text) {
    this.ngValueSelect.all(by.cssContainingText('option', text)).click();
  };

  this.selectNgValueSelectByText = function (text) {
    this.ngValueSelect.all(by.xpath('option[.="' + text + '"]')).click();
  };

  this.selectNgValueSelectByValue = function (value) {
    this.ngValueSelect.all(by.css('option[value="' + value + '"]')).click();
  };

  this.ngValueSelectByPartialTextShouldBeSelected = function () {
    var expectedOptions = [];
    for (var i = 0; i < arguments.length; i++) {
      expectedOptions = expectedOptions.concat(arguments[i]);
    }

    for (i = 0; i < expectedOptions.length; i++) {
      var options = this.ngValueSelect.all(by.cssContainingText('option', expectedOptions[i]));

      options.each(function (option) {
        expect(option.isSelected()).toBeTruthy();
      });

      expect(options.count()).toBeGreaterThan(0);
    }
  };

  this.ngValueSelectByPartialTextShouldNotBeSelected = function () {
    var expectedOptions = [];
    for (var i = 0; i < arguments.length; i++) {
      expectedOptions = expectedOptions.concat(arguments[i]);
    }

    for (i = 0; i < expectedOptions.length; i++) {
      this.ngValueSelect.all(by.cssContainingText('option', expectedOptions[i])).each(function (option) {
        expect(option.isSelected()).toBeFalsy();
      });
    }
  };

  this.ngValueSelectByTextShouldBeSelected = function () {
    var expectedOptions = [];
    for (var i = 0; i < arguments.length; i++) {
      expectedOptions = expectedOptions.concat(arguments[i]);
    }

    for (i = 0; i < expectedOptions.length; i++) {
      var options = this.ngValueSelect.all(by.xpath('option[.="' + expectedOptions[i] + '"]'));

      options.each(function (option) {
        expect(option.isSelected()).toBeTruthy();
      });

      expect(options.count()).toBeGreaterThan(0);
    }
  };

  this.ngValueSelectByTextShouldNotBeSelected = function () {
    var expectedOptions = [];
    for (var i = 0; i < arguments.length; i++) {
      expectedOptions = expectedOptions.concat(arguments[i]);
    }

    for (i = 0; i < expectedOptions.length; i++) {
      this.ngValueSelect.all(by.xpath('option[.="' + expectedOptions[i] + '"]')).each(function (option) {
        expect(option.isSelected()).toBeFalsy();
      });
    }
  };

  this.ngValueSelectByValueShouldBeSelected = function () {
    var expectedOptions = [];
    for (var i = 0; i < arguments.length; i++) {
      expectedOptions = expectedOptions.concat(arguments[i]);
    }

    for (i = 0; i < expectedOptions.length; i++) {
      var options = this.ngValueSelect.all(by.css('option[value="' + expectedOptions[i] + '"]'));

      options.each(function (option) {
        expect(option.isSelected()).toBeTruthy();
      });

      expect(options.count()).toBeGreaterThan(0);
    }
  };

  this.ngValueSelectByValueShouldNotBeSelected = function () {
    var expectedOptions = [];
    for (var i = 0; i < arguments.length; i++) {
      expectedOptions = expectedOptions.concat(arguments[i]);
    }

    for (i = 0; i < expectedOptions.length; i++) {
      this.ngValueSelect.all(by.css('option[value="' + expectedOptions[i] + '"]')).each(function (option) {
        expect(option.isSelected()).toBeFalsy();
      });
    }
  };

  this.ngValueSelectShouldBeVisible = function () {
    expect(this.ngValueSelect.isDisplayed()).toBeTruthy();
  };

  this.ngValueSelectShouldNotBeVisible = function () {
    expect(this.ngValueSelect.isDisplayed()).toBeFalsy();
  };

  this.ngValueSelectShouldBeEnabled = function () {
    expect(this.ngValueSelect.isEnabled()).toBeTruthy();
  };

  this.ngValueSelectShouldNotBeEnabled = function () {
    expect(this.ngValueSelect.isEnabled()).toBeFalsy();
  };

  this.ngValueSelectShouldHaveClass = function (className) {
    this.ngValueSelect.getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) !== -1).toBeTruthy();
    });
  };

  this.ngValueSelectShouldNotHaveClass = function (className) {
    this.ngValueSelect.getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) === -1).toBeTruthy();
    });
  };

  this.data1AvailableOptions = element.all(by.exactRepeater('option in data1.availableOptions'));

  this.data1AvailableOptionsCountShouldBe = function (count) {
    expect(this.data1AvailableOptions.count()).toBe(count);
  };

  this.data1AvailableOptionsShouldHaveText = function (rowIndex1, value) {
    expect(this.data1AvailableOptions.get(rowIndex1).getText()).toBe(value);
  };

  this.data1AvailableOptionsShouldHaveClass = function (rowIndex1, className) {
    this.data1AvailableOptions.get(rowIndex1).getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) !== -1).toBeTruthy();
    });
  };

  this.data1AvailableOptionsShouldNotHaveClass = function (rowIndex1, className) {
    this.data1AvailableOptions.get(rowIndex1).getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) === -1).toBeTruthy();
    });
  };

  this.ngOptionsSelect = element(by.model('data3.selectedOption'));

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

  this.selectRepeaterUnitTypeByPartialText = function (rowIndex1, text) {
    this.items.get(rowIndex1).element(by.model('repeaterUnitType')).all(by.cssContainingText('option', text)).click();
  };

  this.selectRepeaterUnitTypeByText = function (rowIndex1, text) {
    this.items.get(rowIndex1).element(by.model('repeaterUnitType')).all(by.xpath('option[.="' + text + '"]')).click();
  };

  this.selectRepeaterUnitTypeByValue = function (rowIndex1, value) {
    this.items.get(rowIndex1).element(by.model('repeaterUnitType')).all(by.css('option[value="' + value + '"]')).click();
  };

  this.repeaterUnitTypeByPartialTextShouldBeSelected = function (rowIndex1) {
    var expectedOptions = [];
    for (var i = 1; i < arguments.length; i++) {
      expectedOptions = expectedOptions.concat(arguments[i]);
    }

    for (i = 0; i < expectedOptions.length; i++) {
      var options = this.items.get(rowIndex1).element(by.model('repeaterUnitType')).all(by.cssContainingText('option', expectedOptions[i]));

      options.each(function (option) {
        expect(option.isSelected()).toBeTruthy();
      });

      expect(options.count()).toBeGreaterThan(0);
    }
  };

  this.repeaterUnitTypeByPartialTextShouldNotBeSelected = function (rowIndex1) {
    var expectedOptions = [];
    for (var i = 1; i < arguments.length; i++) {
      expectedOptions = expectedOptions.concat(arguments[i]);
    }

    for (i = 0; i < expectedOptions.length; i++) {
      this.items.get(rowIndex1).element(by.model('repeaterUnitType')).all(by.cssContainingText('option', expectedOptions[i])).each(function (option) {
        expect(option.isSelected()).toBeFalsy();
      });
    }
  };

  this.repeaterUnitTypeByTextShouldBeSelected = function (rowIndex1) {
    var expectedOptions = [];
    for (var i = 1; i < arguments.length; i++) {
      expectedOptions = expectedOptions.concat(arguments[i]);
    }

    for (i = 0; i < expectedOptions.length; i++) {
      var options = this.items.get(rowIndex1).element(by.model('repeaterUnitType')).all(by.xpath('option[.="' + expectedOptions[i] + '"]'));

      options.each(function (option) {
        expect(option.isSelected()).toBeTruthy();
      });

      expect(options.count()).toBeGreaterThan(0);
    }
  };

  this.repeaterUnitTypeByTextShouldNotBeSelected = function (rowIndex1) {
    var expectedOptions = [];
    for (var i = 1; i < arguments.length; i++) {
      expectedOptions = expectedOptions.concat(arguments[i]);
    }

    for (i = 0; i < expectedOptions.length; i++) {
      this.items.get(rowIndex1).element(by.model('repeaterUnitType')).all(by.xpath('option[.="' + expectedOptions[i] + '"]')).each(function (option) {
        expect(option.isSelected()).toBeFalsy();
      });
    }
  };

  this.repeaterUnitTypeByValueShouldBeSelected = function (rowIndex1) {
    var expectedOptions = [];
    for (var i = 1; i < arguments.length; i++) {
      expectedOptions = expectedOptions.concat(arguments[i]);
    }

    for (i = 0; i < expectedOptions.length; i++) {
      var options = this.items.get(rowIndex1).element(by.model('repeaterUnitType')).all(by.css('option[value="' + expectedOptions[i] + '"]'));

      options.each(function (option) {
        expect(option.isSelected()).toBeTruthy();
      });

      expect(options.count()).toBeGreaterThan(0);
    }
  };

  this.repeaterUnitTypeByValueShouldNotBeSelected = function (rowIndex1) {
    var expectedOptions = [];
    for (var i = 1; i < arguments.length; i++) {
      expectedOptions = expectedOptions.concat(arguments[i]);
    }

    for (i = 0; i < expectedOptions.length; i++) {
      this.items.get(rowIndex1).element(by.model('repeaterUnitType')).all(by.css('option[value="' + expectedOptions[i] + '"]')).each(function (option) {
        expect(option.isSelected()).toBeFalsy();
      });
    }
  };

  this.repeaterUnitTypeShouldBeVisible = function (rowIndex1) {
    expect(this.items.get(rowIndex1).element(by.model('repeaterUnitType')).isDisplayed()).toBeTruthy();
  };

  this.repeaterUnitTypeShouldNotBeVisible = function (rowIndex1) {
    expect(this.items.get(rowIndex1).element(by.model('repeaterUnitType')).isDisplayed()).toBeFalsy();
  };

  this.repeaterUnitTypeShouldBeEnabled = function (rowIndex1) {
    expect(this.items.get(rowIndex1).element(by.model('repeaterUnitType')).isEnabled()).toBeTruthy();
  };

  this.repeaterUnitTypeShouldNotBeEnabled = function (rowIndex1) {
    expect(this.items.get(rowIndex1).element(by.model('repeaterUnitType')).isEnabled()).toBeFalsy();
  };

  this.repeaterUnitTypeShouldHaveClass = function (rowIndex1, className) {
    this.items.get(rowIndex1).element(by.model('repeaterUnitType')).getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) !== -1).toBeTruthy();
    });
  };

  this.repeaterUnitTypeShouldNotHaveClass = function (rowIndex1, className) {
    this.items.get(rowIndex1).element(by.model('repeaterUnitType')).getAttribute('class').then(function (classes) {
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

  this.selectNestedRepeaterUnitTypeByPartialText = function (rowIndex1, rowIndex2, text) {
    this.items.get(rowIndex1).element(by.exactRepeater('element in elements').row(rowIndex2)).element(by.model('nestedRepeaterUnitType')).all(by.cssContainingText('option', text)).click();
  };

  this.selectNestedRepeaterUnitTypeByText = function (rowIndex1, rowIndex2, text) {
    this.items.get(rowIndex1).element(by.exactRepeater('element in elements').row(rowIndex2)).element(by.model('nestedRepeaterUnitType')).all(by.xpath('option[.="' + text + '"]')).click();
  };

  this.selectNestedRepeaterUnitTypeByValue = function (rowIndex1, rowIndex2, value) {
    this.items.get(rowIndex1).element(by.exactRepeater('element in elements').row(rowIndex2)).element(by.model('nestedRepeaterUnitType')).all(by.css('option[value="' + value + '"]')).click();
  };

  this.nestedRepeaterUnitTypeByPartialTextShouldBeSelected = function (rowIndex1, rowIndex2) {
    var expectedOptions = [];
    for (var i = 2; i < arguments.length; i++) {
      expectedOptions = expectedOptions.concat(arguments[i]);
    }

    for (i = 0; i < expectedOptions.length; i++) {
      var options = this.items.get(rowIndex1).element(by.exactRepeater('element in elements').row(rowIndex2)).element(by.model('nestedRepeaterUnitType')).all(by.cssContainingText('option', expectedOptions[i]));

      options.each(function (option) {
        expect(option.isSelected()).toBeTruthy();
      });

      expect(options.count()).toBeGreaterThan(0);
    }
  };

  this.nestedRepeaterUnitTypeByPartialTextShouldNotBeSelected = function (rowIndex1, rowIndex2) {
    var expectedOptions = [];
    for (var i = 2; i < arguments.length; i++) {
      expectedOptions = expectedOptions.concat(arguments[i]);
    }

    for (i = 0; i < expectedOptions.length; i++) {
      this.items.get(rowIndex1).element(by.exactRepeater('element in elements').row(rowIndex2)).element(by.model('nestedRepeaterUnitType')).all(by.cssContainingText('option', expectedOptions[i])).each(function (option) {
        expect(option.isSelected()).toBeFalsy();
      });
    }
  };

  this.nestedRepeaterUnitTypeByTextShouldBeSelected = function (rowIndex1, rowIndex2) {
    var expectedOptions = [];
    for (var i = 2; i < arguments.length; i++) {
      expectedOptions = expectedOptions.concat(arguments[i]);
    }

    for (i = 0; i < expectedOptions.length; i++) {
      var options = this.items.get(rowIndex1).element(by.exactRepeater('element in elements').row(rowIndex2)).element(by.model('nestedRepeaterUnitType')).all(by.xpath('option[.="' + expectedOptions[i] + '"]'));

      options.each(function (option) {
        expect(option.isSelected()).toBeTruthy();
      });

      expect(options.count()).toBeGreaterThan(0);
    }
  };

  this.nestedRepeaterUnitTypeByTextShouldNotBeSelected = function (rowIndex1, rowIndex2) {
    var expectedOptions = [];
    for (var i = 2; i < arguments.length; i++) {
      expectedOptions = expectedOptions.concat(arguments[i]);
    }

    for (i = 0; i < expectedOptions.length; i++) {
      this.items.get(rowIndex1).element(by.exactRepeater('element in elements').row(rowIndex2)).element(by.model('nestedRepeaterUnitType')).all(by.xpath('option[.="' + expectedOptions[i] + '"]')).each(function (option) {
        expect(option.isSelected()).toBeFalsy();
      });
    }
  };

  this.nestedRepeaterUnitTypeByValueShouldBeSelected = function (rowIndex1, rowIndex2) {
    var expectedOptions = [];
    for (var i = 2; i < arguments.length; i++) {
      expectedOptions = expectedOptions.concat(arguments[i]);
    }

    for (i = 0; i < expectedOptions.length; i++) {
      var options = this.items.get(rowIndex1).element(by.exactRepeater('element in elements').row(rowIndex2)).element(by.model('nestedRepeaterUnitType')).all(by.css('option[value="' + expectedOptions[i] + '"]'));

      options.each(function (option) {
        expect(option.isSelected()).toBeTruthy();
      });

      expect(options.count()).toBeGreaterThan(0);
    }
  };

  this.nestedRepeaterUnitTypeByValueShouldNotBeSelected = function (rowIndex1, rowIndex2) {
    var expectedOptions = [];
    for (var i = 2; i < arguments.length; i++) {
      expectedOptions = expectedOptions.concat(arguments[i]);
    }

    for (i = 0; i < expectedOptions.length; i++) {
      this.items.get(rowIndex1).element(by.exactRepeater('element in elements').row(rowIndex2)).element(by.model('nestedRepeaterUnitType')).all(by.css('option[value="' + expectedOptions[i] + '"]')).each(function (option) {
        expect(option.isSelected()).toBeFalsy();
      });
    }
  };

  this.nestedRepeaterUnitTypeShouldBeVisible = function (rowIndex1, rowIndex2) {
    expect(this.items.get(rowIndex1).element(by.exactRepeater('element in elements').row(rowIndex2)).element(by.model('nestedRepeaterUnitType')).isDisplayed()).toBeTruthy();
  };

  this.nestedRepeaterUnitTypeShouldNotBeVisible = function (rowIndex1, rowIndex2) {
    expect(this.items.get(rowIndex1).element(by.exactRepeater('element in elements').row(rowIndex2)).element(by.model('nestedRepeaterUnitType')).isDisplayed()).toBeFalsy();
  };

  this.nestedRepeaterUnitTypeShouldBeEnabled = function (rowIndex1, rowIndex2) {
    expect(this.items.get(rowIndex1).element(by.exactRepeater('element in elements').row(rowIndex2)).element(by.model('nestedRepeaterUnitType')).isEnabled()).toBeTruthy();
  };

  this.nestedRepeaterUnitTypeShouldNotBeEnabled = function (rowIndex1, rowIndex2) {
    expect(this.items.get(rowIndex1).element(by.exactRepeater('element in elements').row(rowIndex2)).element(by.model('nestedRepeaterUnitType')).isEnabled()).toBeFalsy();
  };

  this.nestedRepeaterUnitTypeShouldHaveClass = function (rowIndex1, rowIndex2, className) {
    this.items.get(rowIndex1).element(by.exactRepeater('element in elements').row(rowIndex2)).element(by.model('nestedRepeaterUnitType')).getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) !== -1).toBeTruthy();
    });
  };

  this.nestedRepeaterUnitTypeShouldNotHaveClass = function (rowIndex1, rowIndex2, className) {
    this.items.get(rowIndex1).element(by.exactRepeater('element in elements').row(rowIndex2)).element(by.model('nestedRepeaterUnitType')).getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) === -1).toBeTruthy();
    });
  };

};

module.exports = new SelectPage();