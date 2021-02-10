export const options = {
    theme: 'bootstrap', //options->['bootstrap', 'hierarchy', 'foundation', 'simple']
    jsonFile: './reports/cucumber_report.json',
    output: './reports/cucumber_report.html',
    reportSuiteAsScenarios: true,
    launchReport: true,
    metadata: {
        "App Version": "1.0.1",
        "Test Environment": "QA",
        "Browser": "Chrome 87 (Official Build) (64-bit)",
        "Platform": "windows 10",
        "Parallel": "Scenarios",
        "Executed": "Local Machine"
    }
};