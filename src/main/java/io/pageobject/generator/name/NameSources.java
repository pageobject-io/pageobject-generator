package io.pageobject.generator.name;

import io.pageobject.generator.attribute.HtmlAttributes;
import org.jsoup.nodes.Element;

import static com.google.common.base.Strings.isNullOrEmpty;
import static io.pageobject.generator.Expressions.*;
import static io.pageobject.generator.attribute.Attributes.getNormalizedAttributeValue;
import static io.pageobject.generator.attribute.Attributes.getRepeaterAttribute;

/*
 * The order of the enum constants determines the priority 
 */
public enum NameSources {

    NG_REPEAT {
        @Override
        public String extractName(Element element) {
            String repeatExpression = getRepeaterAttribute(element);
            return isNullOrEmpty(repeatExpression) ? null : extractNameFromRepeater(repeatExpression);
        }
    }, NG_FOR {
        @Override
        public String extractName(Element element) {
            String ngFor = element.attr("*ngFor");
            return isNullOrEmpty(ngFor) ? null : extractNameFromNgFor(ngFor);
        }
    }, NAME {
        @Override
        public String extractName(Element element) {
            return extractAttributeName(element, HtmlAttributes.NAME);
        }
    }, NG_MODEL {
        @Override
        public String extractName(Element element) {
            return extractAttributeName(element, HtmlAttributes.NG_MODEL);
        }
    }, ID {
        @Override
        public String extractName(Element element) {
            return extractAttributeName(element, HtmlAttributes.ID);
        }
    }, NG_BIND {
        @Override
        public String extractName(Element element) {
            return extractAttributeName(element, HtmlAttributes.NG_BIND);
        }
    }, NG_BIND_HTML {
        @Override
        public String extractName(Element element) {
            return extractAttributeName(element, HtmlAttributes.NG_BIND_HTML);
        }
    }, NG_BIND_TEMPLATE {
        @Override
        public String extractName(Element element) {
            return getFirstExpression(extractAttributeName(element, HtmlAttributes.NG_BIND_TEMPLATE));
        }
    }, EXPRESSION_TEXT {
        @Override
        public String extractName(Element element) {
            return getFirstExpression(element.ownText());
        }
    }, VALUE {
        @Override
        public String extractName(Element element) {
            return extractAttributeName(element, HtmlAttributes.VALUE);
        }
    }, TITLE {
        @Override
        public String extractName(Element element) {
            return extractAttributeName(element, HtmlAttributes.TITLE);
        }
    }, TEXT {
        @Override
        public String extractName(Element element) {
            return element.text();
        }
    };

    public abstract String extractName(Element element);

    private static String extractAttributeName(Element element, HtmlAttributes htmlAttribute) {
        return getNormalizedAttributeValue(element, htmlAttribute.attributeName());
    }

}
