package io.pageobject.generator.attribute;

public enum HtmlAttributes {

    ID("id"),
    NAME("name"),
    NG_MODEL("ng-model"),
    NG_OPTIONS("ng-options"),
    VALUE("value"),
    TITLE("title"),
    NG_BIND("ng-bind"),
    NG_BIND_HTML("ng-bind-html"),
    NG_BIND_TEMPLATE("ng-bind-template"),
    NG_REPEAT("ng-repeat"),
    NG_REPEAT_START("ng-repeat-start");

    private String attributeName;

    HtmlAttributes(String attributeName) {
        this.attributeName = attributeName;
    }

    public String attributeName() {
        return attributeName;
    }

}
