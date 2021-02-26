import { Page } from "./fedex.page";
import {element, by} from 'protractor';

const route = 'owners';
const selector = {
    ownersTable : {css: '.table.table-striped'},
    ownerNameList : {css: '.table-responsive td a'},
    petName : {css: '.table.table-striped .dl-horizontal dd:nth-child(2)'},
    petDob : {css: '.table.table-striped .dl-horizontal dd:nth-child(4)'},
    petType : {css: '.table.table-striped .dl-horizontal dd:nth-child(6)'}
}

class OwnersPage extends Page {

    constructor() {
        super(selector, route);
    }

    public async navigate(context?:any): Promise<void>{
        this.logStep('Navigate to owners page', context)
        return super.navigate();
    }

    public async getOwnerDetails(owner, context?:any): Promise<any> {
        let name = "";
        let address = "";
        let city = "";
        let telephone = "";
        let ownerDetail;

        this.logStep('Get owner details', context)
    
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

        this.logStep(`Got owner details: '${name}, ${address}, ${city}, ${telephone}'`, context)
        return ownerDetail(name, address, city, telephone);
    }

    public async selectOwner (owner, context:any) {
        const message = `Select owner ${owner.name}'`;
        this.logStep(message, context);

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
    
    public async getPetName (context?:any): Promise<string> {
        await this.waitForElementVisible('petName', this.timeout.SHORT);
        const name = await this.element('petName').getText();
        this.logStep(`Got pet name '${name}'`, context);
        return name;
    }
    
    public async getPetDob (context?:any): Promise<string> {
        await this.waitForElementVisible('petDob', this.timeout.SHORT);

        const dob = await this.element('petDob').getText();
        this.logStep(`Got pet DOB '${dob}'`, context);
        return dob;
    }
    
    public async getPetType (context?:any): Promise<string> {
        await this.waitForElementVisible('petType', this.timeout.SHORT);

        const type = await this.element('petType').getText();
        this.logStep(`Got pet type '${type}'`, context);
        return type;
    }
    
    public async getPetDetails (context:any): Promise<any> {
        this.logStep(`Get pet details`, context);
        
        const name = await this.getPetName();
        const dob = await this.getPetDob();
        const type = await this.getPetType();
        const pet = await this.pojo('name', 'dob', 'type'); // create the POJO
        
        return pet(name, dob, type); // create an 'instance' of the POJO
    }
}

export const ownersPage = new OwnersPage();