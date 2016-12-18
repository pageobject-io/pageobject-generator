package io.pageobject.generator.locator;

import io.pageobject.generator.GeneratorContext;

import java.util.ArrayList;
import java.util.Stack;

import static io.pageobject.generator.locator.Locator.fromParts;

public class ElementLocatorGenerator {

    public Locator generate(GeneratorContext context) {
        ArrayList<LocatorPart> parts = new ArrayList<>();

        Stack<LocatorPartGenerator> locatorPartGenerators = context.getLocatorPartGenerators();

        if (locatorPartGenerators.size() <= 1) {
            parts.add(locatorPartGenerators.firstElement().onlyPart(context));
        } else {
            parts.add(locatorPartGenerators.firstElement().firstPart(context));

            for (int i = 1; i < locatorPartGenerators.size() - 1; i++) {
                parts.add(locatorPartGenerators.get(i).middlePart(context, i));
            }

            parts.add(locatorPartGenerators.lastElement().lastPart(context, locatorPartGenerators.size() - 1));
        }

        LocatorPart lastPartForRepeater =
            locatorPartGenerators.lastElement().lastPartForRepeaterElement(context, locatorPartGenerators.size() - 1);

        return fromParts(parts, lastPartForRepeater);
    }
}
