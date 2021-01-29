const page = require('./page.js').Page();
import {Page} from './page';

const route = '';
const selectors = {

};

export class SpecialitiesPage extends Page {
    constructor () {
        super (selectors, route);
    }
}

export const specialitiesPage = new SpecialitiesPage();