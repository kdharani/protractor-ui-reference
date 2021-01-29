import { Page } from "./page";

const route:string = '';
const selector = {

}
class HomePage extends Page {

    constructor () {
        super(selector, route);
    }
}

export const homePage = new HomePage();