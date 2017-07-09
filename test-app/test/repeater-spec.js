var RepeaterPage = require('../../test/fixtures/repeaterPageObject.po');

describe('repeaters', function () {

  beforeEach(function () {
    browser.get('http://localhost:3000/repeater.html');
  });

  it('should generate functional repeater methods', function () {
    var repeaterPage = new RepeaterPage();

    repeaterPage.sharedItemsLinkCountShouldBe(2);
    repeaterPage.sharedItemsLinkShouldBeVisible(0);
    repeaterPage.sharedItemsLinkShouldBeVisible(1);
    repeaterPage.clickSharedItemsLink(0);
    repeaterPage.sharedItemsLinkShouldNotBeVisible(0);
    repeaterPage.clickSharedItemsLink(1);
    repeaterPage.sharedItemsLinkShouldNotBeVisible(1);

    repeaterPage.itemsCountShouldBe(2);

    repeaterPage.itemLinkShouldBeVisible(0);
    repeaterPage.itemLinkShouldBeVisible(1);
    repeaterPage.itemLinkShouldHaveText(0, 'Nested link with title 1');
    repeaterPage.itemLinkShouldHaveText(1, 'Nested link with title 2');
    repeaterPage.clickItemLink(0);
    repeaterPage.itemLinkShouldNotBeVisible(0);
    repeaterPage.clickItemLink(1);
    repeaterPage.itemLinkShouldNotBeVisible(1);

    repeaterPage.nestedItemsCountShouldBe(0, 2);
    repeaterPage.nestedItemsCountShouldBe(1, 2);

    repeaterPage.elementLinkShouldBeVisible(0, 0);
    repeaterPage.elementLinkShouldBeVisible(0, 1);
    repeaterPage.elementLinkShouldHaveText(0, 0, 'Click here 1');
    repeaterPage.elementLinkShouldHaveText(0, 1, 'Click here 2');
    repeaterPage.clickElementLink(0, 0);
    repeaterPage.elementLinkShouldNotBeVisible(0, 0);
    repeaterPage.clickElementLink(0, 1);
    repeaterPage.elementLinkShouldNotBeVisible(0, 1);
    repeaterPage.elementLinkShouldBeVisible(1, 0);
    repeaterPage.elementLinkShouldBeVisible(1, 1);
    repeaterPage.elementLinkShouldHaveText(1, 0, 'Click here 1');
    repeaterPage.elementLinkShouldHaveText(1, 1, 'Click here 2');
    repeaterPage.clickElementLink(1, 0);
    repeaterPage.elementLinkShouldNotBeVisible(1, 0);
    repeaterPage.clickElementLink(1, 1);
    repeaterPage.elementLinkShouldNotBeVisible(1, 1);

    repeaterPage.libraryCountShouldBe(4);
    repeaterPage.libraryShouldBeVisible(0);
    repeaterPage.libraryShouldBeVisible(1);
    repeaterPage.libraryShouldBeVisible(2);
    repeaterPage.libraryShouldBeVisible(3);

    repeaterPage.indexShouldHaveText(0, '0');
    repeaterPage.indexShouldHaveText(2, '1');

    repeaterPage.repeaterLinkShouldBeVisible(0);
    repeaterPage.clickRepeaterLink(0);
    repeaterPage.repeaterLinkShouldNotBeVisible(0);

    repeaterPage.bookNameShouldHaveText(1, 'book1');
    repeaterPage.bookNameShouldHaveText(3, 'book2');
    repeaterPage.bookBlurbShouldHaveText(1, 'blurb1');
    repeaterPage.bookBlurbShouldHaveText(3, 'blurb2');

    repeaterPage.items2LinkCountShouldBe(2);

    repeaterPage.items2LinkShouldBeVisible(0);
    repeaterPage.items2LinkShouldBeVisible(1);
    repeaterPage.clickItems2Link(0);
    repeaterPage.items2LinkShouldNotBeVisible(0);
    repeaterPage.clickItems2Link(1);
    repeaterPage.items2LinkShouldNotBeVisible(1);
  });
});