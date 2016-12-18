this.${name}ByValueShouldBeSelected = function (${functionArguments}) {
  var expectedOptions = [];
  for (var i = ${functionArgumentsCount}; i < arguments.length; i++) {
    expectedOptions = expectedOptions.concat(arguments[i]);
  }

  for (i = 0; i < expectedOptions.length; i++) {
    var options = ${referenceToElement}.all(by.css('option[value="' + expectedOptions[i] + '"]'));

    options.each(function(option) {
      expect(option.isSelected()).toBeTruthy();
    });

    expect(options.count()).toBeGreaterThan(0);
  }
};

this.${name}ByValueShouldNotBeSelected = function (${functionArguments}) {
  var expectedOptions = [];
  for (var i = ${functionArgumentsCount}; i < arguments.length; i++) {
    expectedOptions = expectedOptions.concat(arguments[i]);
  }

  for (i = 0; i < expectedOptions.length; i++) {
    ${referenceToElement}.all(by.css('option[value="' + expectedOptions[i] + '"]')).each(function(option) {
      expect(option.isSelected()).toBeFalsy();
    });
  }
};
