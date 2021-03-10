import data from '../../data/testData';
import { ownersAddPage } from '../pages/ownersAddPage';
import { ownersPage } from '../pages/ownersPage';
import { ContentType } from 'allure-js-commons';
import { allure } from "allure-mocha/runtime";
import { browser } from 'protractor';

const expect = global['chai'].expect;

//create a suite
describe('Pet Clinic owner tests', function(){
    
    afterEach(async function() {
        if (this.currentTest.state === 'failed') {
            browser.takeScreenshot().then(function(png) { 
                allure.createAttachment('Screenshot', Buffer.from(png, 'base64'), ContentType.PNG);   
            });
        }
    });

    //create a test
    it('Confirm pet details for Peter McTavish', async function () {
        await ownersPage.navigate();
        await ownersPage.selectOwner(data.owner);
        const pet = await ownersPage.getPetDetails();
        
        expect(pet.name, 'Pet name mismatch').to.be.equal(data.pet.name);
        expect(pet.dob, 'Pet DOB mismatch').to.be.equal(data.pet.dob);
        expect(pet.type, 'Pet type mismatch').to.be.equal(data.pet.type);
    })


    it("Add owner test", async function (){
        await ownersAddPage.navigate();
        await ownersAddPage.addOwner(data.newOwner);
        await ownersPage.navigate();
        const owner = await ownersPage.getOwnerDetails(data.newOwner);

        expect(owner.name, 'Ower name').to.be.equal(`${data.newOwner.firstName} ${data.newOwner.lastName}`);
        expect(owner.address, 'Owner address').to.be.equal(data.newOwner.address);
        expect(owner.city, 'Owner city').to.be.equal(data.newOwner.city);
        expect(owner.telephone, 'Owner telephone').to.be.equal(data.newOwner.telephone);
    });
});