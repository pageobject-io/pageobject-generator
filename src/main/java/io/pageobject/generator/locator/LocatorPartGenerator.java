package io.pageobject.generator.locator;

import io.pageobject.generator.GeneratorContext;
import org.jsoup.nodes.Element;

public interface LocatorPartGenerator {

    LocatorPart onlyPart(GeneratorContext context);

    LocatorPart firstPart(GeneratorContext context);

    LocatorPart middlePart(GeneratorContext context, int index);

    LocatorPart lastPart(GeneratorContext context, int index);

    LocatorPart lastPartForRepeaterElement(GeneratorContext context, int index);

    Element getElement();

}
