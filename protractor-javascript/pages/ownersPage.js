const { browser } = require('protractor');
// const page = require('protractor-base-page').Page();
const page = require('./page.js').Page();

const route = 'owners';

const selectors = {
    ownersTable : {css: '.table.table-striped'},
    ownerFirstNameList : {css: '.table-responsive td a'},
    petName : {css: '.table.table-striped .dl-horizontal dd:nth-child(2)'},
    petDob : {css: '.table.table-striped .dl-horizontal dd:nth-child(4)'},
    petType : {css: '.table.table-striped .dl-horizontal dd:nth-child(6)'}
};

page.construct(selectors,route);

page.steps.checkOwnerExists = async function (owner) {
    let exists = false;
    await browser.wait (page.element('ownersTable').isPresent());
    // let nameList  = page.elements('ownerFirstNameList');
    let nameList  = await element.all(by.css('.table-responsive td a'));
    for (let index = 0; index < nameList.length; index += 1) {
        let name = await nameList[index].getText();
        if(name === `${owner.firstName} ${owner.lastName}`){
            exists = true;
            console.log('Owner Exists');
            break;
        }
    }
    browser.sleep(5000);

    return exists;
}

page.steps.selectOwner = async (owner) => {

    await page.waitForElementVisible('ownersTable', 2000);

    let nameList  = await element.all(by.css('.table-responsive td a'));
    for (let index = 0; index < nameList.length; index += 1) {
        let name = await nameList[index].getText();
        if(name === `${owner.name}`){
            await nameList[index].click();
            break;
        }
    }
}

page.steps.getPetName = async () => {
    await page.waitForElementVisible('petName', 2000);
    return await page.element('petName').getText();
}

page.steps.getPetDob = async () => {
    await page.waitForElementVisible('petDob', 2000);
    return await page.element('petDob').getText();
}

page.steps.getPetType = async () => {
    await page.waitForElementVisible('petType', 2000);
    return await page.element('petType').getText();
}

//export the page you created
module.exports = page;