package io.pageobject.generator.attribute;

import org.jsoup.nodes.Element;
import org.jsoup.parser.Tag;
import org.junit.Test;

import static io.pageobject.generator.attribute.Attributes.getAngular2EventBindingAttribute;
import static io.pageobject.generator.attribute.Attributes.hasAngular2EventBindingAttribute;
import static org.fest.assertions.api.Assertions.assertThat;

public class AttributesTest {

    @Test
    public void handlesAngular1Attributes() throws Exception {
        String[] variants = {"ng-model",
                             "data-ng-model",
                             "data_ng-model",
                             "data:ng-model",
                             "x-ng-model",
                             "x_ng-model",
                             "x:ng-model",
                             "ng_model",
                             "data-ng_model",
                             "data_ng_model",
                             "data:ng_model",
                             "x-ng_model",
                             "x_ng-model",
                             "x:ng-model",
                             "ng:model",
                             "data-ng:model",
                             "data_ng:model",
                             "data:ng:model",
                             "x-ng:model",
                             "x_ng:model",
                             "x:ng:model"};

        for (String variant : variants) {
            Element element = new Element(Tag.valueOf("div"), "");
            element.attr(variant, "value");
            String name = Attributes.getNormalizedAttributeValue(element, "ng-model");
            assertThat(name).describedAs(variant).isEqualTo("value");

            String key = Attributes.getNormalizedAttributeKey(element, "ng-model");
            assertThat(key).describedAs(variant).isEqualTo(variant);
        }

    }

    @Test
    public void handlesEventBindings() throws Exception {
        Element element = new Element(Tag.valueOf("div"), "");
        element.attr("(click)", "save()");

        assertThat(hasAngular2EventBindingAttribute(element, "click")).isTrue();
        assertThat(getAngular2EventBindingAttribute(element, "click")).isEqualTo("save()");

        Element element2 = new Element(Tag.valueOf("div"), "");
        element2.attr("on-click", "save()");

        assertThat(hasAngular2EventBindingAttribute(element2, "click")).isTrue();
        assertThat(getAngular2EventBindingAttribute(element2, "click")).isEqualTo("save()");
    }
}