this.click${nameTitle}ByIndex = function (${functionArguments}<#if (functionArguments?length > 0)>, </#if>index) {
  ${referenceToElement}.get(index).click();
};
