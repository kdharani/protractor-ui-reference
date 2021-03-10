import Page from './FedexBasePage';

const route = 'owners/add';

const selectors = {
    fnameTbx : {id: 'firstName'},
    lnameTbx : {id: 'lastName'},
    addressTbx : {id: 'address'},
    cityTbx : {id: 'city'},
    telephoneTbx : {id: 'telephone'},
    addOwnerBtn : {css: 'div.form-group button:nth-child(2)'},
    backBtn : {css: 'div.form-group button:nth-child(1)'}
};

class OwnersAddPage extends Page {

    constructor () {
        super (selectors, route);
    }

    async navigate() {
        return await this.log(`Navigate to owner add page`, async () => {
            return super.navigate();
        });
    }

    async addOwner (owner) {
        return await this.log(`Add owner`, async () => {
            this.log(`with name '${owner.firstName}, ${owner.lastName}'`)
            await this.waitForElementVisible('fnameTbx', this.timeout.SHORT);
            await this.getElement('fnameTbx').sendKeys(owner.firstName);
            await this.getElement('lnameTbx').sendKeys(owner.lastName)
            
            this.log(`address '${owner.address}, ${owner.city}'`)
            await this.getElement('addressTbx').sendKeys(owner.address)
            await this.getElement('cityTbx').sendKeys(owner.city)
            
            this.log(`and telephone number '${owner.telephone}'`)
            await this.getElement('telephoneTbx').sendKeys(owner.telephone)
            await this.getElement('addOwnerBtn').click()
        });
    }
}


let ownersAddPage; export default ownersAddPage = new OwnersAddPage()