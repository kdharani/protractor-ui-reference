const { element } = require('protractor');
const { Page } = require('./fedex.page.js');
const runtime = require("allure-mocha/runtime");

const route = 'owners';

const selectors = {
    ownersTable : {css: '.table.table-striped'},
    ownerNameList : {css: '.table-responsive td a'},
    petName : {css: '.table.table-striped .dl-horizontal dd:nth-child(2)'},
    petDob : {css: '.table.table-striped .dl-horizontal dd:nth-child(4)'},
    petType : {css: '.table.table-striped .dl-horizontal dd:nth-child(6)'}
};

class OwnersPage extends Page {

    constructor () {
        super (selectors, route);
    }

    async navigate() {
        return await runtime.allure.step(`Navigate to owner page`, async () => {
            
            return super.navigate();
        });
    }

    async getOwnerDetails (owner) {
        return await runtime.allure.step(`Get owner details'`, async () => {
            let name = "";
            let address = "";
            let city = "";
            let telephone = "";
            let ownerDetail;
        
            await this.waitForElementVisible('ownersTable', this.timeout.SHORT);
            const nameList  = await this.elements('ownerNameList');
            
            for (let index = 0; index < nameList.length; index += 1) {
                name = await nameList[index].getText();
                
                if(name === `${owner.firstName} ${owner.lastName}`){
                    address = await element(by.css(`.table-responsive tr:nth-child(${index+1}) td:nth-child(2)`)).getText();
                    city = await element(by.css(`.table-responsive tr:nth-child(${index+1}) td:nth-child(3)`)).getText();
                    telephone = await element(by.css(`.table-responsive tr:nth-child(${index+1}) td:nth-child(4)`)).getText();
                    ownerDetail = await this.pojo('name', 'address', 'city', 'telephone'); // create the POJO
                    break;
                }
            }

            this.log(`Got owner details: '${name}, ${address}, ${city}, ${telephone}'`)
            return ownerDetail(name, address, city, telephone);
        })
    }
    
    async selectOwner (owner)  {
        const message = `Select owner ${owner.name}'`;

        runtime.allure.step(message , async () => {
            this.log(message);

            await this.waitForElementVisible('ownersTable', this.timeout.SHORT);
        
            const nameList  = await this.elements('ownerNameList');
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
        return runtime.allure.step(`Get pet name`, async () => {
            await this.waitForElementVisible('petName', this.timeout.SHORT);
            const name = await this.element('petName').getText();
            this.log(`Got pet name '${name}'`);
            return name;
        });
    }
    
    async getPetDob () {
        return runtime.allure.step(`Get pet D.O.B`, async () => {
            await this.waitForElementVisible('petDob', this.timeout.SHORT);

            const dob = await this.element('petDob').getText();
            this.log(`Got pet DOB '${dob}'`);
            return dob;
        });
    }
    
    async getPetType () {
        return runtime.allure.step(`Get pet type`, async () => {
            await this.waitForElementVisible('petType', this.timeout.SHORT);

            const type = await this.element('petType').getText();
            this.log(`Got pet type '${type}'`);
            return type;
        })
    }
    
    async getPetDetails () {
        return runtime.allure.step(`Get pet details`,  async () => {
            this.log(`Get pet details`);
            const name = await this.getPetName();
            const dob = await this.getPetDob();
            const type = await this.getPetType();
            const pet = await this.pojo('name', 'dob', 'type'); // create the POJO
            return pet(name, dob, type); // create an 'instance' of the POJO
        });
    }
}

//export the page you created
module.exports = {
    ownersPage: new OwnersPage()
}