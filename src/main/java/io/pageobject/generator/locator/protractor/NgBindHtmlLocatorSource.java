package io.pageobject.generator.locator.protractor;

import io.pageobject.generator.GeneratorContext;
import io.pageobject.generator.attribute.HtmlAttributes;
import io.pageobject.generator.locator.AbstractLocatorSource;
import org.jsoup.nodes.Element;

import static io.pageobject.generator.attribute.Attributes.extractAttributeValue;

public class NgBindHtmlLocatorSource extends AbstractLocatorSource {

    @Override
    public String extractLocatorValue(Element element, GeneratorContext context) {
        return extractAttributeValue(element, HtmlAttributes.NG_BIND_HTML);
    }

    public String locatorTemplate() {
        return "by.exactBinding('%s')";
    }

}
