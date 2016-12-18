this.shouldHave${nameTitle} = function (${functionArguments}<#if (functionArguments?length > 0)>, </#if>value) {
    expect(${referenceToElement}.getAttribute('value')).toEqual(value);
};
