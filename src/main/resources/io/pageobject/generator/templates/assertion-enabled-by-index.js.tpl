this.${name}ByIndexShouldBeEnabled = function (${functionArguments}<#if (functionArguments?length > 0)>, </#if>index) {
  expect(${referenceToElement}.get(index).isEnabled()).toBeTruthy();
};

this.${name}ByIndexShouldNotBeEnabled = function (${functionArguments}<#if (functionArguments?length > 0)>, </#if>index) {
  expect(${referenceToElement}.get(index).isEnabled()).toBeFalsy();
};
