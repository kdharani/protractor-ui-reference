import { Page } from "./fedex.page";
import { allure } from "allure-mocha/runtime";

const route = 'owners/add';

const selector = {
    fnameTbx : {id: 'firstName'},
    lnameTbx : {id: 'lastName'},
    addressTbx : {id: 'address'},
    cityTbx : {id: 'city'},
    telephoneTbx : {id: 'telephone'},
    addOwnerBtn : {css: 'div.form-group button:nth-child(2)'},
    backBtn : {css: 'div.form-group button:nth-child(1)'}
};

class OwnersAddPage extends Page{

    constructor (){
        super (selector, route);
    }

    public async navigate(): Promise<void>{
        return await allure.step(`Navigate to owner add page`, async () => {
            this.log(`Navigate to owner add page`);
            return super.navigate();
        });
    }

    public async addOwner (owner): Promise<void> {
        return await allure.step(`Add owner`, async () => {
            await this.waitForElementVisible('fnameTbx', this.timeout.SHORT);
            await this.element('fnameTbx').sendKeys(owner.firstName);
            await this.element('lnameTbx').sendKeys(owner.lastName)
            await this.element('addressTbx').sendKeys(owner.address)
            await this.element('cityTbx').sendKeys(owner.city)
            await this.element('telephoneTbx').sendKeys(owner.telephone)
            await this.element('addOwnerBtn').click()
        });
    }
}

export const ownersAddPage = new OwnersAddPage();