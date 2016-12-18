package io.pageobject.generator.element;

import com.google.common.base.Strings;
import io.pageobject.generator.GeneratorContext;
import org.jsoup.helper.StringUtil;
import org.jsoup.nodes.Element;

import static io.pageobject.generator.attribute.Attributes.hasNormalizedAttribute;

public class Elements {

    public static boolean isButton(Element element) {
        return element.tagName().equals("button") || (element.tagName().equals("input") &&
                                                      (element.attr("type").equals("button") ||
                                                       element.attr("type").equals("submit")));
    }

    public static boolean isLink(Element element) {
        return element.tagName().equals("a");
    }

    public static String generateCssSelector(Element element, GeneratorContext context) {
        if (element.id().length() > 0) {
            return "#" + element.id();
        }

        String tagName = element.tagName().replace(':', '|');
        StringBuilder selector = new StringBuilder(tagName);
        addClasses(element, selector);

        Element parent = element.parent();
        if (parent == null) {
            return selector.toString();
        }

        if (parent.tagName().equals("body")) {
            if (context.getSource().contains("<body")) {
                return "body > " + selector.toString();
            } else {
                return selector.toString();
            }
        }

        String directChildrenSelector = ">" + selector.toString();
        int numberOfDirectChildren = getNumberOfChildren(directChildrenSelector, parent);

        if (context.isNestedElement()) {
            int numberOfAllChildren = getNumberOfChildren(selector.toString(), parent);
            if (numberOfAllChildren != numberOfDirectChildren) {
                return null;
            }
        }

        if (numberOfDirectChildren > 1) {
            org.jsoup.select.Elements childrenWithSameSelector = parent.select(directChildrenSelector);
            String type = childrenWithSameSelector.get(0).tagName();
            org.jsoup.select.Elements childrenWithSameType = parent.select(">" + type);
            int siblingIndex = childrenWithSameType.indexOf(element);

            if (anyPrecedingSiblingIsAStopElement(childrenWithSameType, siblingIndex)) {
                return null;
            }

            selector.append(String.format(":nth-of-type(%d)", siblingIndex + 1));
        }

        if (hasReachedLastRepeaterElement(context, parent)) {
            return selector.toString();
        }

        selector.insert(0, " > ");

        String parentSelector = generateCssSelector(parent, context);
        return parentSelector == null ? null : parentSelector + selector.toString();
    }

    private static void addClasses(Element element, StringBuilder selector) {
        String classes = StringUtil.join(element.classNames(), ".");
        if (classes.length() > 0) {
            selector.append('.').append(classes);
        }
    }

    private static int getNumberOfChildren(String selector, Element parent) {
        org.jsoup.select.Elements elements = parent.select(selector);
        elements.remove(parent);
        return elements.size();
    }

    private static boolean anyPrecedingSiblingIsAStopElement(org.jsoup.select.Elements childrenWithSameType,
                                                             int siblingIndex) {
        for (int i = 0; i <= siblingIndex; i++) {
            Element sibling = childrenWithSameType.get(i);
            if (isStopElement(sibling)) {
                return true;
            }
        }
        return false;
    }

    private static boolean isStopElement(Element element) {
        String[] normalizedAttributes = new String[] {"ng-if", "ng-repeat"};

        for (String normalizedAttribute : normalizedAttributes) {
            if (hasNormalizedAttribute(element, normalizedAttribute)) {
                return true;
            }
        }

        String[] regularAttributes = new String[] {"*ngIf", "*ngFor"};

        for (String regularAttribute : regularAttributes) {
            if (!Strings.isNullOrEmpty(element.attr(regularAttribute))) {
                return true;
            }
        }

        return false;
    }

    private static boolean hasReachedLastRepeaterElement(GeneratorContext context, Element parent) {
        return context.isNestedElement() && context.getLastRepeaterElement() == parent;
    }

}
