package io.pageobject.generator.element;

import org.jsoup.nodes.Element;

import static com.google.common.base.Strings.isNullOrEmpty;
import static io.pageobject.generator.attribute.Attributes.getNormalizedAttributeValue;

public abstract class NgTableProcessor extends AbstractElementProcessor {

    protected int getIndex(Element element, String indexAttributeName) {
        int sortableIndex = 0;
        Element sibling = element;
        while ((sibling = sibling.previousElementSibling()) != null) {
            if (!isNullOrEmpty(getNormalizedAttributeValue(sibling, indexAttributeName))) {
                sortableIndex++;
            }
        }
        return sortableIndex;
    }
}
