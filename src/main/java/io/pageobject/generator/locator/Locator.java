package io.pageobject.generator.locator;

import com.google.common.base.Joiner;
import com.google.common.collect.Ordering;

import java.util.ArrayList;
import java.util.List;

import static com.google.common.base.Strings.isNullOrEmpty;
import static com.google.common.collect.Lists.newArrayList;
import static java.util.stream.Collectors.toList;

public class Locator {

    private final String locator;
    private final String locatorWhenElementIsRepeated;
    private final LocatorSources source;

    public static final Ordering<Locator> BY_PRIORITY_ORDERING =
        Ordering.natural().onResultOf(Locator::sortKeyFunction);

    private Locator(String locator, String locatorWhenElementIsRepeated, LocatorSources source) {
        this.locator = locator;
        this.locatorWhenElementIsRepeated = locatorWhenElementIsRepeated;
        this.source = source;
    }

    public static Locator fromParts(List<LocatorPart> parts) {
        return fromParts(parts, null);
    }

    public static Locator fromParts(List<LocatorPart> parts, LocatorPart lastPartForRepeater) {
        ArrayList<LocatorPart> allParts = getAllParts(parts, lastPartForRepeater);
        boolean hasInvalidParts = allParts.stream().anyMatch(LocatorPart::isInvalid);
        List<String> validParts =
            parts.stream().filter(LocatorPart::validPart).map(LocatorPart::getPart).collect(toList());

        String locator = hasInvalidParts ? null : Joiner.on(".").join(validParts);

        String locatorWhenElementIsRepeated = null;
        if (!hasInvalidParts && lastPartForRepeater.validPart()) {
            validParts.remove(validParts.size() - 1);
            validParts.add(lastPartForRepeater.getPart());
            locatorWhenElementIsRepeated = Joiner.on(".").join(validParts);
        }

        return isNullOrEmpty(locator) ? null : new Locator(locator,
                                                           locatorWhenElementIsRepeated,
                                                           parts.get(parts.size() - 1).getSource());
    }

    private static ArrayList<LocatorPart> getAllParts(List<LocatorPart> parts, LocatorPart lastPartForRepeater) {
        ArrayList<LocatorPart> allParts = newArrayList(parts);

        if (lastPartForRepeater != null) {
            allParts.add(lastPartForRepeater);
        }

        return allParts;
    }

    public boolean isValid() {
        return !isNullOrEmpty(locator);
    }

    public String getLocator() {
        return locator;
    }

    public String getLocatorWhenElementIsRepeated() {
        return locatorWhenElementIsRepeated;
    }

    public LocatorSources getSource() {
        return source;
    }

    private int sortKeyFunction() {
        return source.priority();
    }

    @Override
    public String toString() {
        return "Locator{" + "locator='" + locator + '\'' + ", locatorWhenElementIsRepeated='" +
               locatorWhenElementIsRepeated + '\'' + ", source=" + source + '}';
    }
}
