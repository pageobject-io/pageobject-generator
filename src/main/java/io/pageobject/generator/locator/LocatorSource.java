package io.pageobject.generator.locator;

import io.pageobject.generator.GeneratorContext;
import org.jsoup.nodes.Element;

public interface LocatorSource {

    String locator(String value);

    String extractLocatorValue(Element element, GeneratorContext context);

}
