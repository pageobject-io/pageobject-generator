var NgClickPage = require('../../test/fixtures/ngClickPageObject.po');

describe('ngclick', function () {

  beforeEach(function () {
    browser.get('http://localhost:3000/ngclick.html');
  });

  it('should generate functional ng-click methods', function () {
    var ngClickPage = new NgClickPage();

    ngClickPage.idDivShouldBeVisible();
    ngClickPage.clickIdDiv();
    ngClickPage.idDivShouldNotBeVisible();

    ngClickPage.nameInputShouldBeVisible();
    ngClickPage.clickNameInput();
    ngClickPage.nameInputShouldNotBeVisible();

    ngClickPage.titleLabelShouldBeVisible();
    ngClickPage.clickTitleLabel();
    ngClickPage.titleLabelShouldNotBeVisible();

    ngClickPage.modelInputShouldBeVisible();
    ngClickPage.clickModelInput();
    ngClickPage.modelInputShouldNotBeVisible();

    ngClickPage.ngOptionsSelectShouldBeVisible();
    ngClickPage.clickNgOptionsSelect();
    ngClickPage.ngOptionsSelectShouldNotBeVisible();

    ngClickPage.singleExpressionShouldBeVisible();
    ngClickPage.clickSingleExpression();
    ngClickPage.singleExpressionShouldNotBeVisible();

    ngClickPage.itemShouldBeVisible(0);
    ngClickPage.clickItem(0);
    ngClickPage.itemShouldNotBeVisible(0);

    ngClickPage.itemShouldBeVisible(1);
    ngClickPage.clickItem(1);
    ngClickPage.itemShouldNotBeVisible(1);

    ngClickPage.elementShouldBeVisible(0, 0);
    ngClickPage.clickElement(0, 0);
    ngClickPage.elementShouldNotBeVisible(0, 0);

    ngClickPage.elementShouldBeVisible(0, 1);
    ngClickPage.clickElement(0, 1);
    ngClickPage.elementShouldNotBeVisible(0, 1);

    ngClickPage.elementShouldBeVisible(1, 0);
    ngClickPage.clickElement(1, 0);
    ngClickPage.elementShouldNotBeVisible(1, 0);

    ngClickPage.elementShouldBeVisible(1, 1);
    ngClickPage.clickElement(1, 1);
    ngClickPage.elementShouldNotBeVisible(1, 1);
  });
});