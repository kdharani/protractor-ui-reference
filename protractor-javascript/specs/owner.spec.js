import data from '../../data/testData';
import ownersAddPage from '../pages/ownersAddPage';
import ownersPage from '../pages/ownersPage';
import { browser } from 'protractor';
import { allure } from 'allure-mocha/runtime';
import assertion from 'soft-assert/index'

const expect = global['chai'].expect;

//create a suite
describe('Pet Clinic owner tests', function(){
    //create a test
    
    afterEach(async function() {
        if (this.currentTest.state === 'failed') {
            browser.takeScreenshot().then(function(png) { 
                allure.createAttachment('Screenshot', Buffer.from(png, 'base64'), 'image/png');   
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

    it("Add owner test", async function (){
        await ownersAddPage.navigate();
        await ownersAddPage.addOwner(data.newOwner);
        
        await ownersPage.navigate();
        let owner = await ownersPage.getOwnerDetails(data.newOwner);

        assertion.softAssert(owner.name, `${data.newOwner.firstName} ${data.newOwner.lastName}`, 'Ower name')
        assertion.softAssert(owner.address, data.newOwner.address, 'Owner address');
        assertion.softAssert(owner.city, data.newOwner.city, 'Owner city');
        assertion.softAssert(owner.telephone, data.newOwner.telephone, 'Owner telephone');        
        assertion.softAssertAll();
    });
});