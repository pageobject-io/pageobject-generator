package io.pageobject.generator.locator.protractor;

import io.pageobject.generator.GeneratorContext;
import io.pageobject.generator.attribute.HtmlAttributes;
import io.pageobject.generator.locator.AbstractLocatorSource;
import org.jsoup.nodes.Element;

import static io.pageobject.generator.Expressions.getFirstExpression;
import static io.pageobject.generator.attribute.Attributes.getNormalizedAttributeValue;

public class NgBindTemplateLocatorSource extends AbstractLocatorSource {

    @Override
    public String extractLocatorValue(Element element, GeneratorContext context) {
        return getFirstExpression(getNormalizedAttributeValue(element,
                                                              HtmlAttributes.NG_BIND_TEMPLATE.attributeName()));
    }

    public String locatorTemplate() {
        return "by.exactBinding('%s')";
    }

}
