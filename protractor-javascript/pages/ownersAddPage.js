const { browser } = require('protractor');
// const page = require('protractor-base-page').Page();
const page = require('./page.js').Page();

const route = 'owners/add';

const selectors = {
    fnameTbx : {id: 'firstName'},
    lnameTbx : {id: 'lastName'},
    addressTbx : {id: 'address'},
    cityTbx : {id: 'city'},
    telephoneTbx : {id: 'telephone'},
    addOwnerBtn : {css: 'div.form-group button:nth-child(2)'},
    backBtn : {css: 'div.form-group button:nth-child(1)'}

};

page.construct(selectors,route);

page.steps.addOwners = async function (owner){
    await page.waitForElementVisible('fnameTbx', 2000);
    //browser.wait(page.element('fnameTbx').isPresent());
    await page.element('fnameTbx').sendKeys(owner.firstName);
    await page.element('lnameTbx').sendKeys(owner.lastName)
    await page.element('addressTbx').sendKeys(owner.address)
    await page.element('cityTbx').sendKeys(owner.city)
    await page.element('telephoneTbx').sendKeys(owner.telephone)
    await page.element('addOwnerBtn').click()
}

//export the page you created
module.exports = page;