Feature: skapa användare som admin 
  
  

  Background:
    Given I am logged in as an admin
    And I navigate to the create user page

  Scenario: Successfully create a new user
    When I fill in all required fields with valid data
    And I submit the create user form
    Then I should see a success message
    And the form should be reset

  Scenario: Create a staff user with specific details
    When I fill in the email field with "staff.test@example.com"
    And I fill in the username field with "Staff Test"
    And I fill in the password field with "StaffPass123"
    And I select "fordon" as the company
    And I select "staff" as the role
    And I submit the create user form
    Then I should see a success message

  Scenario: Create an admin user with specific details
    When I fill in the email field with "admin.test@example.com"
    And I fill in the username field with "Admin Test"
    And I fill in the password field with "AdminPass123"
    And I select "tele" as the company
    And I select "admin" as the role
    And I submit the create user form
    Then I should see a success message