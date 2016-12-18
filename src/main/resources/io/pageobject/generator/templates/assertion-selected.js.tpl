this.${name}ShouldBeSelected = function (${functionArguments}) {
  expect(${referenceToElement}.isSelected()).toBeTruthy();
};

this.${name}ShouldNotBeSelected = function (${functionArguments}) {
  expect(${referenceToElement}.isSelected()).toBeFalsy();
};
