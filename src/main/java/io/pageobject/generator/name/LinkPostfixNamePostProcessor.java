package io.pageobject.generator.name;

import org.jsoup.nodes.Element;

import static io.pageobject.generator.element.Elements.isLink;

public class LinkPostfixNamePostProcessor extends PostfixNamePostProcessor {

    public LinkPostfixNamePostProcessor() {
        super("Link", new String[] {"Link", "Button"});
    }

    @Override
    public boolean isMatchingElement(Element element) {
        return isLink(element);
    }
}
