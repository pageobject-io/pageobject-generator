package io.pageobject.generator.element;

import io.pageobject.generator.ApplicationType;
import io.pageobject.generator.GeneratorContext;
import io.pageobject.generator.locator.*;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.parser.Tag;
import org.junit.Before;
import org.junit.Test;

import static org.fest.assertions.api.Assertions.assertThat;

public class ElementLocatorGeneratorTest {

    private GeneratorContext context;
    private ElementLocatorGenerator generator = new ElementLocatorGenerator();

    @Before
    public void setUp() throws Exception {
        context = new GeneratorContext(new Document(""), "", ApplicationType.ANGULAR1);
    }

    @Test
    public void simpleElements() throws Exception {
        assertThat(getSingleElementLocator("id", "name")).isEqualTo("element(by.id('name'))");
        assertThat(getSingleElementLocator("name", "name")).isEqualTo("element(by.name('name'))");
        assertThat(getSingleElementLocator("ng:model", "name")).isEqualTo("element(by.model('name'))");
        assertThat(getSingleElementLocator("ng_model", "name1")).isEqualTo("element(by.model('name1'))");
        assertThat(getSingleElementLocator("ng_options", "name1")).isEqualTo("element(by.options('name1'))");
    }

    @Test
    public void multipleElements() throws Exception {
        assertThat(getMultiElementLocator("id", "name")).isEqualTo("element.all(by.id('name'))");
        assertThat(getMultiElementLocator("name", "name")).isEqualTo("element.all(by.name('name'))");
        assertThat(getMultiElementLocator("ng:model", "name")).isEqualTo("element.all(by.model('name'))");
        assertThat(getMultiElementLocator("ng_model", "name1")).isEqualTo("element.all(by.model('name1'))");
    }

    @Test
    public void respectsAttributeOrder() throws Exception {
        assertThat(getSingleElementLocator("id", "name", "name", "ignored")).isEqualTo("element(by.id('name'))");
        assertThat(getSingleElementLocator("id", "name1", "name", "ignored", "ng_model", "ignored")).isEqualTo(
            "element(by.id('name1'))");
        assertThat(getSingleElementLocator("name",
                                           "name",
                                           "ng-model",
                                           "ignored")).isEqualTo("element(by.name('name'))");
    }

    @Test
    public void sameLocatorIsOnlyUsedOnce() throws Exception {
        assertThat(getSingleElementLocator("id", "name", "name", "ignored")).isEqualTo("element(by.id('name'))");
        context.markLocatorAsUsed(LocatorSources.ID, "name");
        assertThat(getSingleElementLocator("id", "name", "name", "fallback")).isEqualTo("element(by.name('fallback'))");
    }

    @Test
    public void noLocatorCanBeFound() throws Exception {
        assertThat(getSingleElementLocator("id1", "name")).isNull();

        getSingleElementLocator("id", "name");
        context.markLocatorAsUsed(LocatorSources.ID, "name");
        Element repeaterElement = createElement();
        repeaterElement.attr("ng-repeat", "item in items track by something");
        context.pushNgRepeat(repeaterElement, "item in items");
        assertThat(getSingleElementLocator("id", "name")).isNull();

    }

    @Test
    public void handlesElementsInRepeaters() throws Exception {
        Element repeaterElement = createElement();
        repeaterElement.attr("ng-repeat", "item in items track by something");
        context.pushNgRepeat(repeaterElement, "item in items");
        assertThat(getSingleElementLocator("id", "name")).isEqualTo("this.items.get(rowIndex1).element(by.id('name'))");
        context.pushNgRepeat(createElement(), "element in elements");
        assertThat(getSingleElementLocator("id", "name", "name", "name1")).isEqualTo(
            "this.items.get(rowIndex1).element(by.exactRepeater('element in elements').row(rowIndex2)).element(by.id('name'))");
    }

