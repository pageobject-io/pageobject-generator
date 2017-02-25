package io.pageobject.generator.locator;

import io.pageobject.generator.GeneratorContext;
import io.pageobject.generator.locator.protractor.CssLocatorSource;
import io.pageobject.generator.locator.protractor.NameLocatorSource;
import org.jsoup.nodes.Element;

import static io.pageobject.generator.locator.LocatorPart.prefixPart;

public class NgForLocatorPartGenerator extends RepeaterLocatorPartGenerator {

    private LocatorPart locatorPart;

    public NgForLocatorPartGenerator(Element element) {
        super(element, new NameLocatorSource(), new CssLocatorSource());
    }

    @Override
    public LocatorPart firstPart(GeneratorContext context) {
        locatorPart = super.firstPart(context);
        return locatorPart;
    }

    @Override
    public LocatorPart lastPart(GeneratorContext context, int index) {
        locatorPart = super.lastPart(context, index);
        return locatorPart;
    }

    @Override
    public LocatorPart middlePart(GeneratorContext context, int index) {
        StringBuilder value = new StringBuilder(locatorPart.getPart());
        value.append(".get(rowIndex");
        value.append(index + 1);
        value.append(")");
        return prefixPart(value.toString());
    }
}
