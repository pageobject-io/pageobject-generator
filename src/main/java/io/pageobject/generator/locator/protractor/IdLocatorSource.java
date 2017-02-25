package io.pageobject.generator.locator.protractor;

import io.pageobject.generator.GeneratorContext;
import io.pageobject.generator.attribute.HtmlAttributes;
import io.pageobject.generator.locator.AbstractLocatorSource;
import org.jsoup.nodes.Element;

import static io.pageobject.generator.attribute.Attributes.extractAttributeValueAllowingIndexExpression;

public class IdLocatorSource extends AbstractLocatorSource {

    @Override
    public String extractLocatorValue(Element element, GeneratorContext context) {
        return extractAttributeValueAllowingIndexExpression(element, HtmlAttributes.ID);
    }

    public String locatorTemplate() {
        return "by.id('%s')";
    }

}
