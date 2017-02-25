package io.pageobject.generator;

import com.beust.jcommander.JCommander;
import com.beust.jcommander.Parameter;
import com.google.common.base.Charsets;
import com.google.common.base.Function;
import com.google.common.base.Joiner;
import com.google.common.collect.ArrayListMultimap;
import com.google.common.collect.Multimap;
import com.google.common.collect.Ordering;
import com.google.common.io.CharStreams;
import freemarker.template.Configuration;
import freemarker.template.Template;
import freemarker.template.TemplateException;
import io.pageobject.generator.element.*;
import io.pageobject.generator.locator.Locator;
import io.pageobject.generator.locator.LocatorSource;
import io.pageobject.generator.name.NameExtractor;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.script.*;
import java.io.*;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.*;

import static com.google.common.base.Strings.isNullOrEmpty;
import static com.google.common.collect.Lists.newArrayList;
import static com.google.common.collect.Maps.newHashMap;
import static com.google.common.collect.Maps.newLinkedHashMap;
import static io.pageobject.generator.Expressions.extractControllerAs;
import static io.pageobject.generator.Expressions.extractExactRepeater;
import static io.pageobject.generator.attribute.Attributes.getNormalizedAttributeValue;
import static io.pageobject.generator.attribute.Attributes.hasNormalizedAttribute;
import static java.util.stream.Collectors.toList;

public class PageObjectGenerator {

    private final Logger logger = LoggerFactory.getLogger(PageObjectGenerator.class);

    static class Arguments {

        @Parameter(names = {"-page"}, description = "Name of the page object", required = true)
        String page;

        @Parameter(names = {"-file"}, description = "HTML file", required = true)
        String file;

        @Parameter(names = {"-type"}, description = "Template type")
        String type;

    }

    protected Configuration configuration;
    protected Multimap<String, ElementProcessor> processors = ArrayListMultimap.create();
    protected NameExtractor nameExtractor = new NameExtractor();
    protected final ApplicationType applicationType;

    public PageObjectGenerator(ApplicationType applicationType) {
        this.applicationType = applicationType;
        configuration = new Configuration();
        configuration.setClassForTemplateLoading(PageObjectGenerator.class, "templates");
        configuration.setDefaultEncoding("UTF-8");

        applicationType.addApplicationTypeSpecificProcessors(processors);
        processors.put("input", new TextFieldProcessor());
        processors.put("input", new DateFieldProcessor());
        processors.put("input", new RadioButtonProcessor());
        processors.put("input", new CheckboxProcessor());
        processors.put("textarea", new TextAreaProcessor());
        processors.put("select", new SelectProcessor());
        processors.put("a", new LinkProcessor());
        processors.put("button", new ButtonProcessor());
        processors.put("input", new ButtonProcessor());
    }

    public static void main(String[] args) throws Exception {
        Arguments arguments = new Arguments();
        new JCommander(arguments, args);

        ApplicationType applicationType =
            arguments.type == null ? ApplicationType.ANGULAR1 : ApplicationType.valueOf(arguments.type);
        String result = new PageObjectGenerator(applicationType).runWithFileInput(arguments);
        System.out.println(result);
    }

    public String runWithFileInput(Arguments arguments) throws Exception {
        String input = new String(Files.readAllBytes(Paths.get(arguments.file)));
        Document document = Jsoup.parse(input, "");
        String page = arguments.page;
        return run(document, input, page);
    }

    public String runWithStringInput(String input, String page) throws Exception {
        Document document = Jsoup.parse(input, "");
        return run(document, input, page);
    }

    private String run(Document document, String source, String page) throws Exception {
        logger.info("Generating [{}] PO with page name [{}] and source [{}]", this.applicationType, page, source);

        GeneratorContext context =
            new GeneratorContext(document, source, this.applicationType, FrameworkType.PROTRACTOR, Language.ES5);
        traverse(context);

        Template template = configuration.getTemplate("page-object.js.tpl");
        Map<String, Object> model = newHashMap();
        model.put("page", page);
        model.put("body", Joiner.on("\n").join(context.getFragments().values()));

        Writer writer = new StringWriter();
        template.process(model, writer);

        String result = beautifyJavascript(writer.toString());
        logger.info("Generation result: [{}]", result);

        return result;
    }

    protected void traverse(GeneratorContext context) throws Exception {
        Element element = context.getElement();
        String name = element.nodeName();

        boolean controller = processNgController(context);
        boolean repeater = processRepeater(context);

        Collection<ElementProcessor> processorsForElement = newArrayList(processors.get(name));
        processorsForElement.addAll(processors.get("*"));

        List<ElementProcessor> matchingProcessors = getMatchingProcessors(context, element, processorsForElement);
        Optional<Locator> locator = generateLocator(context, matchingProcessors);

        if (locator.isPresent()) {
            LocatorSource locatorSource = locator.get().getSource();
            context.markLocatorAsUsed(locatorSource, locatorSource.extractLocatorValue(element, context));
            context.setLocator(locator.get());

            context.setName(nameExtractor.extractValue(element, context));

            for (ElementProcessor elementProcessor : matchingProcessors) {
                ProcessingResult result = elementProcessor.process(context);

                if (result != null && result.hasTemplateModel()) {
                    context.addFragments(invokeTemplatesForProcessor(result.getTemplates(),
                                                                     result.getTemplateModel(),
                                                                     context));
                    if (!result.isFurtherProcessingAllowed()) {
                        break;
                    }
                }
            }
        } else if (!matchingProcessors.isEmpty()) {
            logger.error("Could not generate locator for: {}", element.toString());
        }

        context.addElementToResult(!matchingProcessors.isEmpty());

        if (!repeater || locator.isPresent() || applicationType == ApplicationType.ANGULAR1) {
            for (Element child : element.children()) {
                context.setElement(child);
                traverse(context);
            }
            context.setElement(element);
        }

        if (controller) {
            context.popController();
        }

        if (repeater) {
            context.popLocatorPartGenerator();
        }
    }

