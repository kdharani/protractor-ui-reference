import { Page } from "./page";
import {browser,element, by} from 'protractor';

const route:string = 'owners';
const selector = {
    ownersTable : {css: '.table.table-striped'},
    ownerFirstNameList : {css: '.table-responsive td a'},
    petName : {css: '.table.table-striped .dl-horizontal dd:nth-child(2)'},
    petDob : {css: '.table.table-striped .dl-horizontal dd:nth-child(4)'},
    petType : {css: '.table.table-striped .dl-horizontal dd:nth-child(6)'}
}

class OwnersPage extends Page{

    constructor(){
        super(selector, route);
    }

    public async checkOwnerExists(owner): Promise<boolean> {
        let exists = false;
        await browser.wait (this.element('ownersTable').isPresent());
        // let nameList  = page.elements('ownerFirstNameList');
        let nameList  = await element.all(by.css('.table-responsive td a'));
        for (let index = 0; index < nameList.length; index += 1) {
            let name = await nameList[index].getText();
            if(name === `${owner.firstName} ${owner.lastName}`){
                exists = true;
                console.log('Owner Exists');
                break;
            }
        }
    return exists;
    }

    public async selectOwner (owner) {

        await this.waitForElementVisible('ownersTable', this.timeout);
    
        let nameList  = await element.all(by.css('.table-responsive td a'));
        for (let index = 0; index < nameList.length; index += 1) {
            let name = await nameList[index].getText();
            if(name === `${owner.name}`){
                await nameList[index].click();
                break;
            }
        }
    }
    
    public async getPetName () {
        await this.waitForElementVisible('petName', this.timeout);
        return await this.element('petName').getText();
    }
    
    public async getPetDob () {
        await this.waitForElementVisible('petDob', this.timeout);
        return await this.element('petDob').getText();
    }
    
    public async getPetType () {
        await this.waitForElementVisible('petType', this.timeout);
        return await this.element('petType').getText();
    }
    
    public async getPetDetails (): Promise<any> {
        let name = await this.getPetName();
        let dob = await this.getPetDob();
        let type = await this.getPetType();
        let pet = await this.pojo('name', 'dob', 'type'); // create the POJO
        return pet(name, dob, type); // create an 'instance' of the POJO
    
    }
}

export const ownersPage = new OwnersPage();