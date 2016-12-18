this.select${nameTitle}ByPartialText = function (${functionArguments}<#if (functionArguments?length > 0)>, </#if>text) {
  ${referenceToElement}.all(by.cssContainingText('option', text)).click();
};
