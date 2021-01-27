const clone = require('clone');
const logger = require('../../utils/log4jsconfig.js');
const logReport = require('mochawesome-screenshots/logReport');
const vanilla_selectors = [
    'className',
    'css',
    'id',
    'linkText',
    'js',
    'name',
    'partialLinkText',
    'tagName',
    'xpath'
];
const Page = {
    route: "",/*just path, not host /login /admin/dashboard*/

    sels: {
        /*
         selectorName: selector
         */
    },

    steps: {
        open: function(){
            this.get()
        }
    },

    construct: function(sels, route){
        if(typeof sels === 'object') {
            this.sels = sels;
        } else {
            throw new Error('first argument is expected to be a selector object')
        }
        if(typeof route === 'string'){
            this.route = route;
            return this;
        } else {
            throw new Error('second argument is expected to be a route string')
        };
    },

    pojo: async function () {
        let members = arguments;
        return function () {
            let obj = {}, i = 0, j = members.length;
            for (; i < j; ++i) {
                obj[members[i]] = arguments[i];
            }
            return obj;
        };
    },

    log: async function (ref, message) {
        logger.log().info(message);
        logReport.log(ref, message);
    },

    get: async function(waitFor, timeout){
        if(waitFor!==undefined) {
            await browser.get(this.route);
            await browser.wait(this.isElementPresent(waitFor), timeout);
        } else {
            await browser.get(this.route);
        }
    },
    
    title: async function () {
        return await browser.getTitle()
    },

    currentUrl: async function () {
        return await browser.getCurrentUrl()
    },

    element: function(selName) {
        return element(this.sels[selName]);
    },

    elements: function(selName) {
        return element.all(this.sels[selName]);
    },

    velement: function(selName) {
        var selector = this.getSelector([selName]);
        if (vanilla_selectors.indexOf(Object.keys(selector)[0]) >= 0) {
            return browser.driver.findElement(selector);
        } else {
            throw new Error(Object.keys(selector)[0]+" is not an allowable locator strategy for "+selector[Object.keys(selector)[0]]);
        }
    },

    velements: function(selName) {
        var selector = this.getSelector([selName]);
        if (vanilla_selectors.indexOf(Object.keys(selector)[0]) >= 0) {
            return browser.driver.findElements(selector);
        } else {
            throw new Error(Object.keys(selector)[0]+" is not an allowable locator strategy for "+selector[Object.keys(selector)[0]]);
        }
    },

    getSelector: function(selName) {
        var elementSelector = this.sels[selName];
        if (!elementSelector) {
            throw new Error('Cannot find element "'+selName+'"');
        }
        return elementSelector;
    },

    waitForElementText: async function (selName, text, timeout) {
        return await browser.wait(protractor.ExpectedConditions.textToBePresentInElement(this.element(selName), text), timeout);
    },

    waitForElementVisible: async function (selName, timeout) {
        return await browser.wait(protractor.ExpectedConditions.visibilityOf(this.element(selName)), timeout);
    },

    waitForElementInVisible: async function (selName, timeout) {
        return await browser.wait(protractor.ExpectedConditions.invisibilityOf(this.element(selName)), timeout);
    },

    waitForElementClickable: async function (selName, timeout) {
        return await browser.wait(protractor.ExpectedConditions.elementToBeClickable(this.element(selName)), timeout);
    },

    waitForElementSelected: async function (selName, timeout) {
        return await browser.wait(protractor.ExpectedConditions.elementToBeSelected(this.element(selName)), timeout);
    },

    waitForElementValue: async function (selName, text, timeout) {
        return await browser.wait(protractor.ExpectedConditions.textToBePresentInElementValue(this.element(selName), text), timeout);
    },

    isElementPresent: async function (selName) {
        return await this.element(selName).isPresent();
    }
};
module.exports = {
    Page: function(){
        return clone(Page);
    }
};