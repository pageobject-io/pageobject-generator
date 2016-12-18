package io.pageobject.generator;

import com.google.common.collect.HashMultimap;
import com.google.common.collect.Multimap;
import io.pageobject.generator.locator.*;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Stack;

import static com.google.common.collect.Maps.newLinkedHashMap;
import static io.pageobject.generator.attribute.Attributes.hasRepeaterAttribute;

public class GeneratorContext {

    protected final Document document;
    protected Element element;
    protected final String source;
    protected final ApplicationType applicationType;
    protected Element firstElementInGroup;
    protected Stack<LocatorPartGenerator> locatorPartGenerators = new Stack<>();
    protected LocatorPartGenerator stashedLocatorPartGenerator;
    protected LinkedHashMap<String, String> fragments = newLinkedHashMap();
    protected int controlIndex = -1;
    protected String name;
    protected Locator locator;
    protected boolean controlIndexGenerated;
    protected boolean repeaterElement;
    protected Stack<String> controllers = new Stack<>();

    protected Multimap<LocatorSources, String> usedLocators = HashMultimap.create();

    public GeneratorContext(Document document, String source, ApplicationType applicationType) {
        this.document = document;
        this.element = document;
        this.source = source;
        this.applicationType = applicationType;
    }

    public Document getDocument() {
        return document;
    }

    public Element getElement() {
        return element;
    }

    public void setElement(Element element) {
        this.element = element;
        this.name = null;
        this.locator = null;
        this.controlIndexGenerated = false;
        this.repeaterElement = hasRepeaterAttribute(element);
        unstashRepeaterLocatorPartGenerator();
    }

    public boolean isNestedElement() {
        return locatorPartGenerators.size() > 1;
    }

    public void pushNgRepeat(Element element, String repeaterExpression) {
        locatorPartGenerators.push(new NgRepeatLocatorPartGenerator(element, repeaterExpression));
    }

    public void pushNgFor(Element element) {
        locatorPartGenerators.push(new NgForLocatorPartGenerator(element));
    }

    public void pushLocatorPartGenerator(LocatorPartGenerator locatorPartGenerator) {
        locatorPartGenerators.push(locatorPartGenerator);
    }

    public LocatorPartGenerator popLocatorPartGenerator() {
        return locatorPartGenerators.pop();
    }

    public Stack<LocatorPartGenerator> getLocatorPartGenerators() {
        return locatorPartGenerators;
    }

    public void stashLastRepeaterLocatorPartGenerator() {
        this.stashedLocatorPartGenerator = locatorPartGenerators.pop();
    }

    public void unstashRepeaterLocatorPartGenerator() {
        if (stashedLocatorPartGenerator != null) {
            locatorPartGenerators.push(stashedLocatorPartGenerator);
            stashedLocatorPartGenerator = null;
        }
    }

    public Element getLastRepeaterElement() {
        return locatorPartGenerators.get(locatorPartGenerators.size() - 2).getElement();
    }

    public void addFragments(Map<String, String> fragments) {
        this.fragments.putAll(fragments);
    }

    public LinkedHashMap<String, String> getFragments() {
        return fragments;
    }

    public int getControlIndex() {
        if (!controlIndexGenerated) {
            controlIndex++;
            controlIndexGenerated = true;
        }

        return controlIndex;
    }

    public boolean isLocatorAvailable(LocatorSources locatorSource, String value) {
        return !usedLocators.containsEntry(locatorSource, value);
    }

    public void markLocatorAsUsed(LocatorSources locatorSources, String value) {
        usedLocators.put(locatorSources, value);
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Locator getLocator() {
        return locator;
    }

    public void setLocator(Locator locator) {
        this.locator = locator;
    }

    public void setFirstElementInGroup(Element firstElementInGroup) {
        this.firstElementInGroup = firstElementInGroup;
    }

    public void addElementToResult(boolean hadMatchingProcessors) {
    }

    public boolean isRepeaterElement() {
        return repeaterElement;
    }

    public String getSource() {
        return source;
    }

    public ApplicationType getApplicationType() {
        return applicationType;
    }

    public void pushController(String controllerName) {
        controllers.push(controllerName);
    }

    public void popController() {
        controllers.pop();
    }

    public List<String> getControllerNames() {
        return controllers;
    }
}
