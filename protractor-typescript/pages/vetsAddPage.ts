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

    public async addVet (vet) {
        await this.waitForElementVisible('firstNameTbx', this.timeout.SHORT);
        await this.element('firstNameTbx').sendKeys(vet.firstName);
        await this.element('lastNameTbx').sendKeys(vet.lastName);
        await this.element('specialitiesDropDown').sendKeys(vet.speciality);
        await this.element('saveVetButton').click();
        await this.waitForElementInVisible('saveVetButton',2000);
    }
}

export const vetsAddPage = new VetsAddPage();