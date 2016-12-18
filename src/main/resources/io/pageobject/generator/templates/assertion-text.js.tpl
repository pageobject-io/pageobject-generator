this.${name}ShouldHaveText = function (${functionArguments}<#if (functionArguments?length > 0)>, </#if>value) {
  expect(${referenceToElement}.getText()).toBe(value);
};
