import {browser, element, ElementArrayFinder, ElementFinder, protractor} from 'protractor';
import { logger } from '../../utils/log4jsconfig'
const logReport = require('mochawesome-screenshots/logReport');

export class Page {
    protected route = '';
    protected timeout = {
        SHORT: 2000,
        MEDIUM: 30000,
        LONG: 60000
    };

    protected sels: {
        /*
         selectorName: selector
         */
    };

    constructor (sels:any, route:string){
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

    public async pojo (...args: any[]): Promise<any> {
        const members = args;
        return function (...args: any[]) {
            const obj = {}, j = members.length;
            for (let i =0; i < j; ++i) {
                obj[members[i]] = args[i];
            }
            return obj;
        };
    }

    public log(message:string, ref?): void {
        if(ref !== undefined){
            logger.log().info(message);
            logReport.log(ref, message);
        } else {
            logger.log().info(message);
        }
    }

    public async navigate (waitFor?:string, timeout?:number): Promise<void>{
        if(waitFor!==undefined) {
            await browser.get(this.route);
            await browser.wait(this.isElementPresent(waitFor), timeout, `Element ${waitFor} not found`);
        } else {
            await browser.get(this.route);
        }
    }
    
    public async title (): Promise<string> {
        return await browser.getTitle()
    }

    public async currentUrl (): Promise<string> {
        return await browser.getCurrentUrl()
    }

    public element (selName:string):ElementFinder {
        return element(this.sels[selName]);
    }

    public elements (selName:string):ElementArrayFinder {
        return element.all(this.sels[selName]);
    }

    public async getSelector (selName) {
        const elementSelector = this.sels[selName];
        if (!elementSelector) {
            throw new Error('Cannot find element "'+selName+'"');
        }
        return elementSelector;
    }

    public async waitForElementText (selName:string, text:string, timeout:number) {
        return await browser.wait(protractor.ExpectedConditions.textToBePresentInElement(this.element(selName), text), timeout, `Element ${selName} not found`);
    }

    public async waitForElementVisible (selName:string, timeout:number) {
        return await browser.wait(protractor.ExpectedConditions.visibilityOf(this.element(selName)), timeout, `Element ${selName} not found`);
    }

    public async waitForElementInVisible (selName:string, timeout:number) {
        return await browser.wait(protractor.ExpectedConditions.invisibilityOf(this.element(selName)), timeout, `Element ${selName} not found`);
    }

    public async waitForElementClickable (selName:string, timeout:number) {
        return await browser.wait(protractor.ExpectedConditions.elementToBeClickable(this.element(selName)), timeout, `Element ${selName} not found`);
    }

    public async waitForElementSelected (selName:string, timeout:number) {
        return await browser.wait(protractor.ExpectedConditions.elementToBeSelected(this.element(selName)), timeout, `Element ${selName} not found`);
    }

    public async waitForElementValue (selName:string, text:string, timeout:number) {
        return await browser.wait(protractor.ExpectedConditions.textToBePresentInElementValue(this.element(selName), text), timeout, `Element ${selName} not found`);
    }

    public async isElementPresent (selName:string) {
        return await this.element(selName).isPresent();
    }
}