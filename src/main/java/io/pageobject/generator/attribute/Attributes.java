package io.pageobject.generator.attribute;

import org.jsoup.nodes.Element;

import static com.google.common.base.Strings.isNullOrEmpty;

public class Attributes {

    public static String getNormalizedAttributeValue(Element element, String attributeKey) {
        return getNormalizedAttribute(element, attributeKey).value;
    }

    private static Attribute getNormalizedAttribute(Element element, String attributeKey) {
        Attribute attribute = new Attribute();
        String[] variants = {attributeKey, attributeKey.replaceAll("-", ":"), attributeKey.replaceAll("-", "_")};

        for (String variant : variants) {
            attribute = tryVariant(element, variant);

            if (attribute.isPresent) {
                break;
            }
        }

        return attribute;
    }

    private static Attribute tryVariant(Element element, String attributeKey) {
        Attribute attribute = new Attribute();

        String[] keys = {attributeKey,
                         "data-" + attributeKey,
                         "data_" + attributeKey,
                         "data:" + attributeKey,
                         "x-" + attributeKey,
                         "x_" + attributeKey,
                         "x:" + attributeKey};

        for (String key : keys) {
            attribute.key = key;
            attribute.value = element.attr(key);
            attribute.isPresent = element.hasAttr(key);

            if (attribute.isPresent) {
                break;
            }
        }

        return attribute;
    }

    public static boolean hasNormalizedAttribute(Element element, String attributeKey) {
        return getNormalizedAttribute(element, attributeKey).isPresent;
    }

    public static String getNormalizedAttributeKey(Element element, String attributeKey) {
        Attribute attribute = getNormalizedAttribute(element, attributeKey);
        return isNullOrEmpty(attribute.value) ? null : attribute.key;
    }

    public static boolean hasRepeaterAttribute(Element element) {
        return !isNullOrEmpty(getRepeaterAttribute(element));
    }

    public static String getRepeaterAttribute(Element element) {
        String repeatExpression = getNormalizedAttributeValue(element, HtmlAttributes.NG_REPEAT.attributeName());
        if (isNullOrEmpty(repeatExpression)) {
            repeatExpression = getNormalizedAttributeValue(element, HtmlAttributes.NG_REPEAT_START.attributeName());
        }

        return repeatExpression;
    }

    public static boolean hasAngular2EventBindingAttribute(Element element, String event) {
        return !isNullOrEmpty(getAngular2EventBindingAttribute(element, event));
    }

    public static String getAngular2EventBindingAttribute(Element element, String event) {
        String value = element.attr("(" + event + ")");
        if (isNullOrEmpty(value)) {
            value = element.attr("on-" + event);
        }

        return value;
    }

    private static class Attribute {
        String key;
        String value;
        boolean isPresent;
    }

}
