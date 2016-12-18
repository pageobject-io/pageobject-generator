this.${name}ShouldBeVisible = function (${functionArguments}) {
  expect(${referenceToElement}.isDisplayed()).toBeTruthy();
};

this.${name}ShouldNotBeVisible = function (${functionArguments}) {
  expect(${referenceToElement}.isDisplayed()).toBeFalsy();
};
