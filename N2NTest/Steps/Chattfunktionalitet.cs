using Microsoft.Playwright;
using TechTalk.SpecFlow;
using Xunit;
using N2NTest.Helper;
using static Microsoft.Playwright.Assertions;



namespace End2EndTester.Steps;


[Binding]
public class Chattfunktionalitet
{
    private IPlaywright _playwright;
    private IBrowser _browser;
    private IBrowserContext _context;
    private IPage _page;

    [BeforeScenario]
    public async Task Setup()
    {
        _playwright = await Playwright.CreateAsync();
        _browser = await _playwright.Chromium.LaunchAsync(new() { Headless = false });
        _context = await _browser.NewContextAsync();
        _page = await _context.NewPageAsync();
    }

    [AfterScenario]
    public async Task Teardown()
    {
        await _browser.CloseAsync();
        _playwright.Dispose();
    }

    

    [Given("Att jag klickar på ett ärende under öppna chatt")]
    public async Task GivenIClickOnATicketOnOppnaChatt()
    {
        await _page.GotoAsync("http://localhost:3001/staff/dashboard");
        
        //logga in
        await N2NTest.Helper.Login.LoginAsync(_page);

        // Vänta in ticket-länkar
        await _page.WaitForSelectorAsync("div.ticket-task-token a");

        // Klicka första "Öppna chatt"-länken utan att navigera bort
        var chatLink = _page.Locator("div.ticket-task-token a").First;
        await _page.EvaluateAsync(@"(element) => {
            element.addEventListener('click', e => e.preventDefault(), { once: true });
            element.click();
        }", await chatLink.ElementHandleAsync());

        // Vänta in modalen
        await _page.WaitForSelectorAsync(".chat-modal", new() { Timeout = 5000 });
    }

    [When("Jag skriver ett svar i chattfältet")]
    public async Task WhenIWriteAResponseInTheChat()
    {
        await _page.FillAsync(".chat-modal__input-field", "Vad kan jag hjälpa dig med?");
    }

    [When("Jag klickar på skicka knappen")]
    public async Task WhenIClickOnTheSendButton()
    {
        await _page.ClickAsync(".chat-modal__send-button");
    }

    [Then(@"Ska jag se mitt svar visas i chatten")]
    public async Task ThenIShouldSeeMyResponseInTheChat()
    {

        {
            // Vänta tills det önskade meddelandet syns i chatten
            await _page.WaitForSelectorAsync(".chat-modal", new PageWaitForSelectorOptions { Timeout = 5000 });
        }
        
    }
}