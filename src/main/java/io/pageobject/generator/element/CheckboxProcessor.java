package io.pageobject.generator.element;

import io.pageobject.generator.GeneratorContext;
import org.jsoup.nodes.Element;

import java.util.List;
import java.util.Map;

import static com.google.common.collect.Lists.newArrayList;

public class CheckboxProcessor extends AbstractElementProcessor {

    @Override
    public boolean isMatchingElement(Element element, GeneratorContext context) {
        return "checkbox".equals(element.attr("type"));
    }

    @Override
    protected List<String> getTemplates(GeneratorContext context, Map<String, Object> templateModel) {
        return newArrayList(CLICK, ASSERTION_SELECTED, ASSERTION_VISIBILITY, ASSERTION_ENABLED, ASSERTION_HAS_CLASS);
    }

}
