package io.pageobject.generator.element;

import io.pageobject.generator.GeneratorContext;
import io.pageobject.generator.locator.LocatorSources;
import org.jsoup.nodes.Element;

import java.util.List;
import java.util.Map;

import static com.google.common.collect.Lists.newArrayList;
import static io.pageobject.generator.Expressions.hasExpression;

public class Ng2BindingProcessor extends AbstractElementProcessor {

    @Override
    public boolean isMatchingElement(Element element, GeneratorContext context) {
        return hasExpression(element.ownText());
    }

    @Override
    protected LocatorSources[] getElementLocatorCandidates(GeneratorContext context) {
        return new LocatorSources[] {LocatorSources.ID, LocatorSources.NAME, LocatorSources.CSS};
    }

    @Override
    protected List<String> getTemplates(GeneratorContext context, Map<String, Object> templateModel) {
        return newArrayList(ASSERTION_TEXT, ASSERTION_HAS_CLASS);
    }

}
