package io.pageobject.generator;

import com.google.common.collect.ImmutableList;
import com.google.common.collect.ImmutableMap;

import java.util.List;
import java.util.Map;

public class ProcessingResult {

    private final boolean furtherProcessingAllowed;
    private final Map<String, Object> templateModel;
    private final List<String> templates;

    public ProcessingResult(Map<String, Object> templateModel,
                            boolean furtherProcessingAllowed,
                            List<String> templates) {
        this.templateModel = ImmutableMap.copyOf(templateModel);
        this.furtherProcessingAllowed = furtherProcessingAllowed;
        this.templates = ImmutableList.copyOf(templates);
    }

    public boolean isFurtherProcessingAllowed() {
        return furtherProcessingAllowed;
    }

    public Map<String, Object> getTemplateModel() {
        return templateModel;
    }

    public boolean hasTemplateModel() {
        return !templateModel.isEmpty();
    }

    public List<String> getTemplates() {
        return templates;
    }
}
