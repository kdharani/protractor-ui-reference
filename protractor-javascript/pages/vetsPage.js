const { Page } = require('./fedex.page');
const route = 'vets';
const runtime = require('allure-mocha/runtime');

const selectors = {
    vetsTable: {css: '.table.table-striped'},
    specialitiesList: {css: '.table.table-striped tr td div'},
    vetsNameList: {css: '.table.table-striped tr td:nth-child(1)'},
    deleteButtons: {css: '.table.table-striped tr td:nth-child(3) button:nth-child(2)'}
};

class VetsPage  extends Page {

    constructor () {
        super (selectors, route);
    }

    async navigate() {
        return runtime.allure.step(`Navigate to vets page`, async () => {
            this.log(`Navigate to vets page`);
            return super.navigate();
        });
    }

    async getSpecialitiesCount (vet) {
        return runtime.allure.step(`Get specialties count for '${vet.firstName} ${vet.lastName}'`, async () => {
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
    
    async getVetsCount () {
        return runtime.allure.step(`Get vets count`, async () => {
            await this.waitForElementVisible('vetsTable', this.timeout.SHORT);
            let vetsList = await this.elements('vetsNameList');

            const vetCount = vetsList.length;
            this.log(`Got vet count of '${vetCount}'`);
            return vetCount;
        });
    }
    
    async deleteVet (vet) {
        return runtime.allure.step(`Delete vet ${vet.firstName} ${vet.lastName}`, async () => {
            await this.waitForElementVisible('vetsTable', this.timeout.SHORT);
            let vetsList = await this.elements('vetsNameList');
            let delBtns = await this.elements('deleteButtons');
            for(let i = 0; i < vetsList.length; i++){
                if((await vetsList[i].getText()).trim() === `${vet.firstName} ${vet.lastName}`) {
                    await delBtns[i].click();
                    return true;
                }
            }
        });
    }

}


module.exports = {
    vetsPage: new VetsPage()
};