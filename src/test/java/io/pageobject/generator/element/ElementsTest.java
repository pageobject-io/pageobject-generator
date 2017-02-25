package io.pageobject.generator.element;

import io.pageobject.generator.ApplicationType;
import io.pageobject.generator.FrameworkType;
import io.pageobject.generator.GeneratorContext;
import io.pageobject.generator.Language;
import io.pageobject.generator.locator.SingleElementLocatorPartGenerator;
import io.pageobject.generator.locator.protractor.IdLocatorSource;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.junit.Test;

import static io.pageobject.generator.element.Elements.generateCssSelector;
import static org.fest.assertions.api.Assertions.assertThat;

public class ElementsTest {

    @Test
    public void cssSelectorWithRegularElements() throws Exception {
        GeneratorContext context = getContext("<div>A <div>B <div>C</div></div></div>");
        Document document = context.getDocument();

        Element divA = document.select("div").get(0);
        Element divB = document.select("div").get(1);
        Element divC = document.select("div").get(2);

        assertThat(generateCssSelector(divA, context)).isEqualTo("div");
        assertThat(generateCssSelector(divB, context)).isEqualTo("div > div");
        assertThat(generateCssSelector(divC, context)).isEqualTo("div > div > div");
    }

    @Test
    public void cssSelectorWithId() throws Exception {
        GeneratorContext context = getContext("<div><div id=\"id1\">A <div>B <div>C</div></div></div></div>");
        Document document = context.getDocument();

        Element divA = document.select("div").get(1);
        Element divB = document.select("div").get(2);
        Element divC = document.select("div").get(3);

        assertThat(generateCssSelector(divA, context)).isEqualTo("#id1");
        assertThat(generateCssSelector(divB, context)).isEqualTo("#id1 > div");
        assertThat(generateCssSelector(divC, context)).isEqualTo("#id1 > div > div");
    }

    @Test
    public void cssSelectorWithClasses() throws Exception {
        GeneratorContext context =
            getContext("<div><div class=\"a b\">A <div class=\"c\">B <div>C</div></div></div></div>");
        Document document = context.getDocument();

        Element divA = document.select("div").get(1);
        Element divB = document.select("div").get(2);
        Element divC = document.select("div").get(3);

        assertThat(generateCssSelector(divA, context)).isEqualTo("div > div.a.b");
        assertThat(generateCssSelector(divB, context)).isEqualTo("div > div.a.b > div.c");
        assertThat(generateCssSelector(divC, context)).isEqualTo("div > div.a.b > div.c > div");
    }

    @Test
    public void cssSelectorWithNamespacedElements() throws Exception {
        GeneratorContext context = getContext("\"<html><body><fb:comments /></body></html>\"");
        Document document = context.getDocument();

        org.jsoup.select.Elements comments = document.select("fb|comments");

        assertThat(generateCssSelector(comments.get(0), context)).isEqualTo("body > fb|comments");
    }

    @Test
    public void cssSelectorWithMultipleChildren() throws Exception {
        GeneratorContext context = getContext(
            "<div><div>A</div><div>B</div><span></span><div class=\"a\">C</div><div class=\"a\">D</div></div>");
        Document document = context.getDocument();

        Element divA = document.select("div").get(1);
        Element divB = document.select("div").get(2);
        Element divC = document.select("div").get(3);
        Element divD = document.select("div").get(4);

        assertThat(generateCssSelector(divA, context)).isEqualTo("div > div:nth-of-type(1)");
        assertThat(generateCssSelector(divB, context)).isEqualTo("div > div:nth-of-type(2)");
        assertThat(generateCssSelector(divC, context)).isEqualTo("div > div.a:nth-of-type(3)");
        assertThat(generateCssSelector(divD, context)).isEqualTo("div > div.a:nth-of-type(4)");
    }

    @Test
    public void cssSelectorStopsAtRepeater() throws Exception {
        GeneratorContext context =
            getContext("<div>A <div ng-repeat=\"item in items\">B <div class=\"a\">C <div>D</div></div></div></div>");
        Document document = context.getDocument();

        Element divB = document.select("div").get(1);
        Element divC = document.select("div").get(2);
        Element divD = document.select("div").get(3);

        context.pushNgRepeat(divB, "item in items");
        context.pushLocatorPartGenerator(new SingleElementLocatorPartGenerator(divC, new IdLocatorSource()));

        assertThat(generateCssSelector(divC, context)).isEqualTo("div.a");
        assertThat(generateCssSelector(divD, context)).isEqualTo("div.a > div");
    }

    @Test
    public void cssSelectorDoesNotGenerateSelectorIfNestedRepeaterHasSimilarElements() throws Exception {
        GeneratorContext context = getContext(
            "<div ng-repeat=\"item in items\">A <div class=\"a\">B <div ng-repeat=\"element in elements\">C <div class=\"a\">D</div></div></div></div>");
        Document document = context.getDocument();

        Element divA = document.select("div").get(0);
        Element divB = document.select("div").get(1);
        Element divC = document.select("div").get(2);
        Element divD = document.select("div").get(3);

        context.pushNgRepeat(divA, "item in items");
        context.pushLocatorPartGenerator(new SingleElementLocatorPartGenerator(divC, new IdLocatorSource()));

        assertThat(generateCssSelector(divB, context)).isNull();

        context.popLocatorPartGenerator();
        context.pushNgRepeat(divC, "element in elements");
        context.pushLocatorPartGenerator(new SingleElementLocatorPartGenerator(divC, new IdLocatorSource()));

        assertThat(generateCssSelector(divD, context)).isEqualTo("div.a");
    }

    @Test
    public void cssSelectorDoesNotGenerateAnythingIfPrecedingSiblingHasStopAttribute() throws Exception {
        tryStopElement("ng-if");
        tryStopElement("ng-repeat");
        tryStopElement("*ngIf");
        tryStopElement("*ngFor");
    }

    private void tryStopElement(String attribute) throws Exception {
        GeneratorContext context =
            getContext("<div><div>A</div><div " + attribute + "=\"a\">B</div><div>C</div></div>");
        Document document = context.getDocument();

        Element divA = document.select("div").get(1);
        Element divB = document.select("div").get(2);
        Element divC = document.select("div").get(3);

        assertThat(generateCssSelector(divA, context)).isEqualTo("div > div:nth-of-type(1)");
        assertThat(generateCssSelector(divB, context)).isNull();
        assertThat(generateCssSelector(divC, context)).isNull();
    }

    private GeneratorContext getContext(String source) throws Exception {
        Document document = Jsoup.parse(source);
        return new GeneratorContext(document, source, ApplicationType.ANGULAR1, FrameworkType.PROTRACTOR, Language.ES5);
    }
}