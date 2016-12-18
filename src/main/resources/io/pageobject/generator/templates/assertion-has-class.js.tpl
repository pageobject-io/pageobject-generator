this.${name}ShouldHaveClass = function (${functionArguments}<#if (functionArguments?length > 0)>, </#if>className) {
  ${referenceToElement}.getAttribute('class').then(function (classes) {
    expect(classes.split(' ').indexOf(className) !== -1).toBeTruthy();
  });
};

this.${name}ShouldNotHaveClass = function (${functionArguments}<#if (functionArguments?length > 0)>, </#if>className) {
  ${referenceToElement}.getAttribute('class').then(function (classes) {
    expect(classes.split(' ').indexOf(className) === -1).toBeTruthy();
  });
};
