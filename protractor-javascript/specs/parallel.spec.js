const { data }= require('./../../data/testData');
const { ownersAddPage } = require('./../pages/ownersAddPage');
const { ownersPage } = require('./../pages/ownersPage');
const { vetsPage } = require('./../pages/vetsPage');
const { vetsAddPage } = require('./../pages/vetsAddPage');
const { browser } = require('protractor');
const runtime = require('allure-mocha/runtime');

const expect = global['chai'].expect;

//create a suite
describe('Pet Clinic tests parallel', function(){
    //create a test
    
    afterEach(async function() {
        if (this.currentTest.state === 'failed') {
            browser.takeScreenshot().then(function(png) { 
                runtime.allure.createAttachment('Screenshot', Buffer.from(png, 'base64'), 'image/png');   
           });
        }
    });

    it('Confirm pet details for Peter McTavish', async function () {
        await ownersPage.navigate();
        await ownersPage.selectOwner(data.owner);
        let pet = await ownersPage.getPetDetails();

        expect(pet.name, 'Pet name mismatch').to.be.equal(data.pet.name);
        expect(pet.dob, 'Pet DOB mismatch').to.be.equal(data.pet.dob);
        expect(pet.type, 'Pet type mismatch').to.be.equal(data.pet.type);
    })
    
    it('Confirm number of radiology vets', async function () {
        let radiologyCount = 0;
        await vetsPage.navigate();
        radiologyCount = await vetsPage.getSpecialitiesCount(data.vets);

        await vetsAddPage.navigate();
        await vetsAddPage.addVet(data.vets);
        expect(await vetsPage.getSpecialitiesCount(data.vets), 'radiology count mismatch').to.be.equal(radiologyCount+1);
    })
    
    it('Delete vets test', async function () {
        let vetsCount = 0;
        await vetsPage.navigate();
        vetsCount = await vetsPage.getVetsCount();
        await vetsPage.deleteVet(data.vets);

        expect(await vetsPage.getVetsCount(), 'Vet was not deleted').to.be.equal(vetsCount-1);
    })

    it("Add owner test", async function (){
        await ownersAddPage.navigate();
        await ownersAddPage.addOwners(data.newOwner);
        await ownersPage.navigate();
        let owner = await ownersPage.getOwnerDetails(data.newOwner);

        expect(owner.name, 'Ower name').to.be.equal(`${data.newOwner.firstName} ${data.newOwner.lastName}`);
        expect(owner.address, 'Owner address').to.be.equal(data.newOwner.address);
        expect(owner.city, 'Owner city').to.be.equal(data.newOwner.city);
        expect(owner.telephone, 'Owner telephone').to.be.equal(data.newOwner.telephone);        
    });
});