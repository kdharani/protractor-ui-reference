const { browser } = require('protractor');
const logger = require('../../utils/log4jsconfig.js');
const logReport = require('mochawesome-screenshots/logReport');

class Page {
    route = '';

    timeout = {
        SHORT: 2000,
        MEDIUM: 30000,
        LONG: 60000
    };

   sels = {
        /*
         selectorName: selector
         */
    };

    constructor (sels, route){
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
        }
    }

    async pojo (...args) {
        const members = args;
        return function (...args) {
            const obj = {}, j = members.length;
            for (let i =0; i < j; ++i) {
                obj[members[i]] = args[i];
            }
            return obj;
        };
    }

    log(message, ref) {
        if(ref !== undefined){
            logger.log().info(message);
            logReport.log(ref, message);
        } else {
            logger.log().info(message);
        }
    }

    async navigate (waitFor, timeout) {
        if(waitFor!==undefined) {
            await browser.get(this.route);
            await browser.wait(this.isElementPresent(waitFor), timeout, `Navigate to page ${this.route} failed`);
        } else {
            await browser.get(this.route);
        }
    }
    
    async title () {
        return await browser.getTitle()
    }

    async currentUrl () {
        return await browser.getCurrentUrl()
    }

    element (selName) {
        return element(this.sels[selName]);
    }

    elements (selName) {
        return element.all(this.sels[selName]);
    }

    async getSelector (selName) {
        const elementSelector = this.sels[selName];
        if (!elementSelector) {
            throw new Error('Cannot find element "'+selName+'"');
        }
        return elementSelector;
    }

    async waitForElementText (selName, text, timeout) {
        return await browser.wait(protractor.ExpectedConditions.textToBePresentInElement(this.element(selName), text), timeout, `Element ${selName} not found`);
    }

    async waitForElementVisible (selName, timeout) {
        return await browser.wait(protractor.ExpectedConditions.visibilityOf(this.element(selName)), timeout, `Element ${selName} not found`);
    }

    async waitForElementInVisible (selName, timeout) {
        return await browser.wait(protractor.ExpectedConditions.invisibilityOf(this.element(selName)), timeout, `Element ${selName} not found`);
    }

    async waitForElementClickable (selName, timeout) {
        return await browser.wait(protractor.ExpectedConditions.elementToBeClickable(this.element(selName)), timeout, `Element ${selName} not found`);
    }

    async waitForElementSelected (selName, timeout) {
        return await browser.wait(protractor.ExpectedConditions.elementToBeSelected(this.element(selName)), timeout, `Element ${selName} not found`);
    }

    async waitForElementValue (selName, text, timeout) {
        return await browser.wait(protractor.ExpectedConditions.textToBePresentInElementValue(this.element(selName), text), timeout, `Element ${selName} not found`);
    }

    async isElementPresent (selName) {
        return await this.element(selName).isPresent();
    }
}

module.exports = {
    Page
};