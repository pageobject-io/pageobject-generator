this.${name}ByValueShouldBeSelected = function (${functionArguments}<#if (functionArguments?length > 0)>, </#if>value) {
  ${referenceToElement}.filter(function (elem) {
    return elem.isSelected();
  }).then(function (filteredElements) {
      expect(filteredElements[0].getAttribute('value')).toEqual(value);
    });
};

this.${name}ByValueShouldNotBeSelected = function (${functionArguments}<#if (functionArguments?length > 0)>, </#if>value) {
  ${referenceToElement}.filter(function (elem) {
    return elem.isSelected();
  }).then(function (filteredElements) {
      if (filteredElements.length > 0) {
        expect(filteredElements[0].getAttribute('value')).not.toEqual(value);
      }
    });
};
