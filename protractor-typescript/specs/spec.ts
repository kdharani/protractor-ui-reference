import data from "./../../data/testData";
import {header} from './../pages/header'
import {ownersAddPage} from './../pages/ownersAddPage';
import { ownersPage} from './../pages/ownersPage';
import { vetsPage} from './../pages/vetsPage';
import { vetsAddPage } from './../pages/vetsAddPage';
//const expect = require('../../utils/chai-assert.js').expect;
const expect = global['chai'].expect;

//create a suite
describe('Pet Clinic tests ', function(){
    //create a test
    this.timeout(10000000);
    
    it('Confirm pet details for Peter McTavish', async function () {
        await ownersPage.log(this,'Navigate to owners page');
        await ownersPage.get();
        await ownersPage.log(this,'Select owner');
        await ownersPage.selectOwner(data.owner);
        await ownersPage.log(this,'Verify pet details');
        let pet = await ownersPage.getPetDetails();
        expect(pet.name, 'Pet name mismatch').to.be.equal(data.pet.name);
        expect(pet.dob, 'Pet DOB mismatch').to.be.equal(data.pet.dob);
        expect(pet.type, 'Pet type mismatch').to.be.equal(data.pet.type);
    })
    
    it('Confirm number of radiology vets', async function () {
        let radiologyCount = 0;
        await vetsPage.log(this, 'Navigate to vets page');
        await vetsPage.get();
        await vetsPage.log(this, 'Get specialities count')
        radiologyCount = await vetsPage.getSpecialitiesCount(data.vets);
        await vetsAddPage.log(this, 'Navigate to vets add page');
        await vetsAddPage.get();
        await vetsAddPage.log(this, 'Add new vet');
        await vetsAddPage.addVet(data.vets);
        await vetsAddPage.log(this, 'Verify radiology cont');
        expect(await vetsPage.getSpecialitiesCount(data.vets), 'radiology count mismatch').to.be.equal(radiologyCount+1);
    })
    
    it('Delete vets test', async function () {
        let vetsCount = 0;
        await vetsPage.log(this, 'Navigate to vets page');
        await vetsPage.get();
        await vetsPage.log(this, 'Get vets count');
        vetsCount = await vetsPage.getVetsCount();
        await vetsPage.log(this, 'Delete a vet');
        await vetsPage.deleteVet(data.vets);
        await vetsPage.log(this, 'Verify vet was deleted');
        expect(await vetsPage.getVetsCount(), 'Vet was not deleted').to.be.equal(vetsCount-1);
        
    })
    it("Add owner test", async function (){
        // logger.log().info('Navigate to Add owners page');
        // logReport.log(this, 'Navigate to Add owners page');
        await ownersPage.log(this,'Navigate to Add owners page');
        await ownersAddPage.get();
        await ownersPage.log(this,'Add new owner');
        await ownersAddPage.addOwner(data.newOwner);
        await ownersPage.get();
        await ownersPage.log(this,'Check owner exists');
        expect(await ownersPage.checkOwnerExists(data.newOwner), 'Owner not added').equal(true);
    });
});