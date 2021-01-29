const data = require('./../../data/testData.js');
const ownersAddPage = require('./../pages/ownersAddPage.js');
const ownersPage = require('./../pages/ownersPage.js');
const vetsPage = require('./../pages/vetsPage.js')
const vetsAddPage = require('./../pages/vetsAddPage.js')
const expect = require('../../utils/chai-assert.js').expect;
const { vets } = require('./../../data/testData.js');



//create a suite
describe('Pet Clinic tests ', function(){
    //create a test
    this.timeout(10000000);
    
    it('Confirm pet details for Peter McTavish', async function () {
        await ownersPage.log(ref = this,'Navigate to Add owners page');
        await ownersPage.get();
        await ownersPage.log(ref = this,'Select owner');
        await ownersPage.steps.selectOwner(data.owner);
        await ownersPage.log(ref = this,'Verify pet details');
        let pet = await ownersPage.steps.getPetDetails();
        expect(pet.name, 'Pet name mismatch').to.be.equal(data.pet.name);
        expect(pet.dob, 'Pet DOB mismatch').to.be.equal(data.pet.dob);
        expect(pet.type, 'Pet type mismatch').to.be.equal(data.pet.type);
    })
    
    it('Confirm number of radiology vets', async function () {
        let radiologyCount = 0;
        await vetsPage.log(ref=this, 'Navigate to vets page');
        await vetsPage.get();
        await vetsPage.log(ref = this, 'Get specialities count')
        radiologyCount = await vetsPage.steps.getSpecialitiesCount(data.vets);
        await vetsAddPage.log(ref = this, 'Navigate to vets add page');
        await vetsAddPage.get();
        await vetsAddPage.log(ref = this, 'Add new vet');
        await vetsAddPage.steps.addVet(data.vets);
        await vetsAddPage.log(ref = this, 'Verify radiology cont');
        expect(await vetsPage.steps.getSpecialitiesCount(data.vets), 'radiology count mismatch').to.be.equal(radiologyCount+1);
    })
    
    it('Delete vets test', async function () {
        let vetsCount = 0;
        await vetsPage.log(ref=this, 'Navigate to vets page');
        await vetsPage.get();
        await vetsPage.log(ref=this, 'Get vets count');
        vetsCount = await vetsPage.steps.getVetsCount();
        await vetsPage.log(ref=this, 'Delete a vet');
        await vetsPage.steps.deleteVet(data.vets);
        await vetsPage.log(ref=this, 'Verify vet was deleted');
        expect(await vetsPage.steps.getVetsCount(), 'Vet was not deleted').to.be.equal(vetsCount-1);
        
    })
    it("Add owner test", async function (){
        // logger.log().info('Navigate to Add owners page');
        // logReport.log(this, 'Navigate to Add owners page');
        await ownersPage.log(ref = this,'Navigate to Add owners page');
        await ownersAddPage.get();
        await ownersPage.log(ref = this,'Add new owner');
        await ownersAddPage.steps.addOwners(data.newOwner);
        await ownersPage.get();
        await ownersPage.log(ref = this,'Check owner exists');
        expect(await ownersPage.steps.checkOwnerExists(data.newOwner), 'Owner not added').equal(true);
    });
});