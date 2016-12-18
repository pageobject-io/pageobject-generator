var linkPage = require('../../../../target/test-classes/linkPageObject.js');

describe('links', function () {

  beforeEach(function () {
    browser.get('http://localhost:3000/resources/link.html');
  });

  it('should generate functional link methods', function () {
    linkPage.idLinkShouldBeVisible();
    linkPage.clickIdLink();
    linkPage.idLinkShouldNotBeVisible();

    linkPage.nameLinkShouldBeVisible();
    linkPage.clickNameLink();
    linkPage.nameLinkShouldNotBeVisible();

    linkPage.titleLinkShouldBeVisible();
    linkPage.clickTitleLink();

    linkPage.singleExpressionLinkShouldBeVisible();
    linkPage.clickSingleExpressionLink();
    linkPage.singleExpressionLinkShouldNotBeVisible();

    linkPage.multiExpressionLinkShouldBeVisible();
    linkPage.clickMultiExpressionLink();
    linkPage.multiExpressionLinkShouldNotBeVisible();

    linkPage.textOnlyLinkShouldBeVisible();
    linkPage.clickTextOnlyLink();

    linkPage.itemLinkShouldBeVisible(0);
    linkPage.clickItemLink(0);
    linkPage.itemLinkShouldNotBeVisible(0);

    linkPage.itemLinkShouldBeVisible(1);
    linkPage.clickItemLink(1);
    linkPage.itemLinkShouldNotBeVisible(1);

    linkPage.elementLinkShouldBeVisible(0, 0);
    linkPage.clickElementLink(0, 0);
    linkPage.elementLinkShouldNotBeVisible(0, 0);

    linkPage.elementLinkShouldBeVisible(0, 1);
    linkPage.clickElementLink(0, 1);
    linkPage.elementLinkShouldNotBeVisible(0, 1);

    linkPage.elementLinkShouldBeVisible(1, 0);
    linkPage.clickElementLink(1, 0);
    linkPage.elementLinkShouldNotBeVisible(1, 0);

    linkPage.elementLinkShouldBeVisible(1, 1);
    linkPage.clickElementLink(1, 1);
    linkPage.elementLinkShouldNotBeVisible(1, 1);

    linkPage.whatIsAPageObjectLinkShouldBeVisible();
    linkPage.clickWhatIsAPageObjectLink();
  });
});