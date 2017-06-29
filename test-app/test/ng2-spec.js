var Page = require('../../test/fixtures/ng2ComponentPageObject.po');

describe('angular 2', function () {

  beforeEach(function () {
    browser.get('http://localhost:3000/angular2.html');
  });

  it('should generate functional angular 2 methods', function () {
    var page = new Page();

    browser.useAllAngular2AppRoots();

    page.totalCountLabelShouldHaveText('You have 1 parts on your list.')
    page.clickTotalCountLabel();
    page.totalCountLabelShouldHaveText('You have 2 parts on your list.')
    page.totalCountLabelShouldBeVisible();

    page.namedLinkShouldBeVisible();
    page.namedLinkShouldHaveText('link1');
    page.clickNamedLink();

    page.linkText2LinkShouldBeVisible();
    page.linkText2LinkShouldHaveClass('a-link');
    page.clickLinkText2Link();

    page.addButtonShouldBeVisible();
    page.addButtonShouldHaveClass('btn');
    page.addButtonShouldHaveClass('btn-default');
    page.addButtonShouldHaveClass('pull-right');
    page.addPartShouldHaveText('0');
    page.clickAddButton();
    page.addPartShouldHaveText('1');

    page.partsCountShouldBe(2);

    page.partIdShouldHaveText(0, '1');
    page.partIdShouldHaveClass(0, 'vert-align');
    page.partIdShouldHaveText(1, '2');
    page.partIdShouldHaveClass(1, 'text-center');

    page.partHaveItYesNoShouldHaveText(0, 'Yes');
    page.partHaveItYesNoShouldHaveClass(0, 'vert-align');
    page.partHaveItYesNoShouldHaveText(1, 'No');
    page.partHaveItYesNoShouldHaveClass(1, 'text-center');

    page.modelShouldHaveText(0, '0');
    page.modelShouldHaveText(0, '0');

    page.editPartButtonShouldBeVisible(0);
    page.editPartButtonShouldBeVisible(1);
    page.clickEditPartButton(0);
    page.modelShouldHaveText(0, '1');
    page.clickEditPartButton(1);
    page.modelShouldHaveText(1, '1');

    page.pagesCountShouldBe(2);
    page.pagesShouldHaveText(0, '1 1\n1\n2');
    page.pagesShouldHaveText(1, '2 2\n1\n2');
    page.pageShouldHaveText(0, '1');
    page.pageShouldHaveText(1, '2');

    page.itemsCountShouldBe(0, 2);
    page.itemsCountShouldBe(1, 2);

    page.itemLinkShouldBeVisible(0, 0);
    page.itemLinkShouldBeVisible(0, 1);
    page.itemLinkShouldBeVisible(1, 0);
    page.itemLinkShouldBeVisible(1, 1);
    page.itemLinkShouldHaveText(0, 0, '1');
    page.itemLinkShouldHaveText(0, 1, '2');
    page.itemLinkShouldHaveText(1, 0, '1');
    page.itemLinkShouldHaveText(1, 1, '2');

    page.nestedClickShouldHaveText('0');
    page.clickItemLink(0, 0);
    page.nestedClickShouldHaveText('1');
    page.clickItemLink(0, 1);
    page.nestedClickShouldHaveText('3');
    page.clickItemLink(1, 0);
    page.nestedClickShouldHaveText('4');
    page.clickItemLink(1, 1);
    page.nestedClickShouldHaveText('6');

    // hack to switch back to Angular 1 mode
    browser.rootEl = 'body';
  });
});