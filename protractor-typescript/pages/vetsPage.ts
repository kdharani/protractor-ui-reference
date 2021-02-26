import { Page } from "./fedex.page";
import { allure } from "allure-mocha/runtime";

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

    public async navigate(): Promise<void>{
        return allure.step(`Navigate to vets page`, async () => {
            this.log(`Navigate to vets page`);
            return super.navigate();
        });
    }

    public async getSpecialitiesCount (vet): Promise<number> {
        return allure.step(`Get specialties count for '${vet.firstName} ${vet.lastName}'`, async () => {
            let count = 0;
            await this.waitForElementVisible('vetsTable', this.timeout.SHORT);
            const specialities = await this.elements('specialitiesList');
            for(let i = 0; i < specialities.length; i++){
                if(await specialities[i].getText() === vet.speciality){
                    count++;
                }
            }

            this.log(`Get specialties count of '${count}'`);
            return count;
        });
    }

    public async getVetsCount (): Promise<number> {
        return allure.step(`Get vets count`, async () => {
            await this.waitForElementVisible('vetsTable', this.timeout.SHORT);
            const vetsList = await this.elements('vetsList');

            const vetCount = vetsList.length;
            this.log(`Got vet count of '${vetCount}'`);
            return vetCount;
        });
    }

    public async deleteVet (vet): Promise<void>  {
        return allure.step(`Delete vet '${vet.firstName} ${vet.lastName}'`, async () => {
            await this.waitForElementVisible('vetsTable', this.timeout.SHORT);
            const vetsList = await this.elements('vetsList');
            const delBtns = await this.elements('deleteButtons');
            for(let i = 0; i < vetsList.length; i++){
                if((await vetsList[i].getText()).trim() === `${vet.firstName} ${vet.lastName}`) {
                    await delBtns[i].click();
                    return true;
                }
            }
        });
    } 
}

export const vetsPage = new VetsPage();