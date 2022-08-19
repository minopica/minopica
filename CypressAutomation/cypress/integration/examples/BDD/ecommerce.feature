Feature: End to end Ecommerce validation

    Application regression test
    @Regression
    Scenario: Ecommerce products delivery
    Given I open Ecommerce page
    When I add items to Cart
    And Validate the total prices
    Then Select the country submit and verify thankyou message

    @Smoke
    Scenario: Filling the form to shop
    Given I open Ecommerce page
    When I fill the form details
    |name | gender |
    |bobz | Male |
    Then Validate the form behaviour
    And Select the Shop page