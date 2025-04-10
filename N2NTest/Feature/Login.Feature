

 Feature: Login

  Scenario: Login in as a user

    Given I am at the WTP homepage
    And I see the register button
    When I click on the register button
    Then I should see the register form
    When I fill in the form with valid data
    And I click on the submit button
    Then I should see a success message


      
    
    
    