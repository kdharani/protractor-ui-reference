const { element } = require('protractor');
const page = require('./page.js').Page();

const route = 'owners';

const selectors = {
    ownersTable : {css: '.table.table-striped'},
    ownerNameList : {css: '.table-responsive td a'},
    petName : {css: '.table.table-striped .dl-horizontal dd:nth-child(2)'},
    petDob : {css: '.table.table-striped .dl-horizontal dd:nth-child(4)'},
    petType : {css: '.table.table-striped .dl-horizontal dd:nth-child(6)'}
};

page.construct(selectors,route);

page.steps.getOwnerDetails = async function (owner) {
    let name = "";
    let address = "";
    let city = "";
    let telephone = "";
    let ownerDetail;

    await page.waitForElementVisible('ownersTable', page.timeout.SHORT);
    let nameList  = await page.elements('ownerNameList');
    
    for (let index = 0; index < nameList.length; index += 1) {
        name = await nameList[index].getText();
        
        if(name === `${owner.firstName} ${owner.lastName}`){
            address = await element(by.css(`.table-responsive tr:nth-child(${index+1}) td:nth-child(2)`)).getText();
            city = await element(by.css(`.table-responsive tr:nth-child(${index+1}) td:nth-child(3)`)).getText();
            telephone = await element(by.css(`.table-responsive tr:nth-child(${index+1}) td:nth-child(4)`)).getText();
            ownerDetail = await page.pojo('name', 'address', 'city', 'telephone'); // create the POJO
            break;
        }
    }
    return ownerDetail(name, address, city, telephone);
}

page.steps.selectOwner = async (owner) => {

    await page.waitForElementVisible('ownersTable', page.timeout.SHORT);

    let nameList  = await page.elements('ownerNameList');
    for (let index = 0; index < nameList.length; index += 1) {
        let name = await nameList[index].getText();
        if(name === `${owner.name}`){
            await nameList[index].click();
            break;
        }
    }
}

page.steps.getPetName = async () => {
    await page.waitForElementVisible('petName', page.timeout.SHORT);
    return await page.element('petName').getText();
}

page.steps.getPetDob = async () => {
    await page.waitForElementVisible('petDob', page.timeout.SHORT);
    return await page.element('petDob').getText();
}

page.steps.getPetType = async () => {
    await page.waitForElementVisible('petType', page.timeout.SHORT);
    return await page.element('petType').getText();
}

page.steps.getPetDetails = async () => {
    let name = await page.steps.getPetName();
    let dob = await page.steps.getPetDob();
    let type = await page.steps.getPetType();
    let pet = await page.pojo('name', 'dob', 'type'); // create the POJO
    return pet(name, dob, type); // create an 'instance' of the POJO

}

//export the page you created
module.exports = page