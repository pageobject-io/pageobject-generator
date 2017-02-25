package io.pageobject.generator.locator.protractor;

import io.pageobject.generator.GeneratorContext;
import io.pageobject.generator.attribute.HtmlAttributes;
import io.pageobject.generator.locator.AbstractLocatorSource;
import org.jsoup.nodes.Element;

import static io.pageobject.generator.attribute.Attributes.extractAttributeValue;

public class NgBindLocatorSource extends AbstractLocatorSource {

    @Override
    public String extractLocatorValue(Element element, GeneratorContext context) {
        return extractAttributeValue(element, HtmlAttributes.NG_BIND);
    }

    public String locatorTemplate() {
        return "by.exactBinding('%s')";
    }

}
