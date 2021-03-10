import FedexBasePage from "./FedexBasePage";
import Pet from "../model/pet";
import Owner from "../model/owner";

const route = 'owners';
const selector = {
    ownersTable : {css: '.table.table-striped'},
    ownerNameList : {css: '.table-responsive td a'},
    petName : {css: '.table.table-striped .dl-horizontal dd:nth-child(2)'},
    petDob : {css: '.table.table-striped .dl-horizontal dd:nth-child(4)'},
    petType : {css: '.table.table-striped .dl-horizontal dd:nth-child(6)'}
}

class OwnersPage extends FedexBasePage {

    constructor() {
        super(selector, route);
    }

    public async navigate(context?: unknown): Promise<void>{
        this.log('Navigate to owners page', context)
        return super.navigate();
    }

    public async getOwnerDetails(owner, context?: unknown): Promise<any> {
        
        return await this.log('Get owner details', context, async () => {
            let name = "";
            let address = "";
            let city = "";
            let telephone = "";
            
            await this.waitForElementVisible('ownersTable', this.timeout.SHORT);
            const nameList  = await this.getElements('ownerNameList');
            
            for (let index = 0; index < nameList.length; index += 1) {
                name = await nameList[index].getText();
                
                if(name === `${owner.firstName} ${owner.lastName}`){
                    address = await this.tableColumnText('ownersTable', index+1, 'Address')

                    city = await this.tableColumnText('ownersTable', index+1, 'City')
                    
                    telephone = await this.tableColumnText('ownersTable', index+1, 'Telephone')
                    break;
                }
            }

            this.log(`Got owner details: '${name}, ${address}, ${city}, ${telephone}'`, context)
            return new Owner(name, address, city, telephone);
        });
    }

    public async selectOwner (owner, context: unknown) {
        return await this.log(`Select owner ${owner.name}`, context, async () => {
            await this.waitForElementVisible('ownersTable', this.timeout.SHORT);
        
            const nameList  = await this.getElements('ownerNameList');
            for (let index = 0; index < nameList.length; index += 1) {
                const name = await nameList[index].getText();
                if(name === `${owner.name}`){
                    await nameList[index].click();
                    break;
                }
            }
        });
    }
    
    public async getPetName (context?: unknown): Promise<string> {
        await this.waitForElementVisible('petName', this.timeout.SHORT);
        const name = await this.getElements('petName').getText();
        this.log(`Got pet name '${name}'`, context);
        return name.toString();
    }
    
    public async getPetDob (context?: unknown): Promise<string> {
        await this.waitForElementVisible('petDob', this.timeout.SHORT);

        const dob = await this.getElement('petDob').getText();
        this.log(`Got pet DOB '${dob}'`, context);
        return dob.toString();
    }
    
    public async getPetType (context?: unknown): Promise<string> {
        await this.waitForElementVisible('petType', this.timeout.SHORT);

        const type = await this.getElement('petType').getText();
        this.log(`Got pet type '${type}'`, context);
        return type.toString();
    }
    
    public async getPetDetails (context: unknown): Promise<Pet> {
        
        const name = await this.getPetName(context);
        const dob = await this.getPetDob(context);
        const type = await this.getPetType(context);
        
        return new Pet(name, dob, type);
    }
}

export const ownersPage = new OwnersPage();