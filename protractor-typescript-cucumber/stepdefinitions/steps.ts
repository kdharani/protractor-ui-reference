import { Given, When, Then } from "cucumber";
import data from "./../../data/testData";
import {ownersAddPage} from './../../protractor-typescript/pages/ownersAddPage';
import { ownersPage} from './../../protractor-typescript/pages/ownersPage';
import { vetsPage} from './../../protractor-typescript/pages/vetsPage';
import { vetsAddPage } from './../../protractor-typescript/pages/vetsAddPage';

const expect = global['chai'].expect;

let radiologyCount = 0;
let vetsCount = 0;

Given ('User is on owners page', async () => {
    ownersPage.log('Navigate to owners page');
    await ownersPage.get();
})

When ('User selects Peter McTavish owner', async () => {
    ownersPage.log('Select owner McTavish');
    await ownersPage.selectOwner(data.owner);
})

Then ("McTavish's pets and visits info should be displayed", async () => {
    ownersPage.log('Verify pet details');
    let pet = await ownersPage.getPetDetails();
    expect(pet.name, 'Pet name mismatch').to.be.equal(data.pet.name);
    expect(pet.dob, 'Pet DOB mismatch').to.be.equal(data.pet.dob);
    expect(pet.type, 'Pet type mismatch').to.be.equal(data.pet.type);
})

Given ('User prepared to add a Radiology veterinarian', async () => {
    vetsPage.log('Navigate to vets page');
    await vetsPage.get();
    vetsPage.log( 'Get specialities count')
    radiologyCount = await vetsPage.getSpecialitiesCount(data.vets);
})

When ('User adds a new veterinarian with type Radiology', async () => {
    vetsAddPage.log('Navigate to vets add page');
    await vetsAddPage.get();
    vetsAddPage.log( 'Add new vet');
    await vetsAddPage.addVet(data.vets);
})

Then ('The newly added veterinarian should show up on the veterinarian page', async () => {
    vetsAddPage.log('Verify radiology cont');
    expect(await vetsPage.getSpecialitiesCount(data.vets), 'radiology count mismatch').to.be.equal(radiologyCount+1);
})

Given ('User prepared to delete a veterinarian', async () => {
    vetsPage.log('Navigate to vets page');
    await vetsPage.get();
    vetsPage.log( 'Get vets count');
    vetsCount = await vetsPage.getVetsCount();
})

When ('User deletes a veterinarian', async () => {
    vetsPage.log('Delete a vet');
    await vetsPage.deleteVet(data.vets);
})

Then ('Deleted veterinarian does not show up on the veterinarian page', async () => {
    vetsPage.log('Verify vet was deleted');
    expect(await vetsPage.getVetsCount(), 'Vet was not deleted').to.be.equal(vetsCount-1);
})

Given ('User preared to add a new owner', async () => {
    ownersPage.log('Navigate to Add owners page');
    await ownersAddPage.get();
})

When ('User adds new owner', async () => {
    ownersPage.log('Add new owner');
    await ownersAddPage.addOwner(data.newOwner);
})

Then ('the newly added owner should show up on the owners page', async () => {
    await ownersPage.get();
    ownersPage.log('Check owner exists');
    expect(await ownersPage.checkOwnerExists(data.newOwner), 'Owner not added').equal(true);
})


