this.set${nameTitle} = function (${functionArguments}<#if (functionArguments?length > 0)>, </#if>value) {
  // https://github.com/angular/protractor/issues/562
  var element = ${referenceToElement};
  element.getAttribute('value').then(function (text) {
    var backspaceSeries = Array(text.length + 1).join(protractor.Key.BACK_SPACE);
    element.sendKeys(backspaceSeries);
    element.sendKeys(value);
  });
};
