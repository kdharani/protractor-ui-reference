import { Page } from "./page";
import {element, by} from 'protractor';

const route = 'owners';
const selector = {
    ownersTable : {css: '.table.table-striped'},
    ownerNameList : {css: '.table-responsive td a'},
    petName : {css: '.table.table-striped .dl-horizontal dd:nth-child(2)'},
    petDob : {css: '.table.table-striped .dl-horizontal dd:nth-child(4)'},
    petType : {css: '.table.table-striped .dl-horizontal dd:nth-child(6)'}
}

class OwnersPage extends Page{

    constructor(){
        super(selector, route);
    }

    public async getOwnerDetails(owner): Promise<any> {
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
        return ownerDetail(name, address, city, telephone);
    }

    public async selectOwner (owner) {

        await this.waitForElementVisible('ownersTable', this.timeout.SHORT);
    
        const nameList  = await this.elements('ownerNameList');
        for (let index = 0; index < nameList.length; index += 1) {
            const name = await nameList[index].getText();
            if(name === `${owner.name}`){
                await nameList[index].click();
                break;
            }
        }
    }
    
    public async getPetName () {
        await this.waitForElementVisible('petName', this.timeout.SHORT);
        return await this.element('petName').getText();
    }
    
    public async getPetDob () {
        await this.waitForElementVisible('petDob', this.timeout.SHORT);
        return await this.element('petDob').getText();
    }
    
    public async getPetType () {
        await this.waitForElementVisible('petType', this.timeout.SHORT);
        return await this.element('petType').getText();
    }
    
    public async getPetDetails (): Promise<any> {
        const name = await this.getPetName();
        const dob = await this.getPetDob();
        const type = await this.getPetType();
        const pet = await this.pojo('name', 'dob', 'type'); // create the POJO
        return pet(name, dob, type); // create an 'instance' of the POJO
    
    }
}

export const ownersPage = new OwnersPage();