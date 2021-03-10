import FedexBasePage from './FedexBasePage';

const route = 'vets';

const selectors = {
    vetsTable: {css: '.table.table-striped'},
    specialitiesList: {css: '.table.table-striped tr td div'},
    vetsNameList: {css: '.table.table-striped tr td:nth-child(1)'},
    deleteButtons: {css: '.table.table-striped tr td:nth-child(3) button:nth-child(2)'}
};

class VetsPage extends FedexBasePage {

    constructor () {
        super (selectors, route);
    }

    async navigate() {
        return this.log(`Navigate to vets page`, async () => {
            return super.navigate();
        });
    }

    async getSpecialitiesCount (vet) {
        return await this.log(`Get specialties count for '${vet.firstName} ${vet.lastName}'`, async () => {
            let count = 0;
            await this.waitForElementVisible('vetsTable', this.timeout.SHORT);
            const specialities = await this.getElements('specialitiesList');
            for(let i = 0; i < specialities.length; i++){

                // Perform case insensitive comparisson
                if(vet.speciality.localeCompare(await specialities[i].getText(), 
                    undefined, { sensitivity: 'base' }) === 0){
                    count++;
                }
            }



            this.log(`Get specialties count of '${count}'`);
            return count;
        });
    }
    
    async getVetsCount () {
        return await this.log(`Get vets count`, async () => {
            await this.waitForElementVisible('vetsTable', this.timeout.SHORT);
            let vetsList = await this.getElements('vetsNameList');

            const vetCount = vetsList.length;
            this.log(`Got vet count of '${vetCount}'`);
            return vetCount;
        });
    }
    
    async deleteVet (vet) {
        return await this.log(`Delete vet ${vet.firstName} ${vet.lastName}`, async () => {
            await this.waitForElementVisible('vetsTable', this.timeout.SHORT);
            let vetsList = await this.getElements('vetsNameList');
            let delBtns = await this.getElements('deleteButtons');
            for(let i = 0; i < vetsList.length; i++){
                if((await vetsList[i].getText()).trim() === `${vet.firstName} ${vet.lastName}`) {
                    await delBtns[i].click();
                    return true;
                }
            }
        });
    }
}


let vetsPage; export default vetsPage = new VetsPage()