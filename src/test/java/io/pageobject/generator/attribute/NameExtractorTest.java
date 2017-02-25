package io.pageobject.generator.attribute;

import io.pageobject.generator.ApplicationType;
import io.pageobject.generator.FrameworkType;
import io.pageobject.generator.GeneratorContext;
import io.pageobject.generator.Language;
import io.pageobject.generator.name.NameExtractor;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.parser.Tag;
import org.junit.Before;
import org.junit.Test;

import static org.fest.assertions.api.Assertions.assertThat;

public class NameExtractorTest {

    private NameExtractor nameExtractor;

    @Before
    public void setUp() throws Exception {
        nameExtractor = new NameExtractor();
    }

    @Test
    public void leavesValidNameAsIs() throws Exception {
        assertThat(getName("id", "name")).isEqualTo("name");
    }

    @Test
    public void removesAngularBindings() throws Exception {
        assertThat(getName("id", "name{{i}}")).isEqualTo("name");
    }

    @Test
    public void removesArrayAccessors() throws Exception {
        assertThat(getName("id", "name[i]")).isEqualTo("name");
    }

    @Test
    public void convertsToCamelCase() throws Exception {
        assertThat(getName("id", "name-with-multiple-parts")).isEqualTo("nameWithMultipleParts");
        assertThat(getName("id", "name1.with.multiple.parts")).isEqualTo("name1WithMultipleParts");
        assertThat(getName("id", "name2:with:multiple:parts")).isEqualTo("name2WithMultipleParts");
        assertThat(getName("id", "name3_with_multiple_parts")).isEqualTo("name3WithMultipleParts");
        assertThat(getName("id", "name4_with-multiple:parts")).isEqualTo("name4WithMultipleParts");
    }

    @Test
    public void complexName() throws Exception {
        assertThat(getName("id", "'name_with'{{b}}-multiple{{i}}:parts[0] | piped")).isEqualTo("nameWithMultipleParts");
    }

    @Test
    public void removesAccents() throws Exception {
        assertThat(getName("id", "árvíztűrőtükörfúrógép")).isEqualTo("arvizturotukorfurogep");
    }

    @Test
    public void respectsAttributeOrder() throws Exception {
        assertThat(getName("id", "ignored", "name", "name", "ng-model", "ignored")).isEqualTo("name");
        assertThat(getName("id", "ignored", "name", "{{i}}", "ng-model", "name1")).isEqualTo("name1");
        assertThat(getName("id", "name2", "name", "[0]", "ng-model", "{{i}}")).isEqualTo("name2");
    }

    @Test
    public void checksJavaScriptValidity() throws Exception {
        assertThat(getName("id", "this")).isEqualTo("div0");
        assertThat(getName("id", "default")).isEqualTo("div1");
        assertThat(getName("id", "this1")).isEqualTo("this1");
        assertThat(getName("id", "do2")).isEqualTo("do2");
    }

    @Test
    public void handlesPostfixes() throws Exception {
        assertThat(getName(Tag.valueOf("a"), "id", "name")).isEqualTo("nameLink");
        assertThat(getName(Tag.valueOf("a"), "id", "nameLink")).isEqualTo("nameLink");
        assertThat(getName(Tag.valueOf("a"), "id", "nameButton")).isEqualTo("nameButton");
        assertThat(getName(Tag.valueOf("button"), "id", "name1")).isEqualTo("name1Button");
        assertThat(getName(Tag.valueOf("button"), "id", "name1Button")).isEqualTo("name1Button");
    }

    @Test
    public void generatesDefaultNames() throws Exception {
        assertThat(getName("id", "{{i}}")).isEqualTo("div0");
        assertThat(getName("id", "{{i}}")).isEqualTo("div1");
        assertThat(getName("id", "{{i}}")).isEqualTo("div2");
    }

    @Test
    public void handlesKeyValueRepeaters() throws Exception {
        assertThat(getName("ng-repeat", "(name, age) in {'adam':10, 'amalie':12}")).isEqualTo("adam10Amalie12");
    }

    @Test
    public void doesNotGenerateDuplicateNames() throws Exception {
        assertThat(getName("id", "name")).isEqualTo("name");
        assertThat(getName("id", "name")).isEqualTo("div0");
    }

    @Test
    public void removesControllerPrefixes() throws Exception {
        GeneratorContext context = new GeneratorContext(new Document(""),
                                                        "",
                                                        ApplicationType.ANGULAR1,
                                                        FrameworkType.PROTRACTOR,
                                                        Language.ES5);
        context.pushController("myController");
        context.pushController("todoList");

        NameExtractor nameExtractor = new NameExtractor();
        Element element = new Element(Tag.valueOf("div"), "");

        element.attr("title", "todoList.name");
        assertThat(nameExtractor.extractValue(element, context)).isEqualTo("name");

        element.attr("title", "myController.item");
        assertThat(nameExtractor.extractValue(element, context)).isEqualTo("item");

        element.attr("title", "myControllerItem2");
        assertThat(nameExtractor.extractValue(element, context)).isEqualTo("myControllerItem2");

        element.attr("title", "todoListName2");
        assertThat(nameExtractor.extractValue(element, context)).isEqualTo("todoListName2");
    }

    private String getName(String... attributes) throws Exception {
        return getName(Tag.valueOf("div"), attributes);
    }

    private String getName(Tag tag, String... attributes) throws Exception {
        Element element = new Element(tag, "");

        for (int i = 0; i < attributes.length; i = i + 2) {
            element.attr(attributes[i], attributes[i + 1]);
        }

        return nameExtractor.extractValue(element,
                                          new GeneratorContext(new Document(""),
                                                               "",
                                                               ApplicationType.ANGULAR1,
                                                               FrameworkType.PROTRACTOR,
                                                               Language.ES5));
    }
}