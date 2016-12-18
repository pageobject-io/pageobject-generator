package io.pageobject.generator.locator;

import io.pageobject.generator.GeneratorContext;
import org.jsoup.nodes.Element;

public class MultiElementLocatorPartGenerator extends AbstractLocatorPartGenerator {

    public MultiElementLocatorPartGenerator(Element element, LocatorSources... locatorCandidates) {
        super(element, locatorCandidates);
    }

    @Override
    public LocatorPart onlyPart(GeneratorContext context) {
        return generateLastPart(context, ELEMENT_ARRAY_FINDER, 0);
    }

    @Override
    public LocatorPart lastPart(GeneratorContext context, int index) {
        return generateLastPart(context, ELEMENT_ARRAY_FINDER_IN_REPEATER, index);
    }
}
