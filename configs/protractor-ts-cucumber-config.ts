import {Config} from 'protractor';
import { options } from "../utils/cucumber.report.options";
const reporter = require("cucumber-html-reporter");
const globalAny: any = global;

export const config: Config = {
  //Before performing any action, Protractor waits until there are no pending asynchronous tasks in your Angular application.
  //This means that all timeouts and http requests are finished.
    allScriptsTimeout: 120000,

    seleniumAddress: 'http://localhost:4444/wd/hub',
    baseUrl: 'http://petclinicui.e46708b92c054086909b.eastus.aksapp.io/petclinic/',
    capabilities: {
        browserName: 'chrome',
        chromeOptions: {
            args: ['start-maximized']
        }
    },

    framework: 'custom',
    frameworkPath: require.resolve("protractor-cucumber-framework"),
    specs: [
        '../../protractor-typescript-cucumber/features/*.feature'
    ],
    logLevel: 'INFO',


    cucumberOpts: {
        "compiler": 'ts:ts-node/register',
        "dry-run": false,
        "fail-fast": false,
        "format": ["json:./reports/cucumber_report.json"],
        "require": ["../protractor-typescript-cucumber/stepdefinitions/*.js"],
        "tags": ["@functional"],

    },
    onComplete: () => {
        reporter.generate(options);
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