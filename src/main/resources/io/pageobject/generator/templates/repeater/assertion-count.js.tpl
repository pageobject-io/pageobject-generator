this.${name}CountShouldBe = function (${functionArguments}<#if (functionArguments?length > 0)>, </#if> count) {
  expect(${referenceToElement}.count()).toBe(count);
};
