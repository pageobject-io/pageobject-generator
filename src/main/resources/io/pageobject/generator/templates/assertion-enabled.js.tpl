this.${name}ShouldBeEnabled = function (${functionArguments}) {
  expect(${referenceToElement}.isEnabled()).toBeTruthy();
};

this.${name}ShouldNotBeEnabled = function (${functionArguments}) {
  expect(${referenceToElement}.isEnabled()).toBeFalsy();
};
