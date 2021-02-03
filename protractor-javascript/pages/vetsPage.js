const page = require('./page.js').Page();

const route = 'vets';

const selectors = {
    vetsTable: {css: '.table.table-striped'},
    specialitiesList: {css: '.table.table-striped tr td div'},
    vetsNameList: {css: '.table.table-striped tr td:nth-child(1)'},
    deleteButtons: {css: '.table.table-striped tr td:nth-child(3) button:nth-child(2)'}
};

page.construct(selectors,route);

page.steps.getSpecialitiesCount = async (vets) => {
    let count = 0;
    await page.waitForElementVisible('vetsTable', page.timeout.SHORT);
    let specialities = await element.all(by.css('.table.table-striped tr td div'));
    for(let i = 0; i < specialities.length; i++){
        if(await specialities[i].getText() === vets.speciality){
            count++;
        }

    }

    return count;
}

page.steps.getVetsCount = async () => {
    await page.waitForElementVisible('vetsTable', page.timeout.SHORT);
    let vetsList = await element.all(by.css('.table.table-striped tr td:nth-child(1)'));
    return vetsList.length;
}

page.steps.deleteVet = async (vets) => {
    await page.waitForElementVisible('vetsTable', page.timeout.SHORT);
    let vetsList = await element.all(by.css('.table.table-striped tr td:nth-child(1)'));
    let delBtns = await element.all(by.css('.table.table-striped tr td:nth-child(3) button:nth-child(2)'));
    for(let i = 0; i < vetsList.length; i++){
        if((await vetsList[i].getText()).trim() === `${vets.firstName} ${vets.lastName}`) {
            await delBtns[i].click();
        }
    }
}

module.exports = page;