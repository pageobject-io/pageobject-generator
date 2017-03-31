pageObject.config = {
    // the CLI will parse all the files with the given file extension
    extensionsToScan: ['ts', 'html'],
    // Possible options: js | ts
    targetLanguage: 'js',
    // Possible values: protractor. Later: selenium, nightwatch, etc.
    targetExecutor: 'protractor',
    // Possible values: angularJS (angular 1), angular (angular2++), ...
    framework: 'angular',
    methodsToGenerate: {
        // Field accessor. This is mandatory for all other fields
        'field': true,

        // Method that clicks on an UI element
        'click': true,

        // Method that clicks based on index. The index is provided as input parameter.
        'click-by-index': true,

        // Method that clicks based on value. The value is provided as input parameter.
        'click-by-value': true,

        // Helper function for testing the existence of a css class
        'assertion-has-class': true,

        // Helper function for testing the text of the selected element
        'assertion-text': true,

        // Helper function for testing whether the element is selected or not, based on it's index
        'assertion-enabled-by-index': true,

        // Helper function for testing whether the element is enabled or not.
        'assertion-enabled': true,

        // Helper function for testing whether the element is visible or not, based on it's index
        'assertion-visibility-by-index': true,

        // Helper function for testing whether the element is visible or not.
        'assertion-visibility': true,

        'assertion-selected-by-value': true,
        'assertion-selected-by-index': true,

        // Helper function for testing whether an element is selected or not
        'assertion-selected': true,

        // Helper method for testing the value of a text input field
        'text-assertion-value': true,

        // Getter and setter methods (generated for text input fields only)
        'text-mutator': true,

        // Getter and setter methods (generated for date input fields only)
        'date-mutator': true,

        // Helper function for testing the quantity of something
        'assertion-count': true,

        // Should be selected by text part
        'assertion-selected-by-partial-text': true,

        // Helper function for testing whether something is selected or not
        'assertion-selected-by-text': true,

        // select by value
        'select-by-value': true,

        // Select by text
        'select-by-text': true,

        // 'Select by text part'
        'select-by-partial-text': true
    }
};
