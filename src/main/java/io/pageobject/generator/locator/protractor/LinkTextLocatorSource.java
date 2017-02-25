package io.pageobject.generator.locator.protractor;

import io.pageobject.generator.GeneratorContext;
import io.pageobject.generator.locator.AbstractLocatorSource;
import org.jsoup.nodes.Element;

import static io.pageobject.generator.Expressions.hasExpression;

public class LinkTextLocatorSource extends AbstractLocatorSource {

    @Override
    public String extractLocatorValue(Element element, GeneratorContext context) {
        String text = element.text();
        return hasExpression(text) ? null : text;
    }

    public String locatorTemplate() {
        return "by.linkText('%s')";
    }

}
