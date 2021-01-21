import {Config} from 'protractor';
const reporter = require("cucumber-html-reporter");

export const config: Config = {

    allScriptsTimeout: 120000,

    seleniumAddress: 'http://localhost:4444/wd/hub',
    baseUrl: 'http://localhost',
    capabilities: {
        browserName: 'chrome'
    },

    framework: 'custom',
    frameworkPath: require.resolve("protractor-cucumber-framework"),
    specs: [
        './protractor-typescript-cucumber/features/**/*.feature'
    ],
    logLevel: 'INFO',


    cucumberOpts: {
        "compiler": 'ts:ts-node/register',
        "dry-run": false,
        "fail-fast": false,
        "format": ["json:./reports/cucumber_report.json"],
        "require": ["./protractor-typescript-cucumber/stepdefinitions/**/*.ts"],
        "tags": "",

    },
    onComplete: () => {
        const cucumberReporterOptions = {
            theme: 'bootstrap',
            jsonFile: './reports/cucumber_report.json',
            output: process.cwd() + './reports/cucumber_reporter.html',
            reportSuiteAsScenarios: true
        };
        reporter.generate(cucumberReporterOptions);
    }
};
/*
====================================================================
For full list of Protractor config options,
see- https://github.com/angular/protractor/blob/master/lib/config.ts
====================================================================
**/