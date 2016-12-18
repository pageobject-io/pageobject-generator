this.set${nameTitle} = function (${functionArguments}<#if (functionArguments?length > 0)>, </#if>value) {
  ${referenceToElement}.clear();
  ${referenceToElement}.sendKeys(value);
};
