var DatePage = require('../../test/fixtures/datePageObject.po');

describe('date fields', function () {

  beforeEach(function () {
    browser.get('http://localhost:3000/date.html');
  });

  it('should generate functional date field methods', function () {
    var datePage = new DatePage();

    datePage.dateField.getAttribute('type').then(function (type) {
      var dateFieldExpected = '2015-05-05';
      var timeFieldExpected = '01:05';
      var dateTimeFieldInput = '03/03/2015' + protractor.Key.TAB + '01:10AM';
      var dateTimeLocalFieldExpected = '2015-03-03T01:10';
      var monthFieldInput = 'January' + protractor.Key.TAB + '2015';
      var monthFieldExpected = '2015-01';
      var weekFieldExpected = '2015-W12';

      if (type === 'text') {
        // we are running in Firefox
        dateFieldExpected = '05/05/2015';
        timeFieldExpected = '01:05AM';
        dateTimeFieldInput = '03/03/2015 01:10AM';
        dateTimeLocalFieldExpected = '03/03/2015 01:10AM';
        monthFieldInput = 'January 2015';
        monthFieldExpected = 'January 2015';
        weekFieldExpected = '122015';
      }

      datePage.shouldHaveDateField('');
      datePage.setDateField('05/05/2015');
      datePage.shouldHaveDateField(dateFieldExpected);

      datePage.setDateField('');
      datePage.shouldHaveDateField('');
      datePage.dateFieldShouldBeVisible();
      datePage.dateFieldShouldBeEnabled();

      datePage.shouldHaveTimeField('');
      datePage.setTimeField('01:05AM');
      datePage.shouldHaveTimeField(timeFieldExpected);
      datePage.setTimeField('');
      datePage.shouldHaveTimeField('');
      datePage.timeFieldShouldBeVisible();
      datePage.timeFieldShouldBeEnabled();

      datePage.shouldHaveDateTimeLocalField('');
      datePage.setDateTimeLocalField(dateTimeFieldInput);
      datePage.shouldHaveDateTimeLocalField(dateTimeLocalFieldExpected);
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
      datePage.setMonthField(monthFieldInput);
      datePage.shouldHaveMonthField(monthFieldExpected);
      datePage.setMonthField('');
      datePage.shouldHaveMonthField('');
      datePage.monthFieldShouldBeVisible();
      datePage.monthFieldShouldBeEnabled();

      datePage.shouldHaveWeekField('');
      datePage.setWeekField('122015');
      datePage.shouldHaveWeekField(weekFieldExpected);
      datePage.setWeekField('');
      datePage.shouldHaveWeekField('');
      datePage.weekFieldShouldBeVisible();
      datePage.weekFieldShouldBeEnabled();
    });

  });
});