package io.pageobject.generator;

import org.junit.Test;

import static io.pageobject.generator.Expressions.*;
import static org.fest.assertions.api.Assertions.assertThat;

public class ExpressionsTest {

    @Test
    public void getsFirstExpression() throws Exception {
        assertThat(getFirstExpression("{{expression}}")).isEqualTo("expression");
        assertThat(getFirstExpression("With {{expression}} text")).isEqualTo("expression");
        assertThat(getFirstExpression("Multiple {{expression}} {{expression2}}")).isEqualTo("expression");
        assertThat(getFirstExpression("{{expression}}{{expression2}}")).isEqualTo("expression");
        assertThat(getFirstExpression("No expression")).isNull();
    }

    @Test
    public void detectsExpressions() throws Exception {
        assertThat(hasExpression("{{expression}}")).isTrue();
        assertThat(hasExpression("With {{expression}} text")).isTrue();
        assertThat(hasExpression("Multiple {{expression}} {{expression2}}")).isTrue();
        assertThat(hasExpression("{{expression}}{{expression2}}")).isTrue();
        assertThat(hasExpression("No expression")).isFalse();
    }

    @Test
    public void getsExpressionCounts() throws Exception {
        assertThat(getExpressionCount("{{expression}}")).isEqualTo(1);
        assertThat(getExpressionCount("With {{expression}} text")).isEqualTo(1);
        assertThat(getExpressionCount("Multiple {{expression}} {{expression2}}")).isEqualTo(2);
        assertThat(getExpressionCount("{{expression}}{{expression2}}")).isEqualTo(2);
        assertThat(getExpressionCount("No expression")).isEqualTo(0);
    }

    @Test
    public void extractsNameFromRepeater() throws Exception {
        assertThat(extractNameFromRepeater("item in items")).isEqualTo("items");
        assertThat(extractNameFromRepeater("album in artist.albums")).isEqualTo("artist.albums");
        assertThat(extractNameFromRepeater("(name, age) in {'adam':10, 'amalie':12}")).isEqualTo(
            "{'adam':10, 'amalie':12}");
        assertThat(extractNameFromRepeater("item in items track by $id(item)")).isEqualTo("items");
        assertThat(extractNameFromRepeater("item in items | filter:searchText track by item.id")).isEqualTo("items");
        assertThat(extractNameFromRepeater("item in items | filter:x as results")).isEqualTo("items");
        assertThat(extractNameFromRepeater("item in items | filter : x | orderBy : order | limitTo : limit as results"))
            .isEqualTo("items");
    }

    @Test
    public void extractsNameFromNgFor() throws Exception {
        assertThat(extractNameFromNgFor("let item of items")).isEqualTo("items");
        assertThat(extractNameFromNgFor("let album of artist.albums")).isEqualTo("artist.albums");
        assertThat(extractNameFromNgFor("let item of items; trackBy: trackByFn")).isEqualTo("items");
        assertThat(extractNameFromNgFor("let item of items | filter:searchText; trackBy: trackByFn")).isEqualTo("items");
        assertThat(extractNameFromNgFor("let item of items; let i = index; trackBy: trackByFn")).isEqualTo("items");
        assertThat(extractNameFromNgFor("let item of items; let i = index; let odd = odd")).isEqualTo("items");
        assertThat(extractNameFromNgFor("let item in items; let i = index; let odd = odd")).isEqualTo("");
    }

    @Test
    public void replacesIndexBindingWithFunctionParamater() throws Exception {
        assertThat(replaceIndexBindingWithFunctionParameter("{{$index}}", 0)).isEqualTo("`${rowIndex0}`");
        assertThat(replaceIndexBindingWithFunctionParameter("In the {{$index}} middle", 1)).isEqualTo(
            "`In the ${rowIndex1} middle`");
        assertThat(replaceIndexBindingWithFunctionParameter("{{$index}} starts with", 1)).isEqualTo(
            "`${rowIndex1} starts with`");
        assertThat(replaceIndexBindingWithFunctionParameter("ends with {{$index}}", 1)).isEqualTo(
            "`ends with ${rowIndex1}`");
        assertThat(replaceIndexBindingWithFunctionParameter("no expression", 1)).isEqualTo("no expression");
    }
}