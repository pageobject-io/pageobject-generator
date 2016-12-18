var RadioPage = function () {

  this.get = function () {
    browser.get('');
  };

  this.color = element.all(by.model('color'));

  this.clickColorByIndex = function (index) {
    this.color.get(index).click();
  };

  this.clickColorByValue = function (value) {
    this.color.filter(function (elem) {
      return elem.getAttribute('value').then(function (attribute) {
        return attribute === value;
      });
    }).then(function (filteredElements) {
      filteredElements[0].click();
    });
  };

  this.colorByIndexShouldBeSelected = function (index) {
    expect(this.color.get(index).isSelected()).toBeTruthy();
  };

  this.colorByIndexShouldNotBeSelected = function (index) {
    expect(this.color.get(index).isSelected()).toBeFalsy();
  };

  this.colorByValueShouldBeSelected = function (value) {
    this.color.filter(function (elem) {
      return elem.isSelected();
    }).then(function (filteredElements) {
      expect(filteredElements[0].getAttribute('value')).toEqual(value);
    });
  };

  this.colorByValueShouldNotBeSelected = function (value) {
    this.color.filter(function (elem) {
      return elem.isSelected();
    }).then(function (filteredElements) {
      if (filteredElements.length > 0) {
        expect(filteredElements[0].getAttribute('value')).not.toEqual(value);
      }
    });
  };

  this.colorByIndexShouldBeVisible = function (index) {
    expect(this.color.get(index).isDisplayed()).toBeTruthy();
  };

  this.colorByIndexShouldNotBeVisible = function (index) {
    expect(this.color.get(index).isDisplayed()).toBeFalsy();
  };

  this.colorByIndexShouldBeEnabled = function (index) {
    expect(this.color.get(index).isEnabled()).toBeTruthy();
  };

  this.colorByIndexShouldNotBeEnabled = function (index) {
    expect(this.color.get(index).isEnabled()).toBeFalsy();
  };

  this.colorShouldHaveClass = function (className) {
    this.color.getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) !== -1).toBeTruthy();
    });
  };

  this.colorShouldNotHaveClass = function (className) {
    this.color.getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) === -1).toBeTruthy();
    });
  };

  this.width = element.all(by.name('width'));

  this.clickWidthByIndex = function (index) {
    this.width.get(index).click();
  };

  this.clickWidthByValue = function (value) {
    this.width.filter(function (elem) {
      return elem.getAttribute('value').then(function (attribute) {
        return attribute === value;
      });
    }).then(function (filteredElements) {
      filteredElements[0].click();
    });
  };

  this.widthByIndexShouldBeSelected = function (index) {
    expect(this.width.get(index).isSelected()).toBeTruthy();
  };

  this.widthByIndexShouldNotBeSelected = function (index) {
    expect(this.width.get(index).isSelected()).toBeFalsy();
  };

  this.widthByValueShouldBeSelected = function (value) {
    this.width.filter(function (elem) {
      return elem.isSelected();
    }).then(function (filteredElements) {
      expect(filteredElements[0].getAttribute('value')).toEqual(value);
    });
  };

  this.widthByValueShouldNotBeSelected = function (value) {
    this.width.filter(function (elem) {
      return elem.isSelected();
    }).then(function (filteredElements) {
      if (filteredElements.length > 0) {
        expect(filteredElements[0].getAttribute('value')).not.toEqual(value);
      }
    });
  };

  this.widthByIndexShouldBeVisible = function (index) {
    expect(this.width.get(index).isDisplayed()).toBeTruthy();
  };

  this.widthByIndexShouldNotBeVisible = function (index) {
    expect(this.width.get(index).isDisplayed()).toBeFalsy();
  };

  this.widthByIndexShouldBeEnabled = function (index) {
    expect(this.width.get(index).isEnabled()).toBeTruthy();
  };

  this.widthByIndexShouldNotBeEnabled = function (index) {
    expect(this.width.get(index).isEnabled()).toBeFalsy();
  };

  this.widthShouldHaveClass = function (className) {
    this.width.getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) !== -1).toBeTruthy();
    });
  };

  this.widthShouldNotHaveClass = function (className) {
    this.width.getAttribute('class').then(function (classes) {
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

  this.selectedItem = element.all(by.model('selected.item'));

  this.clickSelectedItemByIndex = function (index) {
    this.selectedItem.get(index).click();
  };

  this.clickSelectedItemByValue = function (value) {
    this.selectedItem.filter(function (elem) {
      return elem.getAttribute('value').then(function (attribute) {
        return attribute === value;
      });
    }).then(function (filteredElements) {
      filteredElements[0].click();
    });
  };

  this.selectedItemByIndexShouldBeSelected = function (index) {
    expect(this.selectedItem.get(index).isSelected()).toBeTruthy();
  };

  this.selectedItemByIndexShouldNotBeSelected = function (index) {
    expect(this.selectedItem.get(index).isSelected()).toBeFalsy();
  };

  this.selectedItemByValueShouldBeSelected = function (value) {
    this.selectedItem.filter(function (elem) {
      return elem.isSelected();
    }).then(function (filteredElements) {
      expect(filteredElements[0].getAttribute('value')).toEqual(value);
    });
  };

  this.selectedItemByValueShouldNotBeSelected = function (value) {
    this.selectedItem.filter(function (elem) {
      return elem.isSelected();
    }).then(function (filteredElements) {
      if (filteredElements.length > 0) {
        expect(filteredElements[0].getAttribute('value')).not.toEqual(value);
      }
    });
  };

  this.selectedItemByIndexShouldBeVisible = function (index) {
    expect(this.selectedItem.get(index).isDisplayed()).toBeTruthy();
  };

  this.selectedItemByIndexShouldNotBeVisible = function (index) {
    expect(this.selectedItem.get(index).isDisplayed()).toBeFalsy();
  };

  this.selectedItemByIndexShouldBeEnabled = function (index) {
    expect(this.selectedItem.get(index).isEnabled()).toBeTruthy();
  };

  this.selectedItemByIndexShouldNotBeEnabled = function (index) {
    expect(this.selectedItem.get(index).isEnabled()).toBeFalsy();
  };

  this.selectedItemShouldHaveClass = function (className) {
    this.selectedItem.getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) !== -1).toBeTruthy();
    });
  };

  this.selectedItemShouldNotHaveClass = function (className) {
    this.selectedItem.getAttribute('class').then(function (classes) {
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

  this.clickNestedRepeaterRadioFieldByIndex = function (rowIndex1, index) {
    this.items.get(rowIndex1).all(by.model('nested.repeaterRadioField[$parent.$index]')).get(index).click();
  };

  this.clickNestedRepeaterRadioFieldByValue = function (rowIndex1, value) {
    this.items.get(rowIndex1).all(by.model('nested.repeaterRadioField[$parent.$index]')).filter(function (elem) {
      return elem.getAttribute('value').then(function (attribute) {
        return attribute === value;
      });
    }).then(function (filteredElements) {
      filteredElements[0].click();
    });
  };

  this.nestedRepeaterRadioFieldByIndexShouldBeSelected = function (rowIndex1, index) {
    expect(this.items.get(rowIndex1).all(by.model('nested.repeaterRadioField[$parent.$index]')).get(index).isSelected()).toBeTruthy();
  };

  this.nestedRepeaterRadioFieldByIndexShouldNotBeSelected = function (rowIndex1, index) {
    expect(this.items.get(rowIndex1).all(by.model('nested.repeaterRadioField[$parent.$index]')).get(index).isSelected()).toBeFalsy();
  };

  this.nestedRepeaterRadioFieldByValueShouldBeSelected = function (rowIndex1, value) {
    this.items.get(rowIndex1).all(by.model('nested.repeaterRadioField[$parent.$index]')).filter(function (elem) {
      return elem.isSelected();
    }).then(function (filteredElements) {
      expect(filteredElements[0].getAttribute('value')).toEqual(value);
    });
  };

  this.nestedRepeaterRadioFieldByValueShouldNotBeSelected = function (rowIndex1, value) {
    this.items.get(rowIndex1).all(by.model('nested.repeaterRadioField[$parent.$index]')).filter(function (elem) {
      return elem.isSelected();
    }).then(function (filteredElements) {
      if (filteredElements.length > 0) {
        expect(filteredElements[0].getAttribute('value')).not.toEqual(value);
      }
    });
  };

  this.nestedRepeaterRadioFieldByIndexShouldBeVisible = function (rowIndex1, index) {
    expect(this.items.get(rowIndex1).all(by.model('nested.repeaterRadioField[$parent.$index]')).get(index).isDisplayed()).toBeTruthy();
  };

  this.nestedRepeaterRadioFieldByIndexShouldNotBeVisible = function (rowIndex1, index) {
    expect(this.items.get(rowIndex1).all(by.model('nested.repeaterRadioField[$parent.$index]')).get(index).isDisplayed()).toBeFalsy();
  };

  this.nestedRepeaterRadioFieldByIndexShouldBeEnabled = function (rowIndex1, index) {
    expect(this.items.get(rowIndex1).all(by.model('nested.repeaterRadioField[$parent.$index]')).get(index).isEnabled()).toBeTruthy();
  };

  this.nestedRepeaterRadioFieldByIndexShouldNotBeEnabled = function (rowIndex1, index) {
    expect(this.items.get(rowIndex1).all(by.model('nested.repeaterRadioField[$parent.$index]')).get(index).isEnabled()).toBeFalsy();
  };

  this.nestedRepeaterRadioFieldShouldHaveClass = function (rowIndex1, className) {
    this.items.get(rowIndex1).all(by.model('nested.repeaterRadioField[$parent.$index]')).getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) !== -1).toBeTruthy();
    });
  };

  this.nestedRepeaterRadioFieldShouldNotHaveClass = function (rowIndex1, className) {
    this.items.get(rowIndex1).all(by.model('nested.repeaterRadioField[$parent.$index]')).getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) === -1).toBeTruthy();
    });
  };

  this.clickNested2RepeaterRadioField2ByIndex = function (rowIndex1, rowIndex2, index) {
    this.items.get(rowIndex1).element(by.exactRepeater('element in elements').row(rowIndex2)).all(by.model('nested2[$parent.$index].repeaterRadioField2[$index]')).get(index).click();
  };

  this.clickNested2RepeaterRadioField2ByValue = function (rowIndex1, rowIndex2, value) {
    this.items.get(rowIndex1).element(by.exactRepeater('element in elements').row(rowIndex2)).all(by.model('nested2[$parent.$index].repeaterRadioField2[$index]')).filter(function (elem) {
      return elem.getAttribute('value').then(function (attribute) {
        return attribute === value;
      });
    }).then(function (filteredElements) {
      filteredElements[0].click();
    });
  };

  this.nested2RepeaterRadioField2ByIndexShouldBeSelected = function (rowIndex1, rowIndex2, index) {
    expect(this.items.get(rowIndex1).element(by.exactRepeater('element in elements').row(rowIndex2)).all(by.model('nested2[$parent.$index].repeaterRadioField2[$index]')).get(index).isSelected()).toBeTruthy();
  };

  this.nested2RepeaterRadioField2ByIndexShouldNotBeSelected = function (rowIndex1, rowIndex2, index) {
    expect(this.items.get(rowIndex1).element(by.exactRepeater('element in elements').row(rowIndex2)).all(by.model('nested2[$parent.$index].repeaterRadioField2[$index]')).get(index).isSelected()).toBeFalsy();
  };

  this.nested2RepeaterRadioField2ByValueShouldBeSelected = function (rowIndex1, rowIndex2, value) {
    this.items.get(rowIndex1).element(by.exactRepeater('element in elements').row(rowIndex2)).all(by.model('nested2[$parent.$index].repeaterRadioField2[$index]')).filter(function (elem) {
      return elem.isSelected();
    }).then(function (filteredElements) {
      expect(filteredElements[0].getAttribute('value')).toEqual(value);
    });
  };

  this.nested2RepeaterRadioField2ByValueShouldNotBeSelected = function (rowIndex1, rowIndex2, value) {
    this.items.get(rowIndex1).element(by.exactRepeater('element in elements').row(rowIndex2)).all(by.model('nested2[$parent.$index].repeaterRadioField2[$index]')).filter(function (elem) {
      return elem.isSelected();
    }).then(function (filteredElements) {
      if (filteredElements.length > 0) {
        expect(filteredElements[0].getAttribute('value')).not.toEqual(value);
      }
    });
  };

  this.nested2RepeaterRadioField2ByIndexShouldBeVisible = function (rowIndex1, rowIndex2, index) {
    expect(this.items.get(rowIndex1).element(by.exactRepeater('element in elements').row(rowIndex2)).all(by.model('nested2[$parent.$index].repeaterRadioField2[$index]')).get(index).isDisplayed()).toBeTruthy();
  };

  this.nested2RepeaterRadioField2ByIndexShouldNotBeVisible = function (rowIndex1, rowIndex2, index) {
    expect(this.items.get(rowIndex1).element(by.exactRepeater('element in elements').row(rowIndex2)).all(by.model('nested2[$parent.$index].repeaterRadioField2[$index]')).get(index).isDisplayed()).toBeFalsy();
  };

  this.nested2RepeaterRadioField2ByIndexShouldBeEnabled = function (rowIndex1, rowIndex2, index) {
    expect(this.items.get(rowIndex1).element(by.exactRepeater('element in elements').row(rowIndex2)).all(by.model('nested2[$parent.$index].repeaterRadioField2[$index]')).get(index).isEnabled()).toBeTruthy();
  };

  this.nested2RepeaterRadioField2ByIndexShouldNotBeEnabled = function (rowIndex1, rowIndex2, index) {
    expect(this.items.get(rowIndex1).element(by.exactRepeater('element in elements').row(rowIndex2)).all(by.model('nested2[$parent.$index].repeaterRadioField2[$index]')).get(index).isEnabled()).toBeFalsy();
  };

  this.nested2RepeaterRadioField2ShouldHaveClass = function (rowIndex1, rowIndex2, className) {
    this.items.get(rowIndex1).element(by.exactRepeater('element in elements').row(rowIndex2)).all(by.model('nested2[$parent.$index].repeaterRadioField2[$index]')).getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) !== -1).toBeTruthy();
    });
  };

  this.nested2RepeaterRadioField2ShouldNotHaveClass = function (rowIndex1, rowIndex2, className) {
    this.items.get(rowIndex1).element(by.exactRepeater('element in elements').row(rowIndex2)).all(by.model('nested2[$parent.$index].repeaterRadioField2[$index]')).getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) === -1).toBeTruthy();
    });
  };

  this.otherItems = element.all(by.exactRepeater('item in otherItems'));

  this.otherItemsCountShouldBe = function (count) {
    expect(this.otherItems.count()).toBe(count);
  };

  this.otherItemsShouldHaveText = function (rowIndex1, value) {
    expect(this.otherItems.get(rowIndex1).getText()).toBe(value);
  };

  this.otherItemsShouldHaveClass = function (rowIndex1, className) {
    this.otherItems.get(rowIndex1).getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) !== -1).toBeTruthy();
    });
  };

  this.otherItemsShouldNotHaveClass = function (rowIndex1, className) {
    this.otherItems.get(rowIndex1).getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) === -1).toBeTruthy();
    });
  };

  this.clickSelected2ItemByIndex = function (rowIndex1, index) {
    this.otherItems.get(rowIndex1).all(by.model('selected2[$index].item')).get(index).click();
  };

  this.clickSelected2ItemByValue = function (rowIndex1, value) {
    this.otherItems.get(rowIndex1).all(by.model('selected2[$index].item')).filter(function (elem) {
      return elem.getAttribute('value').then(function (attribute) {
        return attribute === value;
      });
    }).then(function (filteredElements) {
      filteredElements[0].click();
    });
  };

  this.selected2ItemByIndexShouldBeSelected = function (rowIndex1, index) {
    expect(this.otherItems.get(rowIndex1).all(by.model('selected2[$index].item')).get(index).isSelected()).toBeTruthy();
  };

  this.selected2ItemByIndexShouldNotBeSelected = function (rowIndex1, index) {
    expect(this.otherItems.get(rowIndex1).all(by.model('selected2[$index].item')).get(index).isSelected()).toBeFalsy();
  };

  this.selected2ItemByValueShouldBeSelected = function (rowIndex1, value) {
    this.otherItems.get(rowIndex1).all(by.model('selected2[$index].item')).filter(function (elem) {
      return elem.isSelected();
    }).then(function (filteredElements) {
      expect(filteredElements[0].getAttribute('value')).toEqual(value);
    });
  };

  this.selected2ItemByValueShouldNotBeSelected = function (rowIndex1, value) {
    this.otherItems.get(rowIndex1).all(by.model('selected2[$index].item')).filter(function (elem) {
      return elem.isSelected();
    }).then(function (filteredElements) {
      if (filteredElements.length > 0) {
        expect(filteredElements[0].getAttribute('value')).not.toEqual(value);
      }
    });
  };

  this.selected2ItemByIndexShouldBeVisible = function (rowIndex1, index) {
    expect(this.otherItems.get(rowIndex1).all(by.model('selected2[$index].item')).get(index).isDisplayed()).toBeTruthy();
  };

  this.selected2ItemByIndexShouldNotBeVisible = function (rowIndex1, index) {
    expect(this.otherItems.get(rowIndex1).all(by.model('selected2[$index].item')).get(index).isDisplayed()).toBeFalsy();
  };

  this.selected2ItemByIndexShouldBeEnabled = function (rowIndex1, index) {
    expect(this.otherItems.get(rowIndex1).all(by.model('selected2[$index].item')).get(index).isEnabled()).toBeTruthy();
  };

  this.selected2ItemByIndexShouldNotBeEnabled = function (rowIndex1, index) {
    expect(this.otherItems.get(rowIndex1).all(by.model('selected2[$index].item')).get(index).isEnabled()).toBeFalsy();
  };

  this.selected2ItemShouldHaveClass = function (rowIndex1, className) {
    this.otherItems.get(rowIndex1).all(by.model('selected2[$index].item')).getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) !== -1).toBeTruthy();
    });
  };

  this.selected2ItemShouldNotHaveClass = function (rowIndex1, className) {
    this.otherItems.get(rowIndex1).all(by.model('selected2[$index].item')).getAttribute('class').then(function (classes) {
      expect(classes.split(' ').indexOf(className) === -1).toBeTruthy();
    });
  };

};

module.exports = new RadioPage();