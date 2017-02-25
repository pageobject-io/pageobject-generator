package io.pageobject.generator.locator.protractor;

import io.pageobject.generator.GeneratorContext;
import io.pageobject.generator.locator.AbstractLocatorSource;
import org.jsoup.nodes.Element;

import static io.pageobject.generator.Expressions.getFirstExpression;

public class ExpressionTextLocatorSource extends AbstractLocatorSource {

    @Override
    public String extractLocatorValue(Element element, GeneratorContext context) {
        return getFirstExpression(element.ownText());
    }

    public String locatorTemplate() {
        return "by.exactBinding('%s')";
    }

}
