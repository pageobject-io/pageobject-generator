package io.pageobject.generator.element;

import io.pageobject.generator.GeneratorContext;
import io.pageobject.generator.locator.LocatorPartGenerator;
import io.pageobject.generator.locator.LocatorSource;
import io.pageobject.generator.locator.protractor.CssLocatorSource;
import io.pageobject.generator.locator.protractor.NameLocatorSource;
import org.jsoup.nodes.Element;

import java.util.List;
import java.util.Map;

import static com.google.common.base.Strings.isNullOrEmpty;
import static com.google.common.collect.Lists.newArrayList;

public class NgForProcessor extends AbstractElementProcessor {

    public static final String ASSERTION_COUNT = "repeater/assertion-count";

    @Override
    public boolean isMatchingElement(Element element, GeneratorContext context) {
        return !isNullOrEmpty(element.attr("*ngFor"));
    }

    @Override
    protected LocatorPartGenerator getLocatorPartGenerator(Element element, GeneratorContext context) {
        return null;
    }

    @Override
    protected LocatorSource[] getElementLocatorCandidates(GeneratorContext context) {
        return new LocatorSource[] {new NameLocatorSource(), new CssLocatorSource()};
    }

    @Override
    protected String getLocator(GeneratorContext context) {
        return context.getLocator().getLocator();
    }

    @Override
    protected List<String> getTemplates(GeneratorContext context, Map<String, Object> templateModel) {
        return newArrayList(ASSERTION_COUNT);
    }

}
