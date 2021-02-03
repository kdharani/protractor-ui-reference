import { Page } from "./page";
import {browser} from 'protractor';

const route = '';
const selector = {
    homeLink: {css: 'ul.navbar-nav li:nth-child(1)'},
    ownersLink: {css: 'ul.navbar-nav li:nth-child(2)'},
    vetsLink: {css: 'ul.navbar-nav li:nth-child(3)'},
    petsTypesLink: {css: 'ul.navbar-nav li:nth-child(4)'},
    specialitiesLink: {css: 'ul.navbar-nav li:nth-child(5)'},
    onlineShopLink: {css: 'ul.navbar-nav li:nth-child(6)'},
    allLink : {css: 'li.dropdown.open li:nth-child(1)'},
    addLink: {css: 'li.dropdown.open li:nth-child(2)'}
}

class Header extends Page {

    constructor () {
        super(selector, route);
    }

    public async navigateToHome (){
        await browser.wait(this.element('homeLink').isPresent());
        this.element('homeLink').click();
    };
    
    public async navigateToAllOwners () {
        await browser.wait(this.element('ownersLink').isPresent());
        await this.element('ownersLink').click();
        await this.element('allLink').click();
    }
    
    public async navigateToAddOwners () {
        await browser.wait(this.element('ownersLink').isPresent());
        await this.element('ownersLink').click();
        await this.element('addLink').click();
    }
    
    public async navigateToAllVets () {
        await browser.wait(this.element('vetsLink').isPresent());
        await this.element('vetsLink').click();
        await this.element('allLink').click();
    }
    
    public async navigateToAddVets () {
        await browser.wait(this.element('vetsLink').isPresent());
        await this.element('vetsLink').click();
        await this.element('addLink').click();
    }
    
    public async navigateToPetTypes () {
        await browser.wait(this.element('petsTypesLink').isPresent());
        await this.element('petsTypesLink').click();
    }
    
    public async navigateToSpecialities () {
        await browser.wait(this.element('specialitiesLink').isPresent());
        await this.element('specialitiesLink').click();
    }
}

export const header = new Header();

