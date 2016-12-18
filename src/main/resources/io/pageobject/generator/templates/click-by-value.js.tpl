this.click${nameTitle}ByValue = function (${functionArguments}<#if (functionArguments?length > 0)>, </#if>value) {
  ${referenceToElement}.filter(function (elem) {
    return elem.getAttribute('value').then(function (attribute) {
      return attribute === value;
    });
  }).then(function (filteredElements) {
      filteredElements[0].click();
    });
};
