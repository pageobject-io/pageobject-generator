package io.pageobject.generator.name;

import org.jsoup.nodes.Element;

import static io.pageobject.generator.element.Elements.isButton;

public class ButtonPostfixNamePostProcessor extends PostfixNamePostProcessor {

    public ButtonPostfixNamePostProcessor() {
        super("Button", new String[] {"Button"});
    }

    @Override
    public boolean isMatchingElement(Element element) {
        return isButton(element);
    }
}
