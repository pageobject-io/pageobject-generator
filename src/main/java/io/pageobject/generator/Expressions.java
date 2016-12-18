package io.pageobject.generator;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Expressions {

    private static final Pattern expressionPattern = Pattern.compile("\\{\\{(.*?)\\}\\}");

    public static String getFirstExpression(String text) {
        Matcher matcher = expressionPattern.matcher(text);
        return matcher.find() ? matcher.group(1) : null;
    }

    public static boolean hasExpression(String text) {
        Matcher matcher = expressionPattern.matcher(text);
        return matcher.find();
    }

    public static int getExpressionCount(String text) {
        Matcher matcher = expressionPattern.matcher(text);
        int count = 0;
        while (matcher.find()) {
            count++;
        }
        return count;
    }

    public static String extractNameFromRepeater(String repeaterExpression) {
        String[] variableAndExpression = extractExactRepeater(repeaterExpression).split(" in ");
        return variableAndExpression.length == 1 ? "" : variableAndExpression[1].trim();
    }

    public static String extractExactRepeater(String repeaterExpression) {
        return repeaterExpression.split(" track by ")[0].split(" as ")[0].split("\\|")[0].split("=")[0].trim();
    }

    public static String extractNameFromNgFor(String ngForExpression) {
        String[] ofSplit = ngForExpression.split(";")[0].split("\\|")[0].split(" of ");
        return ofSplit.length == 1 ? "" : ofSplit[1].trim();
    }

    public static String replaceIndexBindingWithFunctionParameter(String text, int repeaterCount) {
        if (text.contains("{{$index}}")) {
            return "`" + text.replaceAll("\\{\\{\\$index\\}\\}", "\\${rowIndex" + repeaterCount + "}") + "`";
        } else {
            return text;
        }
    }

    public static String extractControllerAs(String controllerExpression) {
        String[] asSplit = controllerExpression.split(" as ");
        return asSplit.length == 1 ? "" : asSplit[1].trim();
    }

}
