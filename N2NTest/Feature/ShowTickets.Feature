Feature: Staff Dashboard

  Scenario: Staff user moves a ticket through the workflow
    Given Jag är inloggad
    And Jag navigerar till staff dashboard
    And Jag ser alla tickets i "Ärenden"
    When Jag drar en ticket till "Mina ärenden"
    And Jag drar samma ticket till "Klara"
    Then Ska min ticket finnas i "Klara" fältet
