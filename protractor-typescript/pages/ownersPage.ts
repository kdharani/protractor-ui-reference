import FedexBasePage from "./FedexBasePage";
import Owner from "../model/owner";
import Pet from "../model/pet";

const route = 'owners';

const selector = {
    ownersTable : {css: '.table.table-striped'},
    ownerNameList : {css: '.table-responsive td a'},
    petName : {css: '.table.table-striped .dl-horizontal dd:nth-child(2)'},
    petDob : {css: '.table.table-striped .dl-horizontal dd:nth-child(4)'},
    petType : {css: '.table.table-striped .dl-horizontal dd:nth-child(6)'}
}

class OwnersPage extends FedexBasePage {

    constructor(){
        super(selector, route);
    }

    public async navigate(): Promise<void> {
        return await this.log(`Navigate to owner page`, async () => {
            return super.navigate();
        });
    }

    public async getOwnerDetails(owner): Promise<Owner> {
        return await this.log(`Get owner details'`, async () => {
            let name = "";
            let address = "";
            let city = "";
            let telephone = "";
        
            await this.waitForElementVisible('ownersTable', this.timeout.SHORT);
            const nameList  = await this.getElements('ownerNameList');

            for (let index = 0; index < nameList.length; index += 1) {
                name = await nameList[index].getText();
                
                if(name === `${owner.firstName} ${owner.lastName}`) {
                    address = await this.getTableColumnText('ownersTable', index+1, 'Address');

                    city = await this.getTableColumnText('ownersTable', index+1, 'City');
                    
                    telephone = await this.getTableColumnText('ownersTable', index+1, 'Telephone');
                    break;
                }
            }

            this.log(`Got owner details: '${name}, ${address}, ${city}, ${telephone}'`)
            return new Owner(name, address, city, telephone);
        })
    }

    public async selectOwner (owner) {
        const message = `Select owner ${owner.name}'`;

        this.log(message , async () => {
            this.log(message);

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
    
    public async getPetName (): Promise<string> {
        return this.log(`Get pet name`, async () => {
            await this.waitForElementVisible('petName', this.timeout.SHORT);
            const name = await this.getElement('petName').getText();
            this.log(`Got pet name '${name}'`);
            return name;
        });
    }
    
    public async getPetDob (): Promise<string> {
        return this.log(`Get pet D.O.B`, async () => {
            await this.waitForElementVisible('petDob', this.timeout.SHORT);

            const dob = await this.getElement('petDob').getText();
            this.log(`Got pet DOB '${dob}'`);
            return dob;
        });
    }
    
    public async getPetType (): Promise<string> {
        return this.log(`Get pet type`, async () => {
            await this.waitForElementVisible('petType', this.timeout.SHORT);

            const type = await this.getElement('petType').getText();
            this.log(`Got pet type '${type}'`);
            return type;
        })
    }
    
    public async getPetDetails (): Promise<Pet> {
        return this.log(`Get pet details`,  async () => {
            this.log(`Get pet details`);
            const name = await this.getPetName();
            const dob = await this.getPetDob();
            const type = await this.getPetType();
            
            return new Pet(name, dob, type);
        });
    }
}

export const ownersPage = new OwnersPage();