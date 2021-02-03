const data = require('./../../data/testData.js');
const ownersAddPage = require('./../pages/ownersAddPage.js');
const ownersPage = require('./../pages/ownersPage.js');
const vetsPage = require('./../pages/vetsPage.js')
const vetsAddPage = require('./../pages/vetsAddPage.js')
const expect = global['chai'].expect;



//create a suite
describe('Pet Clinic tests ', function(){
    //create a test
  
    it('Confirm pet details for Peter McTavish', async function () {
        await ownersPage.log(this,'Navigate to Add owners page');
        await ownersPage.navigate();
        await ownersPage.log(this,'Select owner');
        await ownersPage.steps.selectOwner(data.owner);
        await ownersPage.log(this,'Verify pet details');
        let pet = await ownersPage.steps.getPetDetails();
        expect(pet.name, 'Pet name mismatch').to.be.equal(data.pet.name);
        expect(pet.dob, 'Pet DOB mismatch').to.be.equal(data.pet.dob);
        expect(pet.type, 'Pet type mismatch').to.be.equal(data.pet.type);
    })
    
    it('Confirm number of radiology vets', async function () {
        let radiologyCount = 0;
        await vetsPage.log(this, 'Navigate to vets page');
        await vetsPage.navigate();
        await vetsPage.log(this, 'Get specialities count')
        radiologyCount = await vetsPage.steps.getSpecialitiesCount(data.vets);
        await vetsAddPage.log(this, 'Navigate to vets add page');
        await vetsAddPage.navigate();
        await vetsAddPage.log(this, 'Add new vet');
        await vetsAddPage.steps.addVet(data.vets);
        await vetsAddPage.log(this, 'Verify radiology count');
        expect(await vetsPage.steps.getSpecialitiesCount(data.vets), 'radiology count mismatch').to.be.equal(radiologyCount+1);
    })
    
    it('Delete vets test', async function () {
        let vetsCount = 0;
        await vetsPage.log(this, 'Navigate to vets page');
        await vetsPage.navigate();
        await vetsPage.log(this, 'Get vets count');
        vetsCount = await vetsPage.steps.getVetsCount();
        await vetsPage.log(this, 'Delete a vet');
        await vetsPage.steps.deleteVet(data.vets);
        await vetsPage.log(this, 'Verify vet was deleted');
        expect(await vetsPage.steps.getVetsCount(), 'Vet was not deleted').to.be.equal(vetsCount-1);
        
    })

    it("Add owner test", async function (){
        await ownersPage.log(this,'Navigate to Add owners page');
        await ownersAddPage.navigate();
        await ownersPage.log(this,'Add new owner');
        await ownersAddPage.steps.addOwners(data.newOwner);
        await ownersPage.navigate();
        await ownersPage.log(this,'Check owner exists');
        let owner = await ownersPage.steps.getOwnerDetails(data.newOwner);
        expect(owner.name, 'Ower name').to.be.equal(`${data.newOwner.firstName} ${data.newOwner.lastName}`);
        expect(owner.address, 'Owner address').to.be.equal(data.newOwner.address);
        expect(owner.city, 'Owner city').to.be.equal(data.newOwner.city);
        expect(owner.telephone, 'Owner telephone').to.be.equal(data.newOwner.telephone);
        
    });

});