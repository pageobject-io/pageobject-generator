this.select${nameTitle}ByText = function (${functionArguments}<#if (functionArguments?length > 0)>, </#if>text) {
  ${referenceToElement}.all(by.xpath('option[.="' + text + '"]')).click();
};
