import { Page } from "./fedex.page";
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

    public async navigate(context:any): Promise<void>{
        this.logStep(`Navigate to vets page`, context);
        return super.navigate();
    }

    public async getSpecialitiesCount (vet, context:any): Promise<number> {
        let count = 0;

        this.logStep('Get specialties count', context)

        await this.waitForElementVisible('vetsTable', this.timeout.SHORT);
        const specialities = await this.elements('specialitiesList');
        for(let i = 0; i < specialities.length; i++){
            if(await specialities[i].getText() === vet.speciality){
                count++;
            }
    
        }

        this.logStep(`Got specialties count of '${count}'`, context);
        return count;
    }

    public async getVetsCount (context:any): Promise<number> {
        await this.waitForElementVisible('vetsTable', this.timeout.SHORT);
        const vetsList = await this.elements('vetsList');

        const vetCount = vetsList.length;
        this.logStep(`Got vet count of '${vetCount}'`, context);
        return vetCount;
    }

    public async deleteVet (vet, context:any): Promise<void>  {

        this.logStep(`Delete a vet '${vet.firstName} ${vet.lastName}`, context);
        
        await this.waitForElementVisible('vetsTable', this.timeout.SHORT);
        const vetsList = await this.elements('vetsList');
        const delBtns = await this.elements('deleteButtons');
        
        for(let i = 0; i < vetsList.length; i++){
            if((await vetsList[i].getText()).trim() === `${vet.firstName} ${vet.lastName}`) {
                await delBtns[i].click();
            }
        }
    } 
}

export const vetsPage = new VetsPage();