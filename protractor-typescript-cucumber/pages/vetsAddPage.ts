import { Page } from "./page";

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

    public async addVet (vets) {
        await this.waitForElementVisible('firstNameTbx', this.timeout);
        await this.element('firstNameTbx').sendKeys(vets.firstName);
        await this.element('lastNameTbx').sendKeys(vets.lastName);
        await this.element('specialitiesDropDown').sendKeys(vets.speciality);
        await this.element('saveVetButton').click();
        await this.waitForElementInVisible('saveVetButton',2000);
    }
}

export const vetsAddPage = new VetsAddPage();