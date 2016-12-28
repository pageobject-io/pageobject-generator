var config = {
  baseUrl: 'http://localhost:3000',
  specs: [
    'test/*.js'
  ],

  jasmineNodeOpts: {
    defaultTimeoutInterval: 600000
  }
};

if (process.env.TRAVIS) {
  config.sauceUser = process.env.SAUCE_USERNAME;
  config.sauceKey = process.env.SAUCE_ACCESS_KEY;
  config.multiCapabilities = [
    {
      'name': 'pageobject chrome latest',
      'browserName': 'chrome',
      'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
      'build': process.env.TRAVIS_BUILD_NUMBER,
      'version': 'latest'
    },
    {
      'name': 'pageobject firefox latest',
      'browserName': 'firefox',
      'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
      'build': process.env.TRAVIS_BUILD_NUMBER,
      'version': 'latest'
    }
  ];
}


exports.config = config;