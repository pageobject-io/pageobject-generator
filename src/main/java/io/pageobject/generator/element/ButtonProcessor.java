package io.pageobject.generator.element;

import io.pageobject.generator.GeneratorContext;
import io.pageobject.generator.locator.LocatorSource;
import io.pageobject.generator.locator.protractor.*;
import org.jsoup.nodes.Element;

import java.util.List;
import java.util.Map;

import static com.google.common.collect.Lists.newArrayList;
import static io.pageobject.generator.element.Elements.isButton;

public class ButtonProcessor extends AbstractElementProcessor {

    @Override
    public boolean isMatchingElement(Element element, GeneratorContext context) {
        return isButton(element);
    }

    @Override
    protected LocatorSource[] getElementLocatorCandidates(GeneratorContext context) {
        return new LocatorSource[] {new IdLocatorSource(),
                                    new NameLocatorSource(),
                                    new ExpressionTextLocatorSource(),
                                    new ButtonTextLocatorSource(),
                                    new CssLocatorSource()};
    }

    @Override
    protected List<String> getTemplates(GeneratorContext context, Map<String, Object> templateModel) {
        return newArrayList(CLICK, ASSERTION_VISIBILITY, ASSERTION_HAS_CLASS);
    }

}
