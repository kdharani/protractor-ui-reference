const { Page } = require('./fedex.page');
const route = 'vets';

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

    async getSpecialitiesCount (vet) {
        let count = 0;
        await this.waitForElementVisible('vetsTable', this.timeout.SHORT);
        let specialities = await this.elements('specialitiesList');
        for(let i = 0; i < specialities.length; i++){
            if(await specialities[i].getText() === vet.speciality){
                count++;
            }
    
        }
    
        return count;
    }
    
    async getVetsCount () {
        await this.waitForElementVisible('vetsTable', this.timeout.SHORT);
        let vetsList = await this.elements('vetsNameList');
        return vetsList.length;
    }
    
    async deleteVet (vet) {
        await this.waitForElementVisible('vetsTable', this.timeout.SHORT);
        let vetsList = await this.elements('vetsNameList');
        let delBtns = await this.elements('deleteButtons');
        for(let i = 0; i < vetsList.length; i++){
            if((await vetsList[i].getText()).trim() === `${vet.firstName} ${vet.lastName}`) {
                await delBtns[i].click();
            }
        }
    }

}


module.exports = {
    vetsPage: new VetsPage()
};