package io.pageobject.generator.element;

import com.google.common.base.Joiner;
import io.pageobject.generator.GeneratorContext;
import io.pageobject.generator.ProcessingResult;
import io.pageobject.generator.locator.*;
import org.apache.commons.lang3.StringUtils;
import org.jsoup.nodes.Element;

import java.util.List;
import java.util.Map;
import java.util.Stack;

import static com.google.common.base.Strings.isNullOrEmpty;
import static com.google.common.collect.Lists.newArrayList;
import static com.google.common.collect.Maps.newHashMap;

public abstract class AbstractElementProcessor implements ElementProcessor {

    public static final String FIELD = "field";
    public static final String CLICK = "click";
    public static final String CLICK_BY_INDEX = "click-by-index";
    public static final String CLICK_BY_VALUE = "click-by-value";
    public static final String ASSERTION_SELECTED = "assertion-selected";
    public static final String ASSERTION_SELECTED_BY_INDEX = "assertion-selected-by-index";
    public static final String ASSERTION_SELECTED_BY_VALUE = "assertion-selected-by-value";
    public static final String ASSERTION_VISIBILITY = "assertion-visibility";
    public static final String ASSERTION_VISIBILITY_BY_INDEX = "assertion-visibility-by-index";
    public static final String ASSERTION_ENABLED = "assertion-enabled";
    public static final String ASSERTION_ENABLED_BY_INDEX = "assertion-enabled-by-index";
    public static final String ASSERTION_TEXT = "assertion-text";
    public static final String ASSERTION_HAS_CLASS = "assertion-has-class";

    protected final ElementLocatorGenerator elementLocatorGenerator = new ElementLocatorGenerator();

    @Override
    public ProcessingResult process(GeneratorContext context) throws Exception {
        Element element = context.getElement();

        String name = context.getName();

        boolean locatorPartGeneratorWasAdded = addLocatorPartGeneratorToContext(context, element);
        String locator = getLocator(context);

        String id = element.attr("id");

        Map<String, Object> templateModel = newHashMap();
        templateModel.put("name", name);
        templateModel.put("nameTitle", StringUtils.capitalize(name));
        templateModel.put("id", id);
        templateModel.put("locator", locator);
        templateModel.put("referenceToElement", context.isNestedElement() ? locator : "this." + name);
        templateModel.put("functionArguments", generateFunctionArguments(context));
        templateModel.put("functionArgumentsCount", context.getLocatorPartGenerators().size() - 1);

        populateTemplateModel(templateModel, context);

        List<String> templates = getTemplates(context, templateModel);
        if (!context.isNestedElement()) {
            templates.add(0, FIELD);
        }

        context.setFirstElementInGroup(element);

        if (locatorPartGeneratorWasAdded) {
            context.popLocatorPartGenerator();
        }

        return getNormalResult(templateModel, templates);
    }

    protected boolean addLocatorPartGeneratorToContext(GeneratorContext context, Element element) {
        LocatorPartGenerator locatorPartGenerator = getLocatorPartGenerator(element, context);
        if (locatorPartGenerator != null) {
            context.pushLocatorPartGenerator(locatorPartGenerator);
            return true;
        }

        return false;
    }

    protected LocatorPartGenerator getLocatorPartGenerator(Element element, GeneratorContext context) {
        return new SingleElementLocatorPartGenerator(element, getElementLocatorCandidates(context));
    }

    protected LocatorSources[] getElementLocatorCandidates(GeneratorContext context) {
        return new LocatorSources[] {LocatorSources.ID,
                                     LocatorSources.NAME,
                                     LocatorSources.NG_MODEL,
                                     LocatorSources.CSS};
    }

    public Locator generateElementLocator(GeneratorContext context) {
        boolean generatorWasAdded = addLocatorPartGeneratorToContext(context, context.getElement());

        Locator locator = elementLocatorGenerator.generate(context);

        if (generatorWasAdded) {
            context.popLocatorPartGenerator();
        }

        return locator;
    }

    protected String getLocator(GeneratorContext context) {
        Locator locator = context.getLocator();
        return isNullOrEmpty(locator.getLocatorWhenElementIsRepeated()) ? locator.getLocator() : locator.getLocatorWhenElementIsRepeated();
    }

    private String generateFunctionArguments(GeneratorContext context) {
        Stack<LocatorPartGenerator> locatorPartGenerators = context.getLocatorPartGenerators();
        List<String> indices = newArrayList();
        for (int i = 0; i < locatorPartGenerators.size() - 1; i++) {
            indices.add("rowIndex" + (i + 1));
        }

        return Joiner.on(", ").join(indices);
    }

    protected void populateTemplateModel(Map<String, Object> templateModel, GeneratorContext context) {

    }

    protected abstract List<String> getTemplates(GeneratorContext context, Map<String, Object> templateModel);

    protected String getExpression(String text) {
        int i = 2;
        char pipe = '|';
        char closingBrace = '}';
        StringBuilder expression = new StringBuilder();

        while (i < text.length()) {
            char current = text.charAt(i);
            if (current == pipe || current == closingBrace) {
                break;
            }
            expression.append(current);
            i++;
        }

        return expression.toString().trim();
    }

    protected String getLastElementOfTranslationKey(String text) {
        String key = getExpression(text);

        return key.contains(".") ? key.substring(key.lastIndexOf('.') + 1, key.length() - 1) : key;
    }

    protected ProcessingResult getNormalResult(Map<String, Object> templateModel, String... templates) {
        return new ProcessingResult(templateModel, true, newArrayList(templates));
    }

    protected ProcessingResult getNormalResult(Map<String, Object> templateModel, List<String> templates) {
        return new ProcessingResult(templateModel, true, templates);
    }

    protected ProcessingResult getTerminatedResult(Map<String, Object> templateModel, String... templates) {
        return new ProcessingResult(templateModel, false, newArrayList(templates));
    }

    protected boolean hasParentWithClass(Element element, String clazz) {
        org.jsoup.select.Elements parents = element.parents();
        return parents.hasClass(clazz);
    }

    protected boolean hasParentWithNodeName(Element element, String nodeName) {
        org.jsoup.select.Elements parents = element.parents();

        for (Element parent : parents) {
            if (parent.nodeName().equals(nodeName)) {
                return true;
            }
        }

        return false;
    }

    protected Element getFirstParentWithClass(Element element, String clazz) {
        for (Element parent : element.parents()) {
            if (parent.hasClass(clazz)) {
                return parent;
            }
        }
        return null;
    }

}
