const globalAny = global;

exports.config = {

  //Before performing any action, Protractor waits until there are no pending asynchronous tasks in your Angular application.
  //This means that all timeouts and http requests are finished.
  allScriptsTimeout: 120000,  

  seleniumAddress: 'http://localhost:4444/wd/hub',
  baseUrl: 'http://petclinicui.e46708b92c054086909b.eastus.aksapp.io/petclinic/',
  capabilities: {
      browserName: 'chrome',
      chromeOptions: {
        args: [
                 'start-maximized'
              ]
      },
      shardTestFiles: true,  // required for parallel
      maxInstances: 2, // required for parallel -2
  },
  framework: 'mocha',
  specs: [
      '../protractor-javascript/specs/*spec.js'
  ],
  logLevel: 'INFO',
  mochaOpts: {
      bail: false,
      colors: true,
      compilers: 'ts:ts-node/register',
      reporter: 'allure-mocha',
      timeout: 60000, // mocha test timeout
      ui: "bdd",
  },

  onPrepare: () => {
    const chai = require("chai").use(require("chai-as-promised"));
    globalAny.chai = chai;
},


};
/*
====================================================================
For full list of Protractor config options,
see- https://github.com/angular/protractor/blob/master/lib/config.ts
====================================================================
**/