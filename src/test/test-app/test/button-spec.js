var buttonPage = require('../../../../target/test-classes/buttonPageObject.js');

describe('buttons', function () {

  beforeEach(function () {
    browser.get('http://localhost:3000/resources/button.html');
  });

  it('should generate functional button methods', function () {
    buttonPage.idButtonShouldBeVisible();
    buttonPage.clickIdButton();
    buttonPage.idButtonShouldNotBeVisible();

    buttonPage.nameButtonShouldBeVisible();
    buttonPage.clickNameButton();
    buttonPage.nameButtonShouldNotBeVisible();

    buttonPage.titleButtonShouldBeVisible();
    buttonPage.clickTitleButton();

    buttonPage.singleExpressionButtonShouldBeVisible();
    buttonPage.clickSingleExpressionButton();
    buttonPage.singleExpressionButtonShouldNotBeVisible();

    buttonPage.multiExpressionButtonShouldBeVisible();
    buttonPage.clickMultiExpressionButton();
    buttonPage.multiExpressionButtonShouldNotBeVisible();

    buttonPage.textOnlyButtonShouldBeVisible();
    buttonPage.clickTextOnlyButton();

    buttonPage.submitButtonShouldBeVisible();
    buttonPage.clickSubmitButton();
    buttonPage.submitButtonShouldNotBeVisible();

    buttonPage.inputButtonShouldBeVisible();
    buttonPage.clickInputButton();
    buttonPage.inputButtonShouldNotBeVisible();

    buttonPage.itemButtonShouldBeVisible(0);
    buttonPage.clickItemButton(0);
    buttonPage.itemButtonShouldNotBeVisible(0);

    buttonPage.itemButtonShouldBeVisible(1);
    buttonPage.clickItemButton(1);
    buttonPage.itemButtonShouldNotBeVisible(1);

    buttonPage.elementButtonShouldBeVisible(0, 0);
    buttonPage.clickElementButton(0, 0);
    buttonPage.elementButtonShouldNotBeVisible(0, 0);

    buttonPage.elementButtonShouldBeVisible(0, 1);
    buttonPage.clickElementButton(0, 1);
    buttonPage.elementButtonShouldNotBeVisible(0, 1);

    buttonPage.elementButtonShouldBeVisible(1, 0);
    buttonPage.clickElementButton(1, 0);
    buttonPage.elementButtonShouldNotBeVisible(1, 0);

    buttonPage.elementButtonShouldBeVisible(1, 1);
    buttonPage.clickElementButton(1, 1);
    buttonPage.elementButtonShouldNotBeVisible(1, 1);
  });
});