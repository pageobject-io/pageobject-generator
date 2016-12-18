this.select${nameTitle}ByValue = function (${functionArguments}<#if (functionArguments?length > 0)>, </#if>value) {
  ${referenceToElement}.all(by.css('option[value="' + value + '"]')).click();
};
