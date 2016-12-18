package io.pageobject.generator.element;

import io.pageobject.generator.GeneratorContext;
import io.pageobject.generator.ProcessingResult;
import io.pageobject.generator.locator.Locator;
import org.jsoup.nodes.Element;

public interface ElementProcessor {

    boolean isMatchingElement(Element element, GeneratorContext context);

    Locator generateElementLocator(GeneratorContext context);

    ProcessingResult process(GeneratorContext context) throws Exception;
}
