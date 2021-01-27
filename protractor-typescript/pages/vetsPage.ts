import { Page } from "./page";
import {element, by} from 'protractor';

//const page = require('./page.js').Page();

const route = 'vets';
const selectors = {
    vetsTable: {css: '.table.table-striped'},
    specialitiesList: {css: '.table.table-striped tr td div'},
    vetsNameList: {css: '.table.table-striped tr td:nth-child(1)'},
    deleteButtons: {css: '.table.table-striped tr td:nth-child(3) button:nth-child(2)'}
};

class VetsPage extends Page {

    constructor () {
        super (selectors, route);
    }

    public async getSpecialitiesCount (vets): Promise<number> {
        let count = 0;
        await this.waitForElementVisible('vetsTable', this.timeout);
        let specialities = await element.all(by.css('.table.table-striped tr td div'));
        for(let i = 0; i < specialities.length; i++){
            if(await specialities[i].getText() === vets.speciality){
                count++;
            }
    
        }
        return count;
    }

    public async getVetsCount (): Promise<number> {
        await this.waitForElementVisible('vetsTable', this.timeout);
        let vetsList = await element.all(by.css('.table.table-striped tr td:nth-child(1)'));
        return vetsList.length;
    }

    public async deleteVet (vets) {
        await this.waitForElementVisible('vetsTable', this.timeout);
        let vetsList = await element.all(by.css('.table.table-striped tr td:nth-child(1)'));
        let delBtns = await element.all(by.css('.table.table-striped tr td:nth-child(3) button:nth-child(2)'));
        for(let i = 0; i < vetsList.length; i++){
            if((await vetsList[i].getText()).trim() === `${vets.firstName} ${vets.lastName}`) {
                await delBtns[i].click();
            }
        }
    } 
}

export const vetsPage = new VetsPage();