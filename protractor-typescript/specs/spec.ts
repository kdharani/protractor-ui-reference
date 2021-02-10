import { data } from './../../data/testData';
import { ownersAddPage } from './../pages/ownersAddPage';
import { ownersPage } from './../pages/ownersPage';
import { vetsPage } from './../pages/vetsPage';
import { vetsAddPage } from './../pages/vetsAddPage';
const expect = global['chai'].expect;

//create a suite
describe('Pet Clinic tests ', function(){
    //create a test
    it('Confirm pet details for Peter McTavish', async function () {
        await ownersPage.log('Navigate to owners page', this);
        await ownersPage.navigate();
        await ownersPage.log('Select owner', this);
        await ownersPage.selectOwner(data.owner);
        await ownersPage.log('Verify pet details', this);
        const pet = await ownersPage.getPetDetails();
        expect(pet.name, 'Pet name mismatch').to.be.equal(data.pet.name);
        expect(pet.dob, 'Pet DOB mismatch').to.be.equal(data.pet.dob);
        expect(pet.type, 'Pet type mismatch').to.be.equal(data.pet.type);
    })
    
    it('Confirm number of radiology vets', async function () {
        let radiologyCount = 0;
        await vetsPage.log('Navigate to vets page', this);
        await vetsPage.navigate();
        await vetsPage.log('Get specialities count', this)
        radiologyCount = await vetsPage.getSpecialitiesCount(data.vets);
        await vetsAddPage.log('Navigate to vets add page', this);
        await vetsAddPage.navigate();
        await vetsAddPage.log('Add new vet', this);
        await vetsAddPage.addVet(data.vets);
        await vetsAddPage.log('Verify radiology count', this);
        expect(await vetsPage.getSpecialitiesCount(data.vets), 'radiology count mismatch').to.be.equal(radiologyCount+1);
    })
    
    it('Delete vets test', async function () {
        let vetsCount = 0;
        await vetsPage.log('Navigate to vets page', this);
        await vetsPage.navigate();
        await vetsPage.log('Get vets count', this);
        vetsCount = await vetsPage.getVetsCount();
        await vetsPage.log('Delete a vet', this);
        await vetsPage.deleteVet(data.vets);
        await vetsPage.log('Verify vet was deleted', this);
        expect(await vetsPage.getVetsCount(), 'Vet was not deleted').to.be.equal(vetsCount-1);
        
    })
    it("Add owner test", async function (){
        await ownersPage.log('Navigate to Add owners page', this);
        await ownersAddPage.navigate();
        await ownersPage.log('Add new owner', this);
        await ownersAddPage.addOwner(data.newOwner);
        await ownersPage.navigate();
        await ownersPage.log('Check owner exists', this);
        const owner = await ownersPage.getOwnerDetails(data.newOwner);
        expect(owner.name, 'Ower name').to.be.equal(`${data.newOwner.firstName} ${data.newOwner.lastName}`);
        expect(owner.address, 'Owner address').to.be.equal(data.newOwner.address);
        expect(owner.city, 'Owner city').to.be.equal(data.newOwner.city);
        expect(owner.telephone, 'Owner telephone').to.be.equal(data.newOwner.telephone);
    });
});