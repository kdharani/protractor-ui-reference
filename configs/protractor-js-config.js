const { browser } = require('protractor');

exports.config = {

  allScriptsTimeout: 120000,

  seleniumAddress: 'http://localhost:4444/wd/hub',
  baseUrl: 'http://petclinicui.e46708b92c054086909b.eastus.aksapp.io/petclinic/',
  capabilities: {
      browserName: 'chrome',
      chromeOptions: {
        args: [
                 'start-maximized'
              ]
      }
  },
  framework: 'mocha',
  specs: [
      '../protractor-javascript/specs/spec.js'
  ],
  logLevel: 'INFO',
  mochaOpts: {
      bail: true,
      colors: true,
      compilers: 'ts:ts-node/register',
    //   reporter: 'mochawesome',
      reporter: 'mochawesome-screenshots',
    //   reporterOptions: {
    //       reportDir: './reports',
    //       reportFileName: 'protractor_mocha_report',
    //       enableCharts: true
    //   },
      reporterOptions: {
        reportDir: './reports',
        reportName: 'protractor_mocha_report',
        reportTitle: 'Reference UI Framework',
        reportPageTitle: 'Pet Clinic',
        takePassedScreenshot: true,
        clearOldScreenshots: true,
        shortScrFileNames: false,
        jsonReport: false,
        multiReport: false
    },
      timeout: 30000,
      ui: "bdd",
  }


};
/*
====================================================================
For full list of Protractor config options,
see- https://github.com/angular/protractor/blob/master/lib/config.ts
====================================================================
**/