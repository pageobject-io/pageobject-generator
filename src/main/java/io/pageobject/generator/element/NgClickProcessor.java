package io.pageobject.generator.element;

import io.pageobject.generator.GeneratorContext;
import io.pageobject.generator.locator.LocatorSource;
import io.pageobject.generator.locator.protractor.*;
import org.jsoup.nodes.Element;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import static com.google.common.base.Strings.isNullOrEmpty;
import static com.google.common.collect.Lists.newArrayList;
import static io.pageobject.generator.attribute.Attributes.getNormalizedAttributeValue;

public class NgClickProcessor extends AbstractElementProcessor {

    @Override
    public boolean isMatchingElement(Element element, GeneratorContext context) {
        String ngClick = getNormalizedAttributeValue(element, "ng-click");
        return !isNullOrEmpty(ngClick) && !isLink(element) && !isButton(element) && !isInputButton(element);
    }

    private boolean isLink(Element element) {
        return element.tagName().equals("a");
    }

    private boolean isButton(Element element) {
        return element.tagName().equals("button");
    }

    private boolean isInputButton(Element element) {
        return (element.tagName().equals("input") &&
                (element.attr("type").equals("button") || element.attr("type").equals("submit")));
    }

    @Override
    protected LocatorSource[] getElementLocatorCandidates(GeneratorContext context) {
        ArrayList<LocatorSource> sources = newArrayList(new IdLocatorSource(),
                                                        new NameLocatorSource(),
                                                        new NgModelLocatorSource(),
                                                        new NgOptionsLocatorSource(),
                                                        new CssLocatorSource());

        if (context.getElement().text().length() < 30) {
            sources.add(new ExpressionTextLocatorSource());
        }

        return sources.toArray(new LocatorSource[sources.size()]);
    }

    @Override
    protected List<String> getTemplates(GeneratorContext context, Map<String, Object> templateModel) {
        return newArrayList(CLICK, ASSERTION_VISIBILITY, ASSERTION_HAS_CLASS);
    }

}
