var config = {
  baseUrl: 'http://localhost:3000',
  specs: [
    'test/*.js'
  ],

  jasmineNodeOpts: {
    defaultTimeoutInterval: 60000
  }
};

if (process.env.TRAVIS) {
  config.sauceUser = process.env.SAUCE_USERNAME;
  config.sauceKey = process.env.SAUCE_ACCESS_KEY;
  config.capabilities = {
    'name': 'pageobject-generator node v' + process.env.TRAVIS_NODE_VERSION,
    'browserName': 'chrome',
    'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
    'build': process.env.TRAVIS_BUILD_NUMBER
  };
}


exports.config = config;