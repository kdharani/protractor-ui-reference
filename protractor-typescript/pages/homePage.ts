import { Page } from "./page";

const route = 'welcome';
const selector = {

}
class HomePage extends Page {

    constructor () {
        super(selector, route);
    }
}

export const homePage = new HomePage();