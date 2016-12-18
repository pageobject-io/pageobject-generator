package io.pageobject.generator.locator;

import com.google.common.base.Preconditions;
import io.pageobject.generator.GeneratorContext;
import io.pageobject.generator.name.NameExtractor;
import org.jsoup.nodes.Element;

import static io.pageobject.generator.locator.LocatorPart.prefixPart;

public abstract class RepeaterLocatorPartGenerator extends AbstractLocatorPartGenerator {

    public RepeaterLocatorPartGenerator(Element element, LocatorSources... locatorSources) {
        super(element, locatorSources);
    }

    @Override
    public LocatorPart onlyPart(GeneratorContext context) {
        return generateLastPart(context, ELEMENT_ARRAY_FINDER, 1);
    }

    @Override
    public LocatorPart firstPart(GeneratorContext context) {
        String name = new NameExtractor().extractValue(element, context);
        Preconditions.checkNotNull(name, "Could not generate name for repeater [%s]", element);
        return prefixPart("this." + name + ".get(rowIndex1)");
    }

    @Override
    public LocatorPart lastPart(GeneratorContext context, int index) {
        return generateLastPart(context, ELEMENT_ARRAY_FINDER_IN_REPEATER, index);
    }

    @Override
    public LocatorPart lastPartForRepeaterElement(GeneratorContext context, int index) {
        return context.isNestedElement() ? middlePart(context, index) : firstPart(context);
    }
}
