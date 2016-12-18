package io.pageobject.generator;

import com.beust.jcommander.JCommander;
import org.apache.commons.lang3.StringUtils;
import org.junit.Test;

import java.io.File;
import java.nio.file.Paths;

import static org.fest.assertions.api.Assertions.assertThat;
import static org.fest.assertions.api.Assertions.contentOf;

public class PageObjectGeneratorTest {

    @Test
    public void testNgClick() throws Exception {
        runTest("ngclick", "ngClickPageObject");
    }

    @Test
    public void testButton() throws Exception {
        runTest("button", "buttonPageObject");
    }

    @Test
    public void testLink() throws Exception {
        runTest("link", "linkPageObject");
    }

    @Test
    public void testSelect() throws Exception {
        runTest("select", "selectPageObject");
    }

    @Test
    public void testRadio() throws Exception {
        runTest("radio", "radioPageObject");
    }

    @Test
    public void testDate() throws Exception {
        runTest("date", "datePageObject");
    }

    @Test
    public void testText() throws Exception {
        runTest("text", "textPageObject");
    }

    @Test
    public void testCheckbox() throws Exception {
        runTest("checkboxes", "checkboxPageObject");
    }

    @Test
    public void testTextArea() throws Exception {
        runTest("textarea", "textareaPageObject");
    }

    @Test
    public void testBinding() throws Exception {
        runTest("binding", "bindingPageObject");
    }

    @Test
    public void testRepeater() throws Exception {
        runTest("repeater", "repeaterPageObject");
    }

    @Test
    public void testCssSelectors() throws Exception {
        runTest("css", "cssPageObject");
    }

    @Test
    public void testAngular2() throws Exception {
        runTest("ng2Component", "ng2ComponentPageObject", ApplicationType.ANGULAR2);
    }

    private void runTest(final String page, final String expectedPageObject) throws Exception {
        runTest(page, expectedPageObject, ApplicationType.ANGULAR1);
    }

    private void runTest(final String page, final String expectedPageObject, ApplicationType applicationType) throws
                                                                                                              Exception {
        String path = Paths.get(this.getClass().getResource("/" + page + ".html").toURI()).toString();

        PageObjectGenerator.Arguments arguments = new PageObjectGenerator.Arguments();
        new JCommander(arguments, "-page", StringUtils.capitalize(page), "-file", path);

        String pageObject = new PageObjectGenerator(applicationType).runWithFileInput(arguments);

        File expectedFile = new File(this.getClass().getResource("/" + expectedPageObject + ".js").getPath());
        assertThat(pageObject).isEqualTo(contentOf(expectedFile));
    }

}
