import FedexBasePage from './FedexBasePage.js';
import Owner from "../model/owner"
import Pet from "../model/pet"

const route = 'owners';

const selectors = {
    ownersTable : {css: '.table.table-striped'},
    ownerNameList : {css: '.table-responsive td a'},
    petName : {css: '.table.table-striped .dl-horizontal dd:nth-child(2)'},
    petDob : {css: '.table.table-striped .dl-horizontal dd:nth-child(4)'},
    petType : {css: '.table.table-striped .dl-horizontal dd:nth-child(6)'}
};

class OwnersPage extends FedexBasePage {

    constructor () {
        super (selectors, route);
    }

    async navigate() {
        return await this.log(`Navigate to owner page`, async () => {
            
            return super.navigate();
        });
    }

    async getOwnerDetails(owner) {
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
    
    async selectOwner (owner)  {
        this.log(`Select owner ${owner.name}'`, async () => {

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
    
    async getPetName () {
        return this.log(`Get pet name`, async () => {
            await this.waitForElementVisible('petName', this.timeout.SHORT);
            
            const name = await this.getElement('petName').getText();
            this.log(`Got pet name '${name}'`);
            return name;
        });
    }
    
    async getPetDob () {
        return this.log(`Get pet D.O.B`, async () => {
            await this.waitForElementVisible('petDob', this.timeout.SHORT);

            const dob = await this.getElement('petDob').getText();
            this.log(`Got pet DOB '${dob}'`);
            return dob;
        });
    }
    
    async getPetType () {
        return this.log(`Get pet type`, async () => {
            await this.waitForElementVisible('petType', this.timeout.SHORT);

            const type = await this.getElement('petType').getText();
            this.log(`Got pet type '${type}'`);
            return type;
        })
    }
    
    async getPetDetails () {
        return this.log(`Get pet details`,  async () => {
            
            const name = await this.getPetName();
            const dob = await this.getPetDob();
            const type = await this.getPetType();

            return new Pet(name, dob, type);
        });
    }
}


let ownersPage; export default ownersPage = new OwnersPage()