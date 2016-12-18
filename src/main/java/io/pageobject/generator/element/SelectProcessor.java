package io.pageobject.generator.element;

import io.pageobject.generator.GeneratorContext;
import io.pageobject.generator.locator.LocatorSources;
import org.jsoup.nodes.Element;

import java.util.List;
import java.util.Map;

import static com.google.common.collect.Lists.newArrayList;

public class SelectProcessor extends AbstractElementProcessor {

    private static final String SELECT_BY_PARTIAL_TEXT = "select/select-by-partial-text";
    private static final String SELECT_BY_TEXT = "select/select-by-text";
    private static final String SELECT_BY_VALUE = "select/select-by-value";
    private static final String ASSERTION_SELECTED_BY_TEXT = "select/assertion-selected-by-text";
    private static final String ASSERTION_SELECTED_BY_PARTIAL_TEXT = "select/assertion-selected-by-partial-text";
    private static final String ASSERTION_SELECTED_BY_VALUE = "select/assertion-selected-by-value";

    @Override
    public boolean isMatchingElement(Element element, GeneratorContext context) {
        return true;
    }

    @Override
    protected LocatorSources[] getElementLocatorCandidates(GeneratorContext context) {
        return new LocatorSources[] {LocatorSources.NG_MODEL,
                                     LocatorSources.NG_OPTIONS,
                                     LocatorSources.ID,
                                     LocatorSources.NAME,
                                     LocatorSources.CSS};
    }

    @Override
    protected List<String> getTemplates(GeneratorContext context, Map<String, Object> templateModel) {
        return newArrayList(SELECT_BY_PARTIAL_TEXT,
                            SELECT_BY_TEXT,
                            SELECT_BY_VALUE,
                            ASSERTION_SELECTED_BY_PARTIAL_TEXT,
                            ASSERTION_SELECTED_BY_TEXT,
                            ASSERTION_SELECTED_BY_VALUE,
                            ASSERTION_VISIBILITY,
                            ASSERTION_ENABLED,
                            ASSERTION_HAS_CLASS);
    }
}
