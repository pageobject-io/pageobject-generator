this.${name}ByIndexShouldBeVisible = function (${functionArguments}<#if (functionArguments?length > 0)>, </#if>index) {
  expect(${referenceToElement}.get(index).isDisplayed()).toBeTruthy();
};

this.${name}ByIndexShouldNotBeVisible = function (${functionArguments}<#if (functionArguments?length > 0)>, </#if>index) {
  expect(${referenceToElement}.get(index).isDisplayed()).toBeFalsy();
};
