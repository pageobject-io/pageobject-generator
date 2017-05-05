'use strict';

const expect = require('chai').expect;

const Page = require('../lib/page/page');
const EmitTraverser = require('../lib/emit-traverser');
const Locator = require('../lib/locator/locator');
const _ = require('lodash');

describe('EmitTraverser', () => {

  let config = {};

  beforeEach(() => {
    config = {
      emitter: emitter, pageObject: {
        keepElementAndMethodsTogether: false,
        order: ['elements', 'navigator', 'actions', 'assertions'],
        elementsOrder: 'alphabetical',
        actionsOrder: 'alphabetical',
        assertionsOrder: 'alphabetical',
        indentStyle: 'space',
        indentSize: 3,
        endOfLine: 'lf',
        newLineCharacter: '\n',
        keepMaximumBlankLines: 1
      }
    }
  });

  it('should traverse simple flat page', () => {
    var page = simpleFlatPage();

    let traverser = new EmitTraverser(page, config);

    expect(traverser.emitPageObject()).to.equal(`header-TestPage
elementsStart
E1
E2
elementsEnd
navigator
actionsStart
E1Click
E1Drag
E2Drag
actionsEnd
assertionsStart
E1Enabled
E1Visibility
assertionsEnd
footer
`);
  });

  it('should traverse simple nested page', () => {
    var page = simpleNestedPage();

    let traverser = new EmitTraverser(page, config);

    expect(traverser.emitPageObject()).to.equal(`header-TestPage
sectionsStart
Sec1Start
Sec1End
sectionsEnd
elementsStart
E1
E2
Sec1
elementsEnd
navigator
actionsStart
E1Click
E1Drag
E2Drag
actionsEnd
assertionsStart
E1Enabled
E1Visibility
assertionsEnd
footer
`);
  });

  it('should keep element and methods together', () => {
    var page = simpleNestedPage();

    config.pageObject.keepElementAndMethodsTogether = true;
    let traverser = new EmitTraverser(page, config);

    expect(traverser.emitPageObject()).to.equal(`header-TestPage
navigator
elementsStart
E1
elementsEnd
actionsStart
E1Click
E1Drag
actionsEnd
assertionsStart
E1Enabled
E1Visibility
assertionsEnd
elementsStart
Sec1
elementsEnd
sectionsStart
Sec1Start
elementsStart
E2
elementsEnd
actionsStart
E2Drag
actionsEnd
Sec1End
sectionsEnd
footer
`);
  });

  it('should allow missing emitter methods', () => {
    var page = simpleNestedPage();

    config.emitter = {};
    let traverser = new EmitTraverser(page, config);

    expect(traverser.emitPageObject()).to.equal('');
  });

  it('should indent code', () => {
    var page = simpleNestedPage();

    let indentEmitter = _.clone(emitter);
    indentEmitter.indentOnHeader = true;
    indentEmitter.indentOnElementsStart = true;
    indentEmitter.indentOnActionsStart = true;
    indentEmitter.indentOnAssertionsStart = true;
    indentEmitter.indentOnSectionsStart = true;
    indentEmitter.indentOnSectionStart = true;
    indentEmitter.unindentOnElementsEnd = true;
    indentEmitter.unindentOnActionsEnd = true;
    indentEmitter.unindentOnAssertionsEnd = true;
    indentEmitter.unindentOnSectionsEnd = true;
    indentEmitter.unindentOnSectionEnd = true;
    indentEmitter.unindentOnFooter = true;
    config.emitter = indentEmitter;
    config.pageObject.keepElementAndMethodsTogether = true;

    let traverser = new EmitTraverser(page, config);

    expect(traverser.emitPageObject())
      .to
      .equal(`header-TestPage
   navigator
   elementsStart
      E1
   elementsEnd
   actionsStart
      E1Click
      E1Drag
   actionsEnd
   assertionsStart
      E1Enabled
      E1Visibility
   assertionsEnd
   elementsStart
      Sec1
   elementsEnd
   sectionsStart
      Sec1Start
         elementsStart
            E2
         elementsEnd
         actionsStart
            E2Drag
         actionsEnd
      Sec1End
   sectionsEnd
footer
`);
  });

  it('should indent code with tabs', () => {
    var page = simpleNestedPage();

    let indentEmitter = _.clone(emitter);
    indentEmitter.indentOnHeader = true;
    indentEmitter.indentOnElementsStart = true;
    indentEmitter.indentOnActionsStart = true;
    indentEmitter.indentOnAssertionsStart = true;
    indentEmitter.indentOnSectionsStart = true;
    indentEmitter.indentOnSectionStart = true;
    indentEmitter.unindentOnElementsEnd = true;
    indentEmitter.unindentOnActionsEnd = true;
    indentEmitter.unindentOnAssertionsEnd = true;
    indentEmitter.unindentOnSectionsEnd = true;
    indentEmitter.unindentOnSectionEnd = true;
    indentEmitter.unindentOnFooter = true;
    config.emitter = indentEmitter;
    config.pageObject.indentStyle = 'tab';
    config.pageObject.keepElementAndMethodsTogether = true;

    let traverser = new EmitTraverser(page, config);

    expect(traverser.emitPageObject())
      .to
      .equal(`header-TestPage
\tnavigator
\telementsStart
\t\tE1
\telementsEnd
\tactionsStart
\t\tE1Click
\t\tE1Drag
\tactionsEnd
\tassertionsStart
\t\tE1Enabled
\t\tE1Visibility
\tassertionsEnd
\telementsStart
\t\tSec1
\telementsEnd
\tsectionsStart
\t\tSec1Start
\t\t\telementsStart
\t\t\t\tE2
\t\t\telementsEnd
\t\t\tactionsStart
\t\t\t\tE2Drag
\t\t\tactionsEnd
\t\tSec1End
\tsectionsEnd
footer
`);
  });

  it('should support manual indentation and new lines', () => {
    var page = simpleNestedPage();

    config.emitter = {
      separator: '\n', indentOnHeader: true,

      emitHeader: function (traverser) {
        return 'multi' + traverser.newLine() + traverser.singleIndent() + 'line' + traverser.newLine() + 'header';
      },

      emitElement: function (traverser) {
        return traverser.element.name + traverser.newLine() + traverser.singleIndent() + 'on multiple' +
               traverser.newLine() + 'lines';
      },
    };

    let traverser = new EmitTraverser(page, config);

    expect(traverser.emitPageObject()).to.equal(`multi
   line
header
   E1
      on multiple
   lines
   E2
      on multiple
   lines
   Sec1
      on multiple
   lines
`);
  });

  it('should ignore empty emitter method results', () => {
    var page = simpleNestedPage();

    config.emitter = emptyEmitter;
    let traverser = new EmitTraverser(page, config);

    expect(traverser.emitPageObject()).to.equal('');
  });

  it('should skip separators when requested', () => {
    var page = simpleNestedPage();

    let skipEmitter = _.clone(emitter);
    skipEmitter.skipHeaderSeparator = true;
    skipEmitter.skipNavigatorSeparator = true;
    skipEmitter.skipElementsStartSeparator = true;
    skipEmitter.skipActionsStartSeparator = true;
    skipEmitter.skipAssertionsStartSeparator = true;
    skipEmitter.skipSectionsStartSeparator = true;
    skipEmitter.skipSectionStartSeparator = true;
    skipEmitter.skipElementSeparator = true;
    skipEmitter.skipClickActionSeparator = true;
    skipEmitter.skipDragActionSeparator = true;
    skipEmitter.skipEnabledAssertionSeparator = true;
    skipEmitter.skipVisibilityAssertionSeparator = true;
    skipEmitter.skipElementsEndSeparator = true;
    skipEmitter.skipActionsEndSeparator = true;
    skipEmitter.skipAssertionsEndSeparator = true;
    skipEmitter.skipSectionsEndSeparator = true;
    skipEmitter.skipSectionEndSeparator = true;
    skipEmitter.skipFooterSeparator = true;
    config.emitter = skipEmitter;
    config.pageObject.keepElementAndMethodsTogether = true;

    let traverser = new EmitTraverser(page, config);

    expect(traverser.emitPageObject())
      .to
      .equal(
        'header-TestPagenavigatorelementsStartE1elementsEndactionsStartE1ClickE1DragactionsEndassertionsStartE1Enabled' +
        'E1VisibilityassertionsEndelementsStartSec1elementsEndsectionsStartSec1StartelementsStartE2elementsEnd' +
        'actionsStartE2DragactionsEndSec1EndsectionsEndfooter');
  });

  it('should emit deeply nested page per section', () => {
    var page = deeplyNestedPage();

    let indentEmitter = _.clone(emitter);
    indentEmitter.indentOnHeader = true;
    indentEmitter.indentOnElementsStart = true;
    indentEmitter.indentOnActionsStart = true;
    indentEmitter.indentOnAssertionsStart = true;
    indentEmitter.indentOnSectionsStart = true;
    indentEmitter.indentOnSectionStart = true;
    indentEmitter.unindentOnElementsEnd = true;
    indentEmitter.unindentOnActionsEnd = true;
    indentEmitter.unindentOnAssertionsEnd = true;
    indentEmitter.unindentOnSectionsEnd = true;
    indentEmitter.unindentOnSectionEnd = true;
    indentEmitter.unindentOnFooter = true;
    indentEmitter.emitPerSection = true;
    config.emitter = indentEmitter;

    let traverser = new EmitTraverser(page, config);

    expect(traverser.emitPageObject())
      .to
      .equal(`header-TestPage
   elementsStart
      E1
      Sec1
      Sec2
   elementsEnd
   navigator
   actionsStart
      E1Click
      E1Drag
      Sec1Drag
   actionsEnd
   assertionsStart
      E1Enabled
      E1Visibility
      Sec1Enabled
      Sec1Visibility
   assertionsEnd
   sectionsStart
      Sec1Start
         elementsStart
            E2
         elementsEnd
         actionsStart
            E2Drag
         actionsEnd
      Sec1End
      Sec2Start
         elementsStart
            E3
            E4
            Sec3
         elementsEnd
         actionsStart
            E3Click
         actionsEnd
         assertionsStart
            E3Enabled
            E4Visibility
         assertionsEnd
         sectionsStart
            Sec3Start
               elementsStart
                  E5
                  E6
               elementsEnd
               assertionsStart
                  E5Enabled
                  E6Visibility
               assertionsEnd
            Sec3End
         sectionsEnd
      Sec3End
   sectionsEnd
footer
`);
  });

  it('should emit when no ordering is requested', () => {
    var page = simpleFlatPage();

    config.pageObject.elementsOrder = '';
    config.pageObject.actionsOrder = '';
    config.pageObject.assertionsOrder = '';
    let traverser = new EmitTraverser(page, config);

    expect(traverser.emitPageObject()).to.equal(`header-TestPage
elementsStart
E1
E2
elementsEnd
navigator
actionsStart
E1Drag
E1Click
E2Drag
actionsEnd
assertionsStart
E1Visibility
E1Enabled
assertionsEnd
footer
`);
  });

  it('should skip invalid elements', () => {
    var page = simpleFlatPage(true);

    let traverser = new EmitTraverser(page, config);

    expect(traverser.emitPageObject()).to.equal(`header-TestPage
navigator
footer
`);
  });

  it('should limit maximum blank lines', () => {
    var page = simpleFlatPage();

    let multilineEmitter = _.clone(emitter);
    multilineEmitter.separator = '\n\n\n\n';
    config.emitter = multilineEmitter;

    let traverser = new EmitTraverser(page, config);

    expect(traverser.emitPageObject()).to.equal(`header-TestPage

elementsStart

E1

E2

elementsEnd

navigator

actionsStart

E1Click

E1Drag

E2Drag

actionsEnd

assertionsStart

E1Enabled

E1Visibility

assertionsEnd

footer
`);
  });

  let emitter = {
    separator: '\n',

    emitHeader: function (traverser) {
      return 'header-' + traverser.page.name;
    },

    emitNavigator: function (traverser) {
      return 'navigator';
    },

    emitElementsStart: function () {
      return 'elementsStart';
    },

    emitElement: function (traverser) {
      return traverser.element.name;
    },

    emitElementsEnd: function () {
      return 'elementsEnd';
    },

    emitActionsStart: function () {
      return 'actionsStart';
    },

    emitClickAction: function (traverser) {
      return traverser.element.name + 'Click';
    },

    emitDragAction: function (traverser) {
      return traverser.element.name + 'Drag';
    },

    emitActionsEnd: function () {
      return 'actionsEnd';
    },

    emitAssertionsStart: function () {
      return 'assertionsStart';
    },

    emitVisibilityAssertion: function (traverser) {
      return traverser.element.name + 'Visibility';
    },

    emitEnabledAssertion: function (traverser) {
      return traverser.element.name + 'Enabled';
    },

    emitAssertionsEnd: function () {
      return 'assertionsEnd';
    },

    emitSectionsStart: function () {
      return 'sectionsStart';
    },

    emitSectionsEnd: function () {
      return 'sectionsEnd';
    },

    emitSectionStart: function (traverser) {
      return traverser.section.name + 'Start';
    },

    emitSectionEnd: function (traverser) {
      return traverser.section.name + 'End';
    },

    emitFooter: function () {
      return 'footer';
    }
  };

  let emptyEmitter = {
    separator: '\n',

    emitHeader: function () {
      return null;
    },

    emitNavigator: function () {
      return null;
    },

    emitElementsStart: function () {
      return null;
    },

    emitElement: function () {
      return null;
    },

    emitElementsEnd: function () {
      return null;
    },

    emitActionsStart: function () {
      return null;
    },

    emitClickAction: function () {
      return null;
    },

    emitDragAction: function () {
      return null;
    },

    emitActionsEnd: function () {
      return null;
    },

    emitAssertionsStart: function () {
      return null;
    },

    emitVisibilityAssertion: function () {
      return null;
    },

    emitEnabledAssertion: function () {
      return null;
    },

    emitAssertionsEnd: function () {
      return null;
    },

    emitSectionsStart: function () {
      return null;
    },

    emitSectionsEnd: function () {
      return null;
    },

    emitSectionStart: function () {
      return null;
    },

    emitSectionEnd: function () {
      return null;
    },

    emitFooter: function () {
      return null;
    }
  };

  function simpleFlatPage(incomplete = false) {
    let page = new Page();
    page.name = 'TestPage';

    let element1 = page.addElement({});
    element1.name = 'E1';
    element1.addActions('drag', 'click');
    element1.addAssertions('visibility', 'enabled');
    if (!incomplete) {
      element1.locator = new Locator();
    }

    let element2 = page.addElement({});
    element2.name = 'E2';
    element2.addActions('drag');
    if (!incomplete) {
      element2.locator = new Locator();
    }

    return page;
  }

  function simpleNestedPage() {
    let page = new Page();
    page.name = 'TestPage';

    let element1 = page.addElement({});
    element1.name = 'E1';
    element1.addActions('click', 'drag');
    element1.addAssertions('visibility', 'enabled');
    element1.locator = new Locator();

    let section = page.addSection({});
    section.name = 'Sec1';
    section.locator = new Locator();

    let element2 = section.addElement({});
    element2.name = 'E2';
    element2.addActions('drag');
    element2.locator = new Locator();

    return page;
  }

  function deeplyNestedPage() {
    let page = new Page();
    page.name = 'TestPage';

    let element1 = page.addElement({});
    element1.name = 'E1';
    element1.addActions('click', 'drag');
    element1.addAssertions('visibility', 'enabled');
    element1.locator = new Locator();

    let section1 = page.addSection({});
    section1.name = 'Sec1';
    section1.addActions('drag');
    section1.addAssertions('enabled', 'visibility');
    section1.locator = new Locator();

    let element2 = section1.addElement({});
    element2.name = 'E2';
    element2.addActions('drag');
    element2.locator = new Locator();

    let section2 = page.addSection({});
    section2.name = 'Sec2';
    section2.locator = new Locator();

    let element3 = section2.addElement({});
    element3.name = 'E3';
    element3.addActions('click');
    element3.addAssertions('enabled');
    element3.locator = new Locator();

    let element4 = section2.addElement({});
    element4.name = 'E4';
    element4.addAssertions('visibility');
    element4.locator = new Locator();

    let section3 = section2.addSection({});
    section3.name = 'Sec3';
    section3.locator = new Locator();

    let element5 = section3.addElement({});
    element5.name = 'E5';
    element5.addAssertions('enabled');
    element5.locator = new Locator();

    let element6 = section3.addElement({});
    element6.name = 'E6';
    element6.addAssertions('visibility');
    element6.locator = new Locator();

    return page;
  }
});