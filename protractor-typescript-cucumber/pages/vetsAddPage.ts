import { Page } from "./fedex.page";

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

    public async navigate(context:any): Promise<void>{
        this.logStep('Navigate to vets add page', context)
        return super.navigate();
    }

    public async addVet (vet, context:any) {
        this.logStep('Add a vet', context);

        await this.waitForElementVisible('firstNameTbx', this.timeout.SHORT);
        await this.element('firstNameTbx').sendKeys(vet.firstName);
        await this.element('lastNameTbx').sendKeys(vet.lastName);
        await this.element('specialitiesDropDown').sendKeys(vet.speciality);
        await this.element('saveVetButton').click();
        
        return await this.waitForElementInVisible('saveVetButton',this.timeout.SHORT);
    }
}

export const vetsAddPage = new VetsAddPage();