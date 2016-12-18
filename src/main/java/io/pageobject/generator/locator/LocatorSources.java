package io.pageobject.generator.locator;

import io.pageobject.generator.ApplicationType;
import io.pageobject.generator.GeneratorContext;
import io.pageobject.generator.attribute.HtmlAttributes;
import org.apache.commons.lang3.ArrayUtils;
import org.jsoup.nodes.Element;

import static com.google.common.base.Strings.isNullOrEmpty;
import static io.pageobject.generator.Expressions.*;
import static io.pageobject.generator.attribute.Attributes.getNormalizedAttributeValue;
import static io.pageobject.generator.attribute.Attributes.getRepeaterAttribute;
import static io.pageobject.generator.element.Elements.generateCssSelector;

/*
 * The order of the enum constants determines the priority 
 */
public enum LocatorSources {

    NG_REPEAT() {
        @Override
        public String locatorTemplate() {
            return "by.exactRepeater('%s')";
        }

        @Override
        public String extractLocatorValue(Element element, GeneratorContext context) {
            return allowIndexExpressionOrNoExpressions(extractExactRepeater(getRepeaterAttribute(element)));
        }

        @Override
        public boolean isEnabledForApplicationType(ApplicationType type) {
            return type.equals(ApplicationType.ANGULAR1);
        }
    }, NG_OPTIONS() {
        @Override
        public String locatorTemplate() {
            return "by.options('%s')";
        }

        @Override
        public String extractLocatorValue(Element element, GeneratorContext context) {
            return extractAttributeValueAllowingIndexExpression(element, HtmlAttributes.NG_OPTIONS);
        }

        @Override
        public boolean isEnabledForApplicationType(ApplicationType type) {
            return type.equals(ApplicationType.ANGULAR1);
        }
    }, ID() {
        @Override
        public String locatorTemplate() {
            return "by.id('%s')";
        }

        @Override
        public String extractLocatorValue(Element element, GeneratorContext context) {
            return extractAttributeValueAllowingIndexExpression(element, HtmlAttributes.ID);
        }
    }, NAME() {
        @Override
        public String locatorTemplate() {
            return "by.name('%s')";
        }

        @Override
        public String extractLocatorValue(Element element, GeneratorContext context) {
            return extractAttributeValueAllowingIndexExpression(element, HtmlAttributes.NAME);
        }
    }, NG_MODEL() {
        @Override
        public String locatorTemplate() {
            return "by.model('%s')";
        }

        @Override
        public String extractLocatorValue(Element element, GeneratorContext context) {
            return extractAttributeValueAllowingIndexExpression(element, HtmlAttributes.NG_MODEL);
        }

        @Override
        public boolean isEnabledForApplicationType(ApplicationType type) {
            return type.equals(ApplicationType.ANGULAR1);
        }
    }, NG_BIND() {
        @Override
        public String locatorTemplate() {
            return "by.exactBinding('%s')";
        }

        @Override
        public String extractLocatorValue(Element element, GeneratorContext context) {
            return extractAttributeValue(element, HtmlAttributes.NG_BIND);
        }

        @Override
        public boolean isEnabledForApplicationType(ApplicationType type) {
            return type.equals(ApplicationType.ANGULAR1);
        }
    }, NG_BIND_HTML() {
        @Override
        public String locatorTemplate() {
            return "by.exactBinding('%s')";
        }

        @Override
        public String extractLocatorValue(Element element, GeneratorContext context) {
            return extractAttributeValue(element, HtmlAttributes.NG_BIND_HTML);
        }

        @Override
        public boolean isEnabledForApplicationType(ApplicationType type) {
            return type.equals(ApplicationType.ANGULAR1);
        }
    }, NG_BIND_TEMPLATE() {
        @Override
        public String locatorTemplate() {
            return "by.exactBinding('%s')";
        }

        @Override
        public String extractLocatorValue(Element element, GeneratorContext context) {
            return getFirstExpression(getNormalizedAttributeValue(element,
                                                                  HtmlAttributes.NG_BIND_TEMPLATE.attributeName()));
        }

        @Override
        public boolean isEnabledForApplicationType(ApplicationType type) {
            return type.equals(ApplicationType.ANGULAR1);
        }
    }, EXPRESSION_TEXT() {
        @Override
        public String locatorTemplate() {
            return "by.exactBinding('%s')";
        }

        @Override
        public String extractLocatorValue(Element element, GeneratorContext context) {
            return getFirstExpression(element.ownText());
        }

        @Override
        public boolean isEnabledForApplicationType(ApplicationType type) {
            return type.equals(ApplicationType.ANGULAR1);
        }
    }, BUTTON_TEXT() {
        @Override
        public String locatorTemplate() {
            return "by.buttonText('%s')";
        }

        @Override
        public String extractLocatorValue(Element element, GeneratorContext context) {
            String text = element.text();
            String locator = null;

            if (isNullOrEmpty(text)) {
                locator = element.attr("value");
            } else if (!hasExpression(text)) {
                locator = text;
            }

            return locator;
        }
    }, LINK_TEXT() {
        @Override
        public String locatorTemplate() {
            return "by.linkText('%s')";
        }

        @Override
        public String extractLocatorValue(Element element, GeneratorContext context) {
            String text = element.text();
            return hasExpression(text) ? null : text;
        }
    }, CSS() {
        @Override
        public String locatorTemplate() {
            return "by.css('%s')";
        }

        @Override
        public String extractLocatorValue(Element element, GeneratorContext context) {
            return generateCssSelector(element, context);
        }
    };

    public String locator(String value) {
        return String.format(this.locatorTemplate(), value).replaceAll("'`", "`").replaceAll("`'", "`");
    }

    public abstract String locatorTemplate();

    public abstract String extractLocatorValue(Element element, GeneratorContext context);

    public int priority() {
        return ArrayUtils.indexOf(values(), this);
    }

    public boolean isEnabledForApplicationType(ApplicationType type) {
        return true;
    }

    private static String extractAttributeValue(Element element, HtmlAttributes htmlAttribute) {
        String attributeValue = getNormalizedAttributeValue(element, htmlAttribute.attributeName());
        return hasExpression(attributeValue) ? null : attributeValue;
    }

    private static String extractAttributeValueAllowingIndexExpression(Element element, HtmlAttributes htmlAttribute) {
        String attributeValue = getNormalizedAttributeValue(element, htmlAttribute.attributeName());
        return allowIndexExpressionOrNoExpressions(attributeValue);
    }

    private static String allowIndexExpressionOrNoExpressions(String attributeValue) {
        int expressionCount = getExpressionCount(attributeValue);
        return expressionCount == 0 ||
               (expressionCount == 1 && getFirstExpression(attributeValue).equals("$index")) ? attributeValue : null;
    }

}
