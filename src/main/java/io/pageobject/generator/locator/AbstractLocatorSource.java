package io.pageobject.generator.locator;

import io.pageobject.generator.ApplicationType;

public abstract class AbstractLocatorSource implements LocatorSource {

    public String locator(String value) {
        return String.format(this.locatorTemplate(), value).replaceAll("'`", "`").replaceAll("`'", "`");
    }

    protected abstract String locatorTemplate();

    protected boolean isEnabledForApplicationType(ApplicationType type) {
        return true;
    }

}
