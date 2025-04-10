  
  Feature: Kunden skriver i formuläret.
    
    Scenario: Kunden fyller i Tele/Bredband formuläret.
      Given Att jag är på formulär sidan.
      When Jag väljer "Tele/Bredband" som företag
      And Jag fyller i mina personuppgifter
      And Jag väljer "Bredband" som min typ av tjänst
      And Jag väljer "Tekniskt problem" som mitt ärende
      And Jag beskriver mitt ärende i ett meddelande
      And  Klickar på "Skicka"
      Then Får jag ett autosvar på mailen med en länk
      
      Scenario: Kunden fyller i Fordonsservice formuläret.
        Given Att jag är på formulär sidan.
        When Jag väljer "Fordonsservice" som företag
        And Jag fyller i mina personuppgifter
        
        And Jag fyller i "QWE123" som mitt registreringsnummer
        And Jag fyller i "Problem efter reparation" som ärende
        And Jag beskriver mitt ärende i ett meddelande
        And  Klickar på "Skicka"
        Then Får jag ett autosvar på mailen med en länk
        