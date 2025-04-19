Feature: Chatfunktionalitet
  Som kundtjänst vill jag kunna svara på en kunds chattförfrågan
  Så att jag kan ge support direkt via dashboarden

Scenario: Personal svarar på ett chattmeddelande
Given Att jag klickar på ett ärende under "öppna chatt"
When Jag skriver ett svar i chattfältet
And Jag klickar på skicka knappen
Then Ska jag se mitt svar visas i chatten
