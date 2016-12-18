package io.pageobject.generator.element;

public enum DomNodes {

    TEXT() {
        @Override
        public String locatorTemplate() {
            return null;
        }
    };

    public String locator(String value) {
        return String.format(this.locatorTemplate(), value);
    }

    public abstract String locatorTemplate();
}
