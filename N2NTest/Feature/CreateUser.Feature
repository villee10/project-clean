Feature: skapa användare som admin 
  
  Background:
    Given Jag är inloggad som admin
    And jag navigerar till create user sidan

Scenario: Skapa en ny användare
  When Jag fyller i uppgifterna för nya användaren
  And Jag klickar på skapa användare

  