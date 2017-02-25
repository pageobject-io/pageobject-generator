package io.pageobject.generator.element;

import io.pageobject.generator.GeneratorContext;
import io.pageobject.generator.locator.LocatorSource;
import io.pageobject.generator.locator.protractor.*;
import org.jsoup.nodes.Element;

import java.util.List;
import java.util.Map;

import static com.google.common.base.Strings.isNullOrEmpty;
import static com.google.common.collect.Lists.newArrayList;
import static io.pageobject.generator.Expressions.hasExpression;
import static io.pageobject.generator.attribute.Attributes.getNormalizedAttributeValue;

public class Ng1BindingProcessor extends AbstractElementProcessor {

    @Override
    public boolean isMatchingElement(Element element, GeneratorContext context) {
        return !isNullOrEmpty(getNormalizedAttributeValue(element, "ng-bind")) ||
               !isNullOrEmpty(getNormalizedAttributeValue(element, "ng-bind-html")) ||
               !isNullOrEmpty(getNormalizedAttributeValue(element, "ng-bind-template")) ||
               hasExpression(element.ownText());
    }

    @Override
    protected LocatorSource[] getElementLocatorCandidates(GeneratorContext context) {
        return new LocatorSource[] {new IdLocatorSource(),
                                    new NameLocatorSource(),
                                    new NgModelLocatorSource(),
                                    new ExpressionTextLocatorSource(),
                                    new NgBindLocatorSource(),
                                    new NgBindHtmlLocatorSource(),
                                    new NgBindTemplateLocatorSource()};
    }

    @Override
    protected List<String> getTemplates(GeneratorContext context, Map<String, Object> templateModel) {
        return newArrayList(ASSERTION_TEXT, ASSERTION_HAS_CLASS);
    }

}
