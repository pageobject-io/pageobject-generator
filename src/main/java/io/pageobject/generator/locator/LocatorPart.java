package io.pageobject.generator.locator;

import static com.google.common.base.Preconditions.checkArgument;
import static com.google.common.base.Preconditions.checkNotNull;
import static com.google.common.base.Strings.isNullOrEmpty;

public class LocatorPart {

    private final String part;
    private final LocatorSource source;

    private LocatorPart(String part, LocatorSource source) {
        this.part = part;
        this.source = source;
    }

    public static LocatorPart part(String part, LocatorSource source) {
        checkArgument(!isNullOrEmpty(part), "Part string cannot be empty or null");
        checkNotNull(source, "LocatorSource must be specified");
        return new LocatorPart(part, source);
    }

    public static LocatorPart prefixPart(String part) {
        checkArgument(!isNullOrEmpty(part), "Part string cannot be empty or null");
        return new LocatorPart(part, null);
    }

    public static LocatorPart emptyPart() {
        return new LocatorPart("", null);
    }

    public static LocatorPart invalidPart() {
        return new LocatorPart(null, null);
    }

    public boolean isInvalid() {
        return part == null;
    }

    public boolean validPart() {
        return !isNullOrEmpty(part);
    }

    public String getPart() {
        return part;
    }

    public LocatorSource getSource() {
        return source;
    }

    @Override
    public String toString() {
        final StringBuilder sb = new StringBuilder("LocatorPart{");
        sb.append("part='").append(part).append('\'');
        sb.append(", source=").append(source);
        sb.append('}');
        return sb.toString();
    }
}
