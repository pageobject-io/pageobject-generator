package io.pageobject.generator;

import com.google.common.collect.Multimap;
import io.pageobject.generator.element.*;

public enum ApplicationType {

    ANGULAR1 {
        @Override
        public void addApplicationTypeSpecificProcessors(Multimap<String, ElementProcessor> processors) {
            processors.put("*", new RepeaterProcessor());
            processors.put("*", new Ng1BindingProcessor());
            processors.put("*", new NgClickProcessor());
        }
    }, ANGULAR2 {
        @Override
        public void addApplicationTypeSpecificProcessors(Multimap<String, ElementProcessor> processors) {
            processors.put("*", new NgForProcessor());
            processors.put("*", new ClickProcessor());
            processors.put("*", new Ng2BindingProcessor());
        }
    };

    public abstract void addApplicationTypeSpecificProcessors(Multimap<String, ElementProcessor> processors);

}