    private boolean processNgController(GeneratorContext context) {
        boolean foundControllerAs = false;

        Element element = context.getElement();

        String ngController = getNormalizedAttributeValue(element, "ng-controller");
        if (!isNullOrEmpty(ngController)) {
            String controllerName = extractControllerAs(ngController);
            if (!isNullOrEmpty(controllerName)) {
                context.pushController(controllerName);
                foundControllerAs = true;
            }
        }

        return foundControllerAs;
    }

    private boolean processRepeater(GeneratorContext context) throws Exception {
        boolean foundRepeater = false;

        Element element = context.getElement();

        String repeatExpression = getNormalizedAttributeValue(element, "ng-repeat");
        if (!isNullOrEmpty(repeatExpression)) {
            foundRepeater = true;
        } else {
            repeatExpression = getNormalizedAttributeValue(element, "ng-repeat-start");
        }

        if (!isNullOrEmpty(repeatExpression)) {
            context.pushNgRepeat(element, extractExactRepeater(repeatExpression));
        }

        if (hasNormalizedAttribute(element, "ng-repeat-end")) {
            foundRepeater = true;
        }

        if (!isNullOrEmpty(element.attr("*ngFor"))) {
            context.pushNgFor(element);
            foundRepeater = true;
        }

        return foundRepeater;
    }

    private List<ElementProcessor> getMatchingProcessors(GeneratorContext context,
                                                         Element element,
                                                         Collection<ElementProcessor> processorsForElement) {
        return processorsForElement.stream()
                                   .filter(processor -> processor.isMatchingElement(element, context))
                                   .collect(toList());
    }

    private Optional<Locator> generateLocator(GeneratorContext context, List<ElementProcessor> matchingProcessors) {
        List<LocatorSource> locatorOrder = context.getLocatorOrder();
        Ordering<Locator> byPriorityOrdering = Ordering.natural().onResultOf(sortKeyForLocator(locatorOrder));

        return matchingProcessors.stream()
                                 .map(processor -> processor.generateElementLocator(context))
                                 .filter(Objects::nonNull)
                                 .min(byPriorityOrdering);
    }

    private Function<Locator, Comparable> sortKeyForLocator(List<LocatorSource> locatorOrder) {
        return locator -> {
            for (int i = 0; i < locatorOrder.size(); i++) {
                LocatorSource locatorSource = locatorOrder.get(i);
                if (locatorSource.getClass().equals(locator.getSource().getClass())) {
                    return i;
                }
            }
            return Integer.MAX_VALUE;
        };
    }

    private Map<String, String> invokeTemplatesForProcessor(List<String> templates,
                                                            Map<String, Object> templateModel,
                                                            GeneratorContext context) throws IOException,
                                                                                             TemplateException {

        Map<String, String> fragments = newLinkedHashMap();
        int controlIndex = context.getControlIndex();

        for (String template : templates) {
            String fragmentId = controlIndex + "-" + template.substring(template.indexOf("/") + 1);
            String fragment = invokeTemplate(template + ".js.tpl", templateModel, configuration);
            fragments.put(fragmentId, fragment);
        }

        return fragments;
    }

    private String invokeTemplate(String templateName,
                                  Map<String, Object> templateModel,
                                  Configuration configuration) throws IOException, TemplateException {

        Template template = configuration.getTemplate(templateName);

        StringWriter writer = new StringWriter();
        template.process(templateModel, writer);

        return writer.toString();
    }

    private String beautifyJavascript(String code) {
        String beautifyJs = readScript("META-INF/resources/webjars/js-beautify/1.6.2/js/lib/beautify.js");

        ScriptEngine nashorn = new ScriptEngineManager().getEngineByName("nashorn");
        try {
            CompiledScript compiledScript = ((Compilable) nashorn).compile(
                beautifyJs + "\nwindow.js_beautify(jsCode, {indent_size:2,space_after_anon_function:true});");
            Bindings bindings = nashorn.getBindings(ScriptContext.ENGINE_SCOPE);
            bindings.put("jsCode", code);
            bindings.put("window", bindings);
            return compiledScript.eval(bindings).toString();
        } catch (ScriptException e) {
            throw new RuntimeException("Unable to compile script", e);
        }
    }

    private static String readScript(String path) {
        try (InputStream input = ClassLoader.getSystemResourceAsStream(path)) {
            return CharStreams.toString(new InputStreamReader(input, Charsets.UTF_8));
        } catch (IOException e) {
            throw new RuntimeException("Unable to read " + path, e);
        }
    }

}
