package io.pageobject.generator.locator.protractor;

import io.pageobject.generator.GeneratorContext;
import io.pageobject.generator.locator.AbstractLocatorSource;
import org.jsoup.nodes.Element;

import static io.pageobject.generator.Expressions.allowIndexExpressionOrNoExpressions;
import static io.pageobject.generator.Expressions.extractExactRepeater;
import static io.pageobject.generator.attribute.Attributes.getRepeaterAttribute;

public class NgRepeatLocatorSource extends AbstractLocatorSource {

    @Override
    public String extractLocatorValue(Element element, GeneratorContext context) {
        return allowIndexExpressionOrNoExpressions(extractExactRepeater(getRepeaterAttribute(element)));
    }

    public String locatorTemplate() {
        return "by.exactRepeater('%s')";
    }

}