    @Test
    public void handlesNgRepeatElement() throws Exception {
        Element repeaterElement = createElement();
        repeaterElement.attr("ng-repeat", "item in items track by something");
        context.setElement(repeaterElement);
        context.pushNgRepeat(repeaterElement, "item in items");
        assertThat(getLocator(repeaterElement)).isEqualTo("element.all(by.exactRepeater('item in items'))");
    }

    @Test
    public void handlesSimpleElementThatHasRepeaterAsWell() throws Exception {
        Element repeaterElement = createElement();
        repeaterElement.attr("ng-repeat", "item in items track by something");
        context.setElement(repeaterElement);
        context.pushNgRepeat(repeaterElement, "item in items");
        assertThat(getLocatorWhenElementIsRepeated(repeaterElement,
                                                   "id",
                                                   "name")).isEqualTo("this.items.get(rowIndex1)");
    }

    @Test
    public void handlesNgRepeatStartElement() throws Exception {
        Element repeaterElement = createElement();
        repeaterElement.attr("ng-repeat-start", "item in items");
        context.setElement(repeaterElement);
        context.pushNgRepeat(repeaterElement, "item in items");
        assertThat(getLocator(repeaterElement)).isEqualTo("element.all(by.exactRepeater('item in items'))");
    }

    @Test
    public void handlesNgRepeatWithMultipleElements() throws Exception {
        Element repeaterElement = createElement();
        repeaterElement.attr("ng-repeat", "item in items");
        context.pushNgRepeat(repeaterElement, "item in items");
        assertThat(getMultiElementLocator("id", "name")).isEqualTo("this.items.get(rowIndex1).all(by.id('name'))");
        context.pushNgRepeat(createElement(), "element in elements");
        assertThat(getMultiElementLocator("id", "name", "name", "name1")).isEqualTo(
            "this.items.get(rowIndex1).element(by.exactRepeater('element in elements').row(rowIndex2)).all(by.id('name'))");
    }

    @Test
    public void handlesNgRepeatStartWithMultipleElements() throws Exception {
        Element repeaterElement = createElement();
        repeaterElement.attr("ng-repeat-start", "item in items");
        context.pushNgRepeat(repeaterElement, "item in items");
        assertThat(getMultiElementLocator("id", "name")).isEqualTo("this.items.get(rowIndex1).all(by.id('name'))");
        context.pushNgRepeat(createElement(), "element in elements");
        assertThat(getMultiElementLocator("id", "name", "name", "name1")).isEqualTo(
            "this.items.get(rowIndex1).element(by.exactRepeater('element in elements').row(rowIndex2)).all(by.id('name'))");
    }

    @Test
    public void handlesIndexExpressions() throws Exception {
        Element repeaterElement = createElement();
        repeaterElement.attr("ng-repeat", "item in items");
        context.setElement(repeaterElement);
        context.pushNgRepeat(repeaterElement, "item in items");
        assertThat(getSingleElementLocator("id", "name{{$index}}")).isEqualTo(
            "this.items.get(rowIndex1).element(by.id(`name${rowIndex1}`))");
        assertThat(getSingleElementLocator("name", "name{{$index}}")).isEqualTo(
            "this.items.get(rowIndex1).element(by.name(`name${rowIndex1}`))");
        assertThat(getSingleElementLocator("ng-model", "model{{$index}}")).isEqualTo(
            "this.items.get(rowIndex1).element(by.model(`model${rowIndex1}`))");
        assertThat(getSingleElementLocator("ng-options", "color.name for color in colors{{$index}}")).isEqualTo(
            "this.items.get(rowIndex1).element(by.options(`color.name for color in colors${rowIndex1}`))");

        Element repeaterElement2 = createElement();
        repeaterElement2.attr("ng-repeat", "item in items{{$index}}");
        context.setElement(repeaterElement2);
        context.pushNgRepeat(repeaterElement2, "item in items");
        assertThat(getLocator(repeaterElement2)).isEqualTo(
            "this.items.get(rowIndex1).all(by.exactRepeater(`item in items${rowIndex1}`))");
    }

