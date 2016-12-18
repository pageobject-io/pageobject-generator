this.${name}ByIndexShouldBeSelected = function (${functionArguments}<#if (functionArguments?length > 0)>, </#if>index) {
  expect(${referenceToElement}.get(index).isSelected()).toBeTruthy();
};

this.${name}ByIndexShouldNotBeSelected = function (${functionArguments}<#if (functionArguments?length > 0)>, </#if>index) {
  expect(${referenceToElement}.get(index).isSelected()).toBeFalsy();
};
