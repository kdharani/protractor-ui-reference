Feature: Petclinic application features.
User should able to view the pets & visits info for a selected owner.
User should able to add a new veterinarian with type Radiology.
User should able to delete a veterinarian.
User should able to add a new owner.

    @functional
    Scenario: Confirm pet details for Peter McTavish
        Given User is on owners page
        When User selects Peter McTavish owner
        Then McTavish's pets and visits info should be displayed

    @functional
    Scenario: Confirm number of radiology vets
        Given User prepared to add a Radiology veterinarian
        When User adds a new veterinarian with type Radiology
        Then The newly added veterinarian should show up on the veterinarian page

    @functional
    Scenario: Delete a veterinarian
        Given User prepared to delete a veterinarian
        When User deletes a veterinarian
        Then Deleted veterinarian does not show up on the veterinarian page

    @functional
    Scenario: Add a owner
        Given User preared to add a new owner
        When User adds new owner
        Then the newly added owner should show up on the owners page