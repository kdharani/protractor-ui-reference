const { Page } = require('./fedex.page');

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

class Header extends Page {

    constructor () {
        super(selectors, route);
    }
}

//export the page you created
module.exports = {
    header: new Header()
};