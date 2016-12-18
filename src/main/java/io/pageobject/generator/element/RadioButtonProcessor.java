package io.pageobject.generator.element;

import io.pageobject.generator.GeneratorContext;
import io.pageobject.generator.locator.Locator;
import io.pageobject.generator.locator.LocatorPartGenerator;
import io.pageobject.generator.locator.LocatorSources;
import io.pageobject.generator.locator.MultiElementLocatorPartGenerator;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import static com.google.common.base.Strings.isNullOrEmpty;
import static com.google.common.collect.Lists.newArrayList;
import static io.pageobject.generator.attribute.Attributes.getNormalizedAttributeValue;

public class RadioButtonProcessor extends AbstractElementProcessor {

    @Override
    public boolean isMatchingElement(Element element, GeneratorContext context) {
        if ("radio".equalsIgnoreCase(element.attr("type"))) {
            ArrayList<Element> elementsInGroup = findElementsInGroup(element, context);
            context.setFirstElementInGroup(elementsInGroup.get(0));
            return elementsInGroup.get(0) == element;
        }

        return false;
    }

    private ArrayList<Element> findElementsInGroup(Element element, GeneratorContext context) {
        ArrayList<Element> elements = newArrayList();

        String name = element.attr("name");
        String model = getNormalizedAttributeValue(element, "ng-model");

        org.jsoup.select.Elements allRadios;
        if (context.isNestedElement()) {
            allRadios = context.getLastRepeaterElement().select("input[type=radio]");
        } else {
            Document document = element.ownerDocument();
            allRadios = document.select("input[type=radio]");
        }

        for (Element radio : allRadios) {
            String otherName = radio.attr("name");
            String otherModel = getNormalizedAttributeValue(radio, "ng-model");

            boolean matchingNames = !isNullOrEmpty(otherName) && otherName.equals(name);
            boolean matchingModels = !isNullOrEmpty(otherModel) && otherModel.equals(model);
            if (matchingNames || matchingModels) {
                elements.add(radio);
            }
        }

        return elements;
    }

    @Override
    protected LocatorPartGenerator getLocatorPartGenerator(Element element, GeneratorContext context) {
        return new MultiElementLocatorPartGenerator(element, getElementLocatorCandidates(context));
    }

    public Locator generateElementLocator(GeneratorContext context) {
        ArrayList<Element> elementsInGroup = findElementsInGroup(context.getElement(), context);

        if (elementsInGroup.size() == 1) {
            context.stashLastRepeaterLocatorPartGenerator();
        }

        return super.generateElementLocator(context);
    }

    @Override
    protected LocatorSources[] getElementLocatorCandidates(GeneratorContext context) {
        return new LocatorSources[] {LocatorSources.NG_MODEL, LocatorSources.NAME, LocatorSources.CSS};
    }

    @Override
    protected List<String> getTemplates(GeneratorContext context, Map<String, Object> templateModel) {
        ArrayList<String> templates = newArrayList(CLICK_BY_INDEX,
                                                   CLICK_BY_VALUE,
                                                   ASSERTION_SELECTED_BY_INDEX,
                                                   ASSERTION_SELECTED_BY_VALUE,
                                                   ASSERTION_VISIBILITY_BY_INDEX,
                                                   ASSERTION_ENABLED_BY_INDEX,
                                                   ASSERTION_HAS_CLASS);

        return templates;
    }

}
