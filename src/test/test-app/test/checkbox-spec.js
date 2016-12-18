var checkboxesPage = require('../../../../target/test-classes/checkboxPageObject.js');

describe('checkboxes', function () {

  beforeEach(function () {
    browser.get('http://localhost:3000/resources/checkboxes.html');
  });

  it('should generate functional checkbox methods', function () {
    checkboxesPage.onlyIdShouldNotBeSelected();
    checkboxesPage.onlyIdShouldBeVisible();
    checkboxesPage.onlyIdShouldBeEnabled();
    checkboxesPage.clickOnlyId();
    checkboxesPage.onlyIdShouldBeSelected();
    checkboxesPage.onlyIdShouldHaveClass('test');

    checkboxesPage.nameOverrideShouldNotBeEnabled();
    checkboxesPage.nameOverrideShouldNotHaveClass('test');

    checkboxesPage.onlyModelShouldNotBeVisible();

    checkboxesPage.repeatedCheckboxShouldNotBeSelected(0);
    checkboxesPage.repeatedCheckboxShouldNotBeSelected(1);
    checkboxesPage.repeatedCheckboxShouldNotBeSelected(2);
    checkboxesPage.clickRepeatedCheckbox(0);
    checkboxesPage.repeatedCheckboxShouldBeSelected(0);
    checkboxesPage.repeatedCheckboxShouldNotBeSelected(1);
    checkboxesPage.repeatedCheckboxShouldNotBeSelected(2);
    checkboxesPage.clickRepeatedCheckbox(1);
    checkboxesPage.repeatedCheckboxShouldBeSelected(0);
    checkboxesPage.repeatedCheckboxShouldBeSelected(1);
    checkboxesPage.repeatedCheckboxShouldNotBeSelected(2);
    checkboxesPage.clickRepeatedCheckbox(2);
    checkboxesPage.repeatedCheckboxShouldBeSelected(0);
    checkboxesPage.repeatedCheckboxShouldBeSelected(1);
    checkboxesPage.repeatedCheckboxShouldBeSelected(2);
    checkboxesPage.repeatedCheckboxShouldBeVisible(0);
    checkboxesPage.repeatedCheckboxShouldBeVisible(1);
    checkboxesPage.repeatedCheckboxShouldBeVisible(2);
    checkboxesPage.repeatedCheckboxShouldBeEnabled(0);
    checkboxesPage.repeatedCheckboxShouldBeEnabled(1);
    checkboxesPage.repeatedCheckboxShouldBeEnabled(2);
    checkboxesPage.repeatedCheckboxShouldHaveClass(0, 'test');
    checkboxesPage.repeatedCheckboxShouldHaveClass(1, 'test');

    checkboxesPage.nestedRepeaterCheckboxShouldNotBeSelected(0, 0);
    checkboxesPage.nestedRepeaterCheckboxShouldNotBeSelected(1, 1);
    checkboxesPage.nestedRepeaterCheckboxShouldNotBeSelected(2, 2);
    checkboxesPage.clickNestedRepeaterCheckbox(0, 0);
    checkboxesPage.nestedRepeaterCheckboxShouldBeSelected(0, 0);
    checkboxesPage.nestedRepeaterCheckboxShouldNotBeSelected(1, 1);
    checkboxesPage.nestedRepeaterCheckboxShouldNotBeSelected(1, 2);
    checkboxesPage.clickNestedRepeaterCheckbox(1, 1);
    checkboxesPage.nestedRepeaterCheckboxShouldBeSelected(0, 0);
    checkboxesPage.nestedRepeaterCheckboxShouldBeSelected(1, 1);
    checkboxesPage.nestedRepeaterCheckboxShouldNotBeSelected(2, 2);
    checkboxesPage.clickNestedRepeaterCheckbox(2, 2);
    checkboxesPage.nestedRepeaterCheckboxShouldBeSelected(0, 0);
    checkboxesPage.nestedRepeaterCheckboxShouldBeSelected(1, 1);
    checkboxesPage.nestedRepeaterCheckboxShouldBeSelected(2, 2);
    checkboxesPage.nestedRepeaterCheckboxShouldBeVisible(0, 0);
    checkboxesPage.nestedRepeaterCheckboxShouldBeVisible(1, 1);
    checkboxesPage.nestedRepeaterCheckboxShouldBeVisible(2, 2);
    checkboxesPage.nestedRepeaterCheckboxShouldBeEnabled(0, 0);
    checkboxesPage.nestedRepeaterCheckboxShouldBeEnabled(1, 1);
    checkboxesPage.nestedRepeaterCheckboxShouldBeEnabled(2, 2);
    checkboxesPage.nestedRepeaterCheckboxShouldHaveClass(0, 0, 'test');
    checkboxesPage.nestedRepeaterCheckboxShouldHaveClass(1, 1, 'test');
  });
});