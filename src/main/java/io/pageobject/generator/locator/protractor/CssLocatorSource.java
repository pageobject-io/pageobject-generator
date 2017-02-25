package io.pageobject.generator.locator.protractor;

import io.pageobject.generator.GeneratorContext;
import io.pageobject.generator.locator.AbstractLocatorSource;
import org.jsoup.nodes.Element;

import static io.pageobject.generator.element.Elements.generateCssSelector;

public class CssLocatorSource extends AbstractLocatorSource {

    @Override
    public String extractLocatorValue(Element element, GeneratorContext context) {
        return generateCssSelector(element, context);
    }

    public String locatorTemplate() {
        return "by.css('%s')";
    }

}
