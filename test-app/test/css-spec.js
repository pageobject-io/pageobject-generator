var CssPage = require('../../test/fixtures/cssPageObject.po');

describe('css selectors', function () {

  beforeEach(function () {
    browser.get('http://localhost:3000/css.html');
  });

  it('should generate functional link methods', function () {
    var cssPage = new CssPage();

    cssPage.div1ShouldBeVisible();
    cssPage.clickDiv1();
    cssPage.div1ShouldNotBeVisible();

    cssPage.div2ShouldBeVisible();
    cssPage.clickDiv2();
    cssPage.div2ShouldNotBeVisible();

    cssPage.itemsCountShouldBe(2);

    cssPage.elementsCountShouldBe(0, 2);
    cssPage.elementsCountShouldBe(1, 2);

    cssPage.doubleNestedDiv1ShouldBeVisible(0, 0);
    cssPage.doubleNestedDiv1ShouldBeVisible(0, 1);
    cssPage.doubleNestedDiv1ShouldBeVisible(1, 0);
    cssPage.doubleNestedDiv1ShouldBeVisible(1, 1);
    cssPage.clickDoubleNestedDiv1(0, 0);
    cssPage.doubleNestedDiv1ShouldNotBeVisible(0, 0);
    cssPage.clickDoubleNestedDiv1(1, 1);
    cssPage.doubleNestedDiv1ShouldNotBeVisible(1, 1);

    cssPage.doubleNestedDiv2ShouldBeVisible(0, 0);
    cssPage.doubleNestedDiv2ShouldBeVisible(0, 1);
    cssPage.doubleNestedDiv2ShouldBeVisible(1, 0);
    cssPage.doubleNestedDiv2ShouldBeVisible(1, 1);
    cssPage.clickDoubleNestedDiv2(0, 1);
    cssPage.doubleNestedDiv2ShouldNotBeVisible(0, 1);
    cssPage.clickDoubleNestedDiv2(1, 0);
    cssPage.doubleNestedDiv2ShouldNotBeVisible(1, 0);

    cssPage.items2CountShouldBe(2);

    cssPage.oneLevelNestedDiv1ShouldBeVisible(0);
    cssPage.oneLevelNestedDiv1ShouldBeVisible(1);
    cssPage.clickOneLevelNestedDiv1(0);
    cssPage.oneLevelNestedDiv1ShouldNotBeVisible(0);
    cssPage.clickOneLevelNestedDiv1(1);
    cssPage.oneLevelNestedDiv1ShouldNotBeVisible(1);

    cssPage.oneLevelNestedDiv2ShouldBeVisible(0);
    cssPage.oneLevelNestedDiv2ShouldBeVisible(1);
    cssPage.clickOneLevelNestedDiv2(0);
    cssPage.oneLevelNestedDiv2ShouldNotBeVisible(0);
    cssPage.clickOneLevelNestedDiv2(1);
    cssPage.oneLevelNestedDiv2ShouldNotBeVisible(1);
  });
});