package io.pageobject.generator.name;

import org.jsoup.nodes.Element;

import java.util.Arrays;

import static com.google.common.base.Strings.isNullOrEmpty;

public abstract class PostfixNamePostProcessor implements NamePostProcessor {

    private final String postFix;
    private final String[] postFixExceptions;

    public PostfixNamePostProcessor(String postFix, String[] postFixExceptions) {
        this.postFix = postFix;
        this.postFixExceptions = postFixExceptions;
    }

    @Override
    public String process(String name, Element element) {
        if (!isNullOrEmpty(name) && !nameEndsWithAnyOfTheExceptionPrefixes(name)) {
            name += postFix;
        }

        return name;
    }

    private boolean nameEndsWithAnyOfTheExceptionPrefixes(String name) {
        return Arrays.stream(postFixExceptions).anyMatch(name::endsWith);
    }

}
