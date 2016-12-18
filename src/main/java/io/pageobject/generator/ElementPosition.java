package io.pageobject.generator;

public class ElementPosition {

    private final int start;
    private final int end;

    public ElementPosition(int start, int end) {
        this.start = start;
        this.end = end;
    }

    public int getStart() {
        return start;
    }

    public int getEnd() {
        return end;
    }

    @Override
    public String toString() {
        return "ElementPosition{" + "start=" + start + ", end=" + end + '}';
    }
}
