package io.pageobject.generator.locator;

import io.pageobject.generator.GeneratorContext;
import org.jsoup.nodes.Element;

import static io.pageobject.generator.locator.LocatorPart.prefixPart;

public class NgRepeatLocatorPartGenerator extends RepeaterLocatorPartGenerator {

    private final String repeaterExpression;

    public NgRepeatLocatorPartGenerator(Element element, String repeaterExpression) {
        super(element, LocatorSources.NG_REPEAT);
        this.repeaterExpression = repeaterExpression;
    }

    @Override
    public LocatorPart middlePart(GeneratorContext context, int index) {
        StringBuilder value = new StringBuilder("element(by.exactRepeater('");
        value.append(repeaterExpression);
        value.append("').row(rowIndex");
        value.append(index + 1);
        value.append("))");
        return prefixPart(value.toString());
    }
}
