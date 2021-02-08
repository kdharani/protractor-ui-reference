import { Page } from "./fedex.page";

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

}

export const header = new Header();

