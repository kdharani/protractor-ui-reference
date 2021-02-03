import { Page } from "./page";

const route = 'vets';
const selectors = {
    vetsTable: {css: '.table.table-striped'},
    vetsList: {css: '.table.table-striped tr td:nth-child(1)'},
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
        await this.waitForElementVisible('vetsTable', this.timeout.SHORT);
        const specialities = await this.elements('specialitiesList');
        for(let i = 0; i < specialities.length; i++){
            if(await specialities[i].getText() === vets.speciality){
                count++;
            }
    
        }
        return count;
    }

    public async getVetsCount (): Promise<number> {
        await this.waitForElementVisible('vetsTable', this.timeout.SHORT);
        const vetsList = await this.elements('vetsList');
        return vetsList.length;
    }

    public async deleteVet (vets) {
        await this.waitForElementVisible('vetsTable', this.timeout.SHORT);
        const vetsList = await this.elements('vetsList');
        const delBtns = await this.elements('deleteButtons');
        for(let i = 0; i < vetsList.length; i++){
            if((await vetsList[i].getText()).trim() === `${vets.firstName} ${vets.lastName}`) {
                await delBtns[i].click();
            }
        }
    } 
}

export const vetsPage = new VetsPage();