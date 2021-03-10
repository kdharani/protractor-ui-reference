import FedexBasePage from "./FedexBasePage";

const route = 'vets';
const selectors = {
    vetsTable: {css: '.table.table-striped'},
    vetsList: {css: '.table.table-striped tr td:nth-child(1)'},
    specialitiesList: {css: '.table.table-striped tr td div'},
    vetsNameList: {css: '.table.table-striped tr td:nth-child(1)'},
    deleteButtons: {css: '.table.table-striped tr td:nth-child(3) button:nth-child(2)'}
};

class VetsPage extends FedexBasePage {

    constructor () {
        super (selectors, route);
    }

    public async navigate(context: unknown): Promise<void>{
        this.log(`Navigate to vets page`, context);
        return super.navigate();
    }

    public async getSpecialitiesCount (vet, context: unknown): Promise<number> {
        let count = 0;

        this.log('Get specialties count', context)

        await this.waitForElementVisible('vetsTable', this.timeout.SHORT);
        const specialities = await this.getElements('specialitiesList');
        for(let i = 0; i < specialities.length; i++){
          
            // Perform case insensitive comparisson
            if(vet.speciality.localeCompare(await specialities[i].getText(), 
                undefined, { sensitivity: 'base' }) === 0){
                count++;
            }
        }

        this.log(`Got specialties count of '${count}'`, context);
        return count;
    }

    public async getVetsCount (context: unknown): Promise<number> {
        await this.waitForElementVisible('vetsTable', this.timeout.SHORT);
        const vetsList = await this.getElements('vetsList');

        const vetCount = vetsList.length;
        this.log(`Got vet count of '${vetCount}'`, context);
        return vetCount;
    }

    public async deleteVet (vet, context: unknown): Promise<void>  {
        await this.log(`Delete a vet '${vet.firstName} ${vet.lastName}`, context, async () => {

            await this.waitForElementVisible('vetsTable', this.timeout.SHORT);
            const vetsList = await this.getElements('vetsList');
            const delBtns = await this.getElements('deleteButtons');
            
            for(let i = 0; i < vetsList.length; i++){
                if((await vetsList[i].getText()).trim() === `${vet.firstName} ${vet.lastName}`) {
                    await delBtns[i].click();
                }
            }
        });
    } 
}

export const vetsPage = new VetsPage();