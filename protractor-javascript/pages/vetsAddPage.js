const page = require('./page.js').Page();

const route = 'vets/add';

const selectors = {
    firstNameTbx : {id: 'firstName'},
    lastNameTbx : {id: 'lastName'},
    specialitiesDropDown : {id: 'specialties'},
    saveVetButton : {css: '.col-sm-offset-2.col-sm-10 button:nth-child(3)'}

};

page.construct(selectors,route);

page.steps.addVet = async (vets) => {
    await page.waitForElementVisible('firstNameTbx', 2000);
    await page.element('firstNameTbx').sendKeys(vets.firstName);
    await page.element('lastNameTbx').sendKeys(vets.lastName);
    await page.element('specialitiesDropDown').sendKeys(vets.speciality);
    await page.element('saveVetButton').click();
    await page.waitForElementInVisible('saveVetButton',2000);
}

module.exports = page;