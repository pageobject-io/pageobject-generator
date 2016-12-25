var datePage = require('../../../../target/test-classes/datePageObject.js');

describe('date fields', function () {

  beforeEach(function () {
    browser.get('http://localhost:3000/resources/date.html');
  });

  it('should generate functional date field methods', function () {
    datePage.shouldHaveDateField('');
    datePage.setDateField('05/05/2015');
    datePage.shouldHaveDateField('2015-05-05');

    datePage.setDateField('');
    datePage.shouldHaveDateField('');
    datePage.dateFieldShouldBeVisible();
    datePage.dateFieldShouldBeEnabled();

    datePage.shouldHaveTimeField('');
    datePage.setTimeField('01:05AM');
    datePage.shouldHaveTimeField('01:05');
    datePage.setTimeField('');
    datePage.shouldHaveTimeField('');
    datePage.timeFieldShouldBeVisible();
    datePage.timeFieldShouldBeEnabled();

    datePage.shouldHaveDateTimeLocalField('');
    datePage.setDateTimeLocalField('03/03/2015' + protractor.Key.TAB + '01:10AM');
    datePage.shouldHaveDateTimeLocalField('2015-03-03T01:10');
    datePage.setDateTimeLocalField('');
    datePage.shouldHaveDateTimeLocalField('');
    datePage.dateTimeLocalFieldShouldBeVisible();
    datePage.dateTimeLocalFieldShouldBeEnabled();

    datePage.shouldHaveDateTimeField('');
    datePage.setDateTimeField('2015-03-12T23:59');
    datePage.shouldHaveDateTimeField('2015-03-12T23:59');
    datePage.setDateTimeField('');
    datePage.shouldHaveDateTimeField('');
    datePage.dateTimeFieldShouldBeVisible();
    datePage.dateTimeFieldShouldBeEnabled();

    datePage.shouldHaveMonthField('');
    datePage.setMonthField('January' + protractor.Key.TAB + '2015');
    datePage.shouldHaveMonthField('2015-01');
    datePage.setMonthField('');
    datePage.shouldHaveMonthField('');
    datePage.monthFieldShouldBeVisible();
    datePage.monthFieldShouldBeEnabled();

    datePage.shouldHaveWeekField('');
    datePage.setWeekField('122015');
    datePage.shouldHaveWeekField('2015-W12');
    datePage.setWeekField('');
    datePage.shouldHaveWeekField('');
    datePage.weekFieldShouldBeVisible();
    datePage.weekFieldShouldBeEnabled();
  });
});