const { element } = require('protractor');
const { Page } = require('./fedex.page.js');

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

    async getOwnerDetails (owner) {
        let name = "";
        let address = "";
        let city = "";
        let telephone = "";
        let ownerDetail;
    
        await this.waitForElementVisible('ownersTable', this.timeout.SHORT);
        let nameList  = await this.elements('ownerNameList');
        
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
        return ownerDetail(name, address, city, telephone);
    }
    
    async selectOwner (owner)  {
    
        await this.waitForElementVisible('ownersTable', this.timeout.SHORT);
    
        let nameList  = await this.elements('ownerNameList');
        for (let index = 0; index < nameList.length; index += 1) {
            let name = await nameList[index].getText();
            if(name === `${owner.name}`){
                await nameList[index].click();
                break;
            }
        }
    }
    
    async getPetName ()  {
        await this.waitForElementVisible('petName', this.timeout.SHORT);
        return await this.element('petName').getText();
    }
    
    async getPetDob ()  {
        await this.waitForElementVisible('petDob', this.timeout.SHORT);
        return await this.element('petDob').getText();
    }
    
    async getPetType ()  {
        await this.waitForElementVisible('petType', this.timeout.SHORT);
        return await this.element('petType').getText();
    }
    
    async getPetDetails ()  {
        let name = await this.getPetName();
        let dob = await this.getPetDob();
        let type = await this.getPetType();
        let pet = await this.pojo('name', 'dob', 'type'); // create the POJO
        return pet(name, dob, type); // create an 'instance' of the POJO
    
    }

}

//export the page you created
module.exports = {
    ownersPage: new OwnersPage()
}