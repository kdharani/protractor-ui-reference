const { browser } = require('protractor');

//require the base page module, clone a new object to build on top of
// const page = require('protractor-base-page').Page();
const page = require('./page.js').Page();

//set the page route (or use an empty string if desired)
let route = '';

//name your elements and describe how to find them
const selectors =  {
    homeLink: {css: 'ul.navbar-nav li:nth-child(1)'},
    ownersLink: {css: 'ul.navbar-nav li:nth-child(2)'},
    vetsLink: {css: 'ul.navbar-nav li:nth-child(3)'},
    petsTypesLink: {css: 'ul.navbar-nav li:nth-child(4)'},
    specialitiesLink: {css: 'ul.navbar-nav li:nth-child(5)'},
    onlineShopLink: {css: 'ul.navbar-nav li:nth-child(6)'},
    allLink : {css: 'li.dropdown.open li:nth-child(1)'},
    addLink: {css: 'li.dropdown.open li:nth-child(2)'}
};

//add your elements, route to the new page
page.construct(selectors, route);

//add a step. this one used a data argument so you can adapt it to multiple testing scenarios
page.steps.navigateToHome = async function(data){
    await browser.wait(page.element('homeLink').isPresent(), 'Home link not present');
    await page.element('homeLink').click();
};

page.steps.navigateToAllOwners = async function(){
    await browser.wait(page.element('ownersLink').isPresent());
    await page.element('ownersLink').click();
    await page.element('allLink').click();
}

page.steps.navigateToAddOwners = async function(){
    await browser.wait(page.element('ownersLink').isPresent());
    await page.element('ownersLink').click();
    await page.element('addLink').click();
}

page.steps.navigateToAllVets = async function(){
    await browser.wait(page.element('vetsLink').isPresent());
    await page.element('vetsLink').click();
    await page.element('allLink').click();
}

page.steps.navigateToAddVets = async function(){
    await browser.wait(page.element('vetsLink').isPresent());
    await page.element('vetsLink').click();
    await page.element('addLink').click();
}

page.steps.navigateToPetTypes = async function(){
    await browser.wait(page.element('petsTypesLink').isPresent());
    await page.element('petsTypesLink').click();
}

page.steps.navigateToSpecialities = async function(){
    await browser.wait(page.element('specialitiesLink').isPresent());
    await page.element('specialitiesLink').click();
}

//export the page you created
module.exports = page;