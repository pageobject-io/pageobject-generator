package io.pageobject.generator;

import com.google.common.collect.ImmutableList;
import io.pageobject.generator.locator.LocatorSource;
import io.pageobject.generator.locator.protractor.*;

import java.util.ArrayList;
import java.util.List;

import static com.google.common.collect.Lists.newArrayList;

public enum FrameworkType {

    PROTRACTOR {
        @Override
        public List<LocatorSource> locatorSources(ApplicationType applicationType) {
            ArrayList<LocatorSource> sources = newArrayList();

            if (applicationType.equals(ApplicationType.ANGULAR1)) {
                sources.add(new NgRepeatLocatorSource());
                sources.add(new NgOptionsLocatorSource());
            }

            sources.add(new IdLocatorSource());
            sources.add(new NameLocatorSource());

            if (applicationType.equals(ApplicationType.ANGULAR1)) {
                sources.add(new NgModelLocatorSource());
                sources.add(new NgBindHtmlLocatorSource());
                sources.add(new NgBindHtmlLocatorSource());
                sources.add(new NgBindTemplateLocatorSource());
                sources.add(new ExpressionTextLocatorSource());
            }

            sources.add(new ButtonTextLocatorSource());
            sources.add(new LinkTextLocatorSource());
            sources.add(new CssLocatorSource());

            return ImmutableList.copyOf(sources);
        }
    };

    public abstract List<LocatorSource> locatorSources(ApplicationType applicationType);

}
