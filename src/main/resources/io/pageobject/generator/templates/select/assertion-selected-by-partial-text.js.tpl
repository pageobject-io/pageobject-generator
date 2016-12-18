this.${name}ByPartialTextShouldBeSelected = function (${functionArguments}) {
  var expectedOptions = [];
  for (var i = ${functionArgumentsCount}; i < arguments.length; i++) {
    expectedOptions = expectedOptions.concat(arguments[i]);
  }

  for (i = 0; i < expectedOptions.length; i++) {
    var options = ${referenceToElement}.all(by.cssContainingText('option', expectedOptions[i]));

    options.each(function (option) {
      expect(option.isSelected()).toBeTruthy();
    });

    expect(options.count()).toBeGreaterThan(0);
  }
};

this.${name}ByPartialTextShouldNotBeSelected = function (${functionArguments}) {
  var expectedOptions = [];
  for (var i = ${functionArgumentsCount}; i < arguments.length; i++) {
    expectedOptions = expectedOptions.concat(arguments[i]);
  }

  for (i = 0; i < expectedOptions.length; i++) {
    ${referenceToElement}.all(by.cssContainingText('option', expectedOptions[i])).each(function (option) {
      expect(option.isSelected()).toBeFalsy();
    });
  }
};
