import {browser, by, element, ElementArrayFinder, ElementFinder, protractor} from 'protractor';
import { logger } from '../../utils/log4jsconfig'

export default class FedexBasePage  {
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

    constructor (sels: unknown, route: string){
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

    public async pojo (...args: any[]): Promise<unknown> {
        const members = args;
        return function (...args: any[]) {
            const obj = {}, j = members.length;
            for (let i =0; i < j; ++i) {
                obj[members[i]] = args[i];
            }
            return obj;
        };
    }

    public async log(message:string, context: any, body?: () => unknown): Promise<unknown> {
        logger.log().info(message);

        if(typeof context === 'object')
            context.allure.logStep(message);
        
        if (body !== undefined ) {  return body(); }
    }

    public async navigate (context?: unknown, waitFor?: string, timeout?: number): Promise<void>{
    
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

    public getElement (selName:string):ElementFinder {
        return element(this.sels[selName]);
    }

    public getElements (selName:string):ElementArrayFinder {
        return element.all(this.sels[selName]);
    }

    public async getSelector (selName: string): Promise<unknown> {
        const elementSelector = this.sels[selName];
        if (!elementSelector) {
            throw new Error('Cannot find element "'+selName+'"');
        }
        return elementSelector;
    }

    public async waitForElementText (selName:string, text:string, timeout:number): Promise<unknown>  {
        return await browser.wait(protractor.ExpectedConditions.textToBePresentInElement(this.getElement(selName), text), timeout, `Element ${selName} not found`);
    }

    public async waitForElementVisible (selName:string, timeout:number): Promise<unknown> {
        return await browser.wait(protractor.ExpectedConditions.visibilityOf(this.getElement(selName)), timeout, `Element ${selName} not found`);
    }

    public async waitForElementInVisible (selName:string, timeout:number): Promise<unknown> {
        return await browser.wait(protractor.ExpectedConditions.invisibilityOf(this.getElement(selName)), timeout, `Element ${selName} not found`);
    }

    public async waitForElementClickable (selName:string, timeout:number): Promise<unknown> {
        return await browser.wait(protractor.ExpectedConditions.elementToBeClickable(this.getElement(selName)), timeout, `Element ${selName} not found`);
    }

    public async waitForElementSelected (selName:string, timeout:number): Promise<unknown> {
        return await browser.wait(protractor.ExpectedConditions.elementToBeSelected(this.getElement(selName)), timeout, `Element ${selName} not found`);
    }

    public async waitForElementValue (selName:string, text:string, timeout:number): Promise<unknown> {
        return await browser.wait(protractor.ExpectedConditions.textToBePresentInElementValue(this.getElement(selName), text), timeout, `Element ${selName} not found`);
    }

    public async isElementPresent (selName:string): Promise<boolean> {
        return await this.getElement(selName).isPresent();
    }

    public async tableColumnText(selName:string, row: number, column: string): Promise<string> {
        
        const table = this.getElement(selName)

        if(typeof table === 'object') {
            let value = -1;

            // Get the text from the specified column from the table we know about 
            return await table.getWebElement()
                .findElements(by.xpath(`.//th[contains(text(),'${column}')][1]/preceding-sibling::th`))
                .then( async (elems) => {
                    let cellText = null;

                    if(typeof elems === 'object') {
                        value  = elems.length + 1;
            
                        cellText = await table.element(by.xpath(`.//tr[${row}]/td[${value}]`)).getText();
                    } else {
                        throw new Error(`Unable to find column '${column}' for table selector '${selName}'`)
                    }
                    
                return cellText;
            });
        } else {
            throw new Error(`Unable to find table selector '${selName}'`)
        }
    }
}