    @Test
    public void handlesIndexExpressionsInNestedRepeater() throws Exception {
        Element repeaterElement = createElement();
        repeaterElement.attr("ng-repeat", "item in items");
        context.setElement(repeaterElement);
        context.pushNgRepeat(repeaterElement, "item in items");

        Element repeaterElement2 = createElement();
        repeaterElement2.attr("ng-repeat", "element in elements");
        context.setElement(repeaterElement2);
        context.pushNgRepeat(repeaterElement2, "element in elements");

        assertThat(getSingleElementLocator("id", "name{{$index}}")).isEqualTo(
            "this.items.get(rowIndex1).element(by.exactRepeater('element in elements').row(rowIndex2)).element(by.id(`name${rowIndex2}`))");
        assertThat(getSingleElementLocator("name", "name{{$index}}")).isEqualTo(
            "this.items.get(rowIndex1).element(by.exactRepeater('element in elements').row(rowIndex2)).element(by.name(`name${rowIndex2}`))");
        assertThat(getSingleElementLocator("ng-model", "model{{$index}}")).isEqualTo(
            "this.items.get(rowIndex1).element(by.exactRepeater('element in elements').row(rowIndex2)).element(by.model(`model${rowIndex2}`))");
        assertThat(getSingleElementLocator("ng-options", "color.name for color in colors{{$index}}")).isEqualTo(
            "this.items.get(rowIndex1).element(by.exactRepeater('element in elements').row(rowIndex2)).element(by.options(`color.name for color in colors${rowIndex2}`))");

        Element repeaterElement3 = createElement();
        repeaterElement3.attr("ng-repeat", "item in items{{$index}}");
        context.setElement(repeaterElement3);
        context.pushNgRepeat(repeaterElement3, "item in items");
        assertThat(getLocator(repeaterElement3)).isEqualTo(
            "this.items.get(rowIndex1).element(by.exactRepeater('element in elements').row(rowIndex2)).all(by.exactRepeater(`item in items${rowIndex2}`))");
    }

    private String getSingleElementLocator(String... attributes) {
        Element element = createElement();
        return getSingleElementLocator(element, attributes);
    }

    private String getSingleElementLocator(Element element, String... attributes) {
        Locator locator = getLocator(new SingleElementLocatorPartGenerator(element,
                                                                           LocatorSources.ID,
                                                                           LocatorSources.NAME,
                                                                           LocatorSources.NG_MODEL,
                                                                           LocatorSources.NG_OPTIONS),
                                     element,
                                     attributes);
        return locator == null ? null : locator.getLocator();
    }

    private String getMultiElementLocator(String... attributes) {
        Element element = createElement();
        return getLocator(new MultiElementLocatorPartGenerator(element,
                                                               LocatorSources.ID,
                                                               LocatorSources.NAME,
                                                               LocatorSources.NG_MODEL,
                                                               LocatorSources.NG_OPTIONS),
                          element,
                          attributes).getLocator();
    }

    private String getLocator(Element element, String... attributes) {
        return getLocator(null, element, attributes).getLocator();
    }

    private String getLocatorWhenElementIsRepeated(Element element, String... attributes) {
        return getLocator(null, element, attributes).getLocatorWhenElementIsRepeated();
    }

    private Locator getLocator(LocatorPartGenerator locatorPartGenerator, Element element, String... attributes) {
        for (int i = 0; i < attributes.length; i = i + 2) {
            element.attr(attributes[i], attributes[i + 1]);
        }
        context.setElement(element);

        if (locatorPartGenerator != null) {
            context.pushLocatorPartGenerator(locatorPartGenerator);
        }

        Locator locator = generator.generate(context);

        if (locatorPartGenerator != null) {
            context.popLocatorPartGenerator();
        }

        return locator;
    }

    private Element createElement() {
        return new Element(Tag.valueOf("div"), "");
    }
}