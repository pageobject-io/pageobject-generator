package io.pageobject.generator.element;

import io.pageobject.generator.GeneratorContext;
import io.pageobject.generator.locator.LocatorSources;
import org.jsoup.nodes.Element;

import java.util.List;
import java.util.Map;

import static com.google.common.collect.Lists.newArrayList;
import static io.pageobject.generator.attribute.Attributes.hasAngular2EventBindingAttribute;
import static io.pageobject.generator.element.Elements.isButton;
import static io.pageobject.generator.element.Elements.isLink;

public class ClickProcessor extends AbstractElementProcessor {

    @Override
    public boolean isMatchingElement(Element element, GeneratorContext context) {
        return hasAngular2EventBindingAttribute(element, "click") && !isLink(element) && !isButton(element);
    }

    @Override
    protected LocatorSources[] getElementLocatorCandidates(GeneratorContext context) {
        return new LocatorSources[] {LocatorSources.ID, LocatorSources.NAME, LocatorSources.CSS};

    }

    @Override
    protected List<String> getTemplates(GeneratorContext context, Map<String, Object> templateModel) {
        return newArrayList(CLICK, ASSERTION_VISIBILITY, ASSERTION_HAS_CLASS);
    }

}
