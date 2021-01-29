import {Page} from './page';

const route = '';
const selectors = {

};

class PetTypesPage extends Page {

    constructor () {
        super (selectors, route);
    }

}

export const petTypePage = new PetTypesPage();