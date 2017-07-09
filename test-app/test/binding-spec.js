var BindingPage = require('../../test/fixtures/bindingPageObject.po');

describe('bindings', function () {

  beforeEach(function () {
    browser.get('http://localhost:3000/binding.html');
  });

  it('should generate functional binding methods', function () {
    var bindingPage = new BindingPage();

    bindingPage.nameLinkShouldHaveText('a');

    bindingPage.idLiShouldHaveText('Not just b')

    bindingPage.singleExpression3ShouldHaveText('Only expression c');

    bindingPage.singleExpression4ShouldHaveText('d');

    bindingPage.modelShouldHaveText('h and i');

    bindingPage.ngBindPShouldHaveText('e');

    bindingPage.ngBindHtmlPShouldHaveText('f');

    bindingPage.ngBindTemplatePShouldHaveText('g a!');

    bindingPage.itemShouldHaveText(0, '1');
    bindingPage.itemShouldHaveText(1, '2');

    bindingPage.elementShouldHaveText(0, 0, '1');
    bindingPage.elementShouldHaveText(0, 1, '2');
    bindingPage.elementShouldHaveText(1, 0, '1');
    bindingPage.elementShouldHaveText(1, 1, '2');
  });
});