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

    public async navigate(context: unknown): Promise<void>{
        this.log('Navigate to vets add page', context)
        return super.navigate();
    }

    public async addVet (vet, context?: unknown) {
        await this.log(`Add a vet`, context, async () => {

            await this.waitForElementVisible('firstNameTbx', this.timeout.SHORT);
            
            this.log(`with name '${vet.firstName}, ${vet.lastName}'`, context)
            await this.getElement('firstNameTbx').sendKeys(vet.firstName);
            await this.getElement('lastNameTbx').sendKeys(vet.lastName);
            
            this.log(`and speciality '${vet.speciality}'`, context)
            await this.getElement('specialitiesDropDown').sendKeys(vet.speciality);

            await this.getElement('saveVetButton').click();
            return await this.waitForElementInVisible('saveVetButton',this.timeout.SHORT);
        });
    }
}

export const vetsAddPage = new VetsAddPage();