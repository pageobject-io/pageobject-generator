package io.pageobject.generator.locator.protractor;

import io.pageobject.generator.GeneratorContext;
import io.pageobject.generator.locator.AbstractLocatorSource;
import org.jsoup.nodes.Element;

import static com.google.common.base.Strings.isNullOrEmpty;
import static io.pageobject.generator.Expressions.hasExpression;

public class ButtonTextLocatorSource extends AbstractLocatorSource {

    @Override
    public String extractLocatorValue(Element element, GeneratorContext context) {
        String text = element.text();
        String locator = null;

        if (isNullOrEmpty(text)) {
            locator = element.attr("value");
        } else if (!hasExpression(text)) {
            locator = text;
        }

        return locator;
    }

    public String locatorTemplate() {
        return "by.buttonText('%s')";
    }

}
