import data from '../../data/testData';
import vetsPage from '../pages/vetsPage';
import vetsAddPage from '../pages/vetsAddPage';
import { browser } from 'protractor';
import { allure } from 'allure-mocha/runtime';

const expect = global['chai'].expect;

// create a suite
describe('Pet Clinic vets tests ', function(){
    // create a test

    afterEach(async function() {
        if (this.currentTest.state === 'failed') {
            browser.takeScreenshot().then(function(png) { 
                allure.createAttachment('Screenshot', Buffer.from(png, 'base64'), 'image/png');   
           });
        }
    });
    
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

    it('Example failing test', async function () {
        let vetsCount = 0;

        await vetsPage.navigate();
        vetsCount = await vetsPage.getVetsCount();
        
        expect(await vetsPage.getVetsCount(), 'Vet was not deleted').to.be.equal(vetsCount-1);
    })

});