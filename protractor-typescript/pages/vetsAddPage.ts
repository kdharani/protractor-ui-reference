import { Page } from "./fedex.page";
import { allure } from "allure-mocha/runtime";

const route = 'vets/add';
const selectors = {
    firstNameTbx : {id: 'firstName'},
    lastNameTbx : {id: 'lastName'},
    specialitiesDropDown : {id: 'specialties'},
    saveVetButton : {css: '.col-sm-offset-2.col-sm-10 button:nth-child(3)'}

};

class VetsAddPage extends Page {

    constructor (){
        super (selectors, route);
    }

    public async navigate(): Promise<void>{
        return allure.step(`Navigate to vets add page`, async () => {
            return super.navigate();
        });
    }

    public async addVet (vet) {
        return allure.step(`Add vet '${vet.firstName} ${vet.lastName}'`, async () => {
            await this.waitForElementVisible('firstNameTbx', this.timeout.SHORT);
            await this.element('firstNameTbx').sendKeys(vet.firstName);
            await this.element('lastNameTbx').sendKeys(vet.lastName);
            await this.element('specialitiesDropDown').sendKeys(vet.speciality);
            await this.element('saveVetButton').click();
            return await this.waitForElementInVisible('saveVetButton',this.timeout.SHORT);
        });
    }
}

export const vetsAddPage = new VetsAddPage();