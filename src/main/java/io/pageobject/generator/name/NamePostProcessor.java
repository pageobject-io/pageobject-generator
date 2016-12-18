package io.pageobject.generator.name;

import org.jsoup.nodes.Element;

public interface NamePostProcessor {

    boolean isMatchingElement(Element element);

    String process(String name, Element element);

}
