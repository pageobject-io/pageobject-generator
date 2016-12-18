var ${page}Page = function () {

  this.get = function () {
    browser.get('');
  };

${body}
};

module.exports = new ${page}Page();