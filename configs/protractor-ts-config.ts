import {Config} from 'protractor';

export const config: Config =  {

  allScriptsTimeout: 120000,

  seleniumAddress: 'http://localhost:4444/wd/hub',
  baseUrl: 'http://localhost',
  capabilities: {
      browserName: 'chrome'
  },
  framework: 'mocha',
  specs: [
      './protractor-javascript/specs/spec.js'
  ],
  logLevel: 'INFO',
  mochaOpts: {
      bail: true,
      colors: true,
      compilers: 'ts:ts-node/register',
      reporter: 'mochawesome',
      reporterOptions: {
          reportDir: './reports',
          reportFileName: 'protractor_mocha_report',
          enableCharts: true
      },
      timeout: 30000,
      ui: "bdd",
  },

};
/*
====================================================================
For full list of Protractor config options,
see- https://github.com/angular/protractor/blob/master/lib/config.ts
====================================================================
**/