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
  config.multiCapabilities = [
    {
      'browserName': 'chrome',
      'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
      'build': process.env.TRAVIS_BUILD_NUMBER,
      'version': 'latest',
      "videoUploadOnPass": false,
      "recordScreenshots": false
    },
    {
      'browserName': 'chrome',
      'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
      'build': process.env.TRAVIS_BUILD_NUMBER,
      'version': 'latest-1',
      "videoUploadOnPass": false,
      "recordScreenshots": false
    }
  ];
}


exports.config = config;