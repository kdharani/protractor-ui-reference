Feature: Petclinic application owner features
    User should able to view the pets & visits info for a selected owner.
    ser should able to add a new owner.

    @functional
    Scenario: Confirm pet details for Peter McTavish
        Given User is on owners page
        When User selects Peter McTavish owner
        Then McTavish's pets and visits info should be displayed

    @functional
    Scenario: Add a owner
        Given User preared to add a new owner
        When User adds new owner
        Then the newly added owner should show up on the owners page