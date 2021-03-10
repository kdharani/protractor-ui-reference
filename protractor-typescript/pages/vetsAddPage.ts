import FedexBasePage from "./FedexBasePage";

const route = 'vets/add';
const selectors = {
    firstNameTbx : {id: 'firstName'},
    lastNameTbx : {id: 'lastName'},
    specialitiesDropDown : {id: 'specialties'},
    saveVetButton : {css: '.col-sm-offset-2.col-sm-10 button:nth-child(3)'}
};

class VetsAddPage extends FedexBasePage {

    constructor (){
        super (selectors, route);
    }

    public async navigate(): Promise<void>{
        return this.log(`Navigate to vets add page`, async () => {
            return super.navigate();
        });
    }

    async addVet (vet) {
        return this.log(`Add vet '${vet.firstName} ${vet.lastName}'`, async () => {
            await this.waitForElementVisible('firstNameTbx', this.timeout.SHORT);

            this.log(`with name '${vet.firstName}, ${vet.lastName}'`)
            await this.getElement('firstNameTbx').sendKeys(vet.firstName);
            await this.getElement('lastNameTbx').sendKeys(vet.lastName);
            
            this.log(`and speciality '${vet.speciality}'`)
            await this.getElement('specialitiesDropDown').sendKeys(vet.speciality);

            await this.getElement('saveVetButton').click();
            return await this.waitForElementInVisible('saveVetButton',this.timeout.SHORT);
        });
    }
}

export const vetsAddPage = new VetsAddPage();