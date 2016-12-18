package io.pageobject.generator.element;

import io.pageobject.generator.GeneratorContext;
import org.jsoup.nodes.Element;

import java.util.List;
import java.util.Map;

import static com.google.common.collect.Lists.newArrayList;

public class DateFieldProcessor extends AbstractElementProcessor {

    public static final String MUTATOR = "date/date-mutator";
    public static final String ASSERTION_VALUE = "text/text-assertion-value";

    @Override
    public boolean isMatchingElement(Element element, GeneratorContext context) {
        String type = element.attr("type");
        return "date".equalsIgnoreCase(type) || "time".equalsIgnoreCase(type) ||
               "datetime-local".equalsIgnoreCase(type) || "datetime".equalsIgnoreCase(type) ||
               "month".equalsIgnoreCase(type) || "week".equalsIgnoreCase(type);
    }

    @Override
    protected List<String> getTemplates(GeneratorContext context, Map<String, Object> templateModel) {
        return newArrayList(MUTATOR, ASSERTION_VALUE, ASSERTION_VISIBILITY, ASSERTION_ENABLED, ASSERTION_HAS_CLASS);
    }

}
