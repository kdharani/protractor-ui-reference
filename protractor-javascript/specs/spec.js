const nav = require('./../pages/navigationPage.js');
const data = require('./../../data/testData.js');
const ownersAddPage = require('./../pages/ownersAddPage.js');
const ownersPage = require('./../pages/ownersPage.js');
const vetsPage = require('./../pages/vetsPage.js')
const vetsAddPage = require('./../pages/vetsAddPage.js')
const logger = require('../../utils/log4jsconfig.js');
const expect = require('../../utils/chai-assert.js').expect;
const logReport = require('mochawesome-screenshots/logReport');



//create a suite
describe('Pet Clinic tests ', function(){
    //create a test
    this.timeout(10000000);
    it("Add owner test", async function(){
        logger.log().info('Navigate to Add owners page');
        logReport.log(this, 'Navigate to Add owners page');
        await ownersAddPage.get();
        logger.log().info('Add new owner');
        logReport.log(this, 'Add new owner');
        await ownersAddPage.steps.addOwners(data.newOwner);
        await ownersPage.get();
        logger.log().info('Check owner exists');
        logReport.log(this, 'Check owner exists');
        expect(await ownersPage.steps.checkOwnerExists(data.newOwner), 'Owner not added').equal(true);
    });

    it('Confirm pet details for Peter McTavish', async () => {
        await ownersPage.get();
        await ownersPage.steps.selectOwner(data.owner);
        expect(await ownersPage.steps.getPetName(), 'Pet name mismatch').to.be.equal(data.pet.name);
        expect(await ownersPage.steps.getPetDob(), 'Pet DOB mismatch').to.be.equal(data.pet.dob);
        expect(await ownersPage.steps.getPetType(), 'Pet type mismatch').to.be.equal(data.pet.type);
    })

    it('Confirm number of radiology vets', async () => {
        let radiologyCount = 0;
        await vetsPage.get();
        radiologyCount = await vetsPage.steps.getSpecialitiesCount(data.vets);
        await vetsAddPage.get();
        await vetsAddPage.steps.addVet(data.vets);
        expect(await vetsPage.steps.getSpecialitiesCount(data.vets), 'radiology count mismatch').to.be.equal(radiologyCount+1);
    })

    it('Delete vets test', async () => {
        let vetsCount = 0;
        await vetsPage.get();
        vetsCount = await vetsPage.steps.getVetsCount();
        await vetsPage.steps.deleteVet(data.vets);
        expect(await vetsPage.steps.getVetsCount(), 'vets count mismatch').to.be.equal(vetsCount-1);

    })
});