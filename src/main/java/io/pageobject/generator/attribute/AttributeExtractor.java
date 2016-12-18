package io.pageobject.generator.attribute;

import io.pageobject.generator.GeneratorContext;
import org.jsoup.nodes.Element;

public interface AttributeExtractor {

    String extractValue(Element element, GeneratorContext context);

}
