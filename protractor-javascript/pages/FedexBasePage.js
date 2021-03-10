import { browser } from 'protractor';
import logger from '../../utils/log4jsconfig.js';
import { allure } from 'allure-mocha/runtime';

export default class FedexBasePage {
    constructor (sels, route) {
        this.route = "";

        this.timeout = {
            SHORT: 2000,
            MEDIUM: 30000,
            LONG: 60000
        };

        this.sels = {
             /*
              selectorName: selector
              */
         };

        if (typeof sels === 'object') {
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

    async log(message, body) {
        logger.log().info(message);
        
        if (body != undefined) 
        { 
            return allure.step(message, body); // top level step
        } else {
            return allure.logStep(message) // A sub step
        }
    }

    async navigate (waitFor, timeout) {
        if(waitFor!==undefined) {
            await browser.get(this.route);
            await browser.wait(this.isElementPresent(waitFor), timeout, `Navigate to page ${this.route} failed`);
        } else {
            return await browser.get(this.route);
        }
    }
    
    async title () {
        return await browser.getTitle()
    }

    async currentUrl () {
        return await browser.getCurrentUrl()
    }

    getElement (selName) {
        return element(this.sels[selName]);
    }

    getElements (selName) {
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
        return await browser.wait(protractor.ExpectedConditions.textToBePresentInElement(this.getElement(selName), text), timeout, `Element ${selName} not found`);
    }

    async waitForElementVisible (selName, timeout) {
        return await browser.wait(protractor.ExpectedConditions.visibilityOf(this.getElement(selName)), timeout, `Element ${selName} not found`);
    }

    async waitForElementInVisible (selName, timeout) {
        return await browser.wait(protractor.ExpectedConditions.invisibilityOf(this.getElement(selName)), timeout, `Element ${selName} not found`);
    }

    async waitForElementClickable (selName, timeout) {
        return await browser.wait(protractor.ExpectedConditions.elementToBeClickable(this.getElement(selName)), timeout, `Element ${selName} not found`);
    }

    async waitForElementSelected (selName, timeout) {
        return await browser.wait(protractor.ExpectedConditions.elementToBeSelected(this.getElement(selName)), timeout, `Element ${selName} not found`);
    }

    async waitForElementValue (selName, text, timeout) {
        return await browser.wait(protractor.ExpectedConditions.textToBePresentInElementValue(this.getElement(selName), text), timeout, `Element ${selName} not found`);
    }

    async isElementPresent (selName) {
        return await this.getElement(selName).isPresent();
    }

    async getTableColumnElement(selName, row, column) {
        
        const table = this.getElement(selName)

        if(typeof table === 'object') {
            let value = -1;

            // Get the text from the specified column from the table we know about 
            return await table.getWebElement()
                .findElements(by.xpath(`.//th[contains(text(),'${column}')][1]/preceding-sibling::th`))
                .then( async (elems) => {
                    let cellElement = null;

                    if(typeof elems === 'object') {
                        value  = elems.length + 1;
            
                        cellElement = table.element(by.xpath(`.//tr[${row}]/td[${value}]`));
                    } else {
                        throw new Error(`Unable to find column '${column}' for table selector '${selName}'`)
                    }
                    
                return cellElement;
            });
        } else {
            throw new Error(`Unable to find table selector '${selName}'`)
        }
    }
    
    async getTableColumnText(selName, row, column) {
        
        return this.getTableColumnElement(selName, row, column).then( (ele) => 
        {
            return ele.getText();
        });
    }
}