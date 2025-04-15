using Microsoft.Playwright;
using TechTalk.SpecFlow;
using Xunit;
using N2NTest.Helper;
using static Microsoft.Playwright.Assertions;



namespace End2EndTester.Steps;


[Binding]
public class ShowTickets
{
    private IPlaywright _playwright;
    private IBrowser _browser;
    private IBrowserContext _context;
    private IPage _page;
    private ILocator _ticket;
    private char _ticketText;

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
    
    
    
   
  [Given("Jag är inloggad")]
    public async Task GivenJagÄrInloggad()
    {
        await N2NTest.Helper.Login.LoginAsync(_page);



    }

    [Given("Jag navigerar till staff dashboard")]
    public async Task GivenJagNavigerarTillStaffDashboard()
    {
        await _page.ClickAsync("a[href='/staff/dashboard']");
        await _page.WaitForURLAsync("**/staff/dashboard", new() { Timeout = 5000 });
        Assert.Contains("/staff/dashboard", _page.Url);
    }

    [Given(@"Jag ser alla tickets i ""Ärenden""")]
    public async Task GivenJagSerAllaTicketsIArenden()
    {
        _ticket = _page.Locator("div.ticket-tasks div.ticket-task-item").First;
        await _ticket.WaitForAsync(new() { State = WaitForSelectorState.Visible, Timeout = 5000 });
    }

    [When(@"Jag drar en ticket till ""Mina ärenden""")]
    public async Task WhenJagDrarEnTicketTillMinaArenden()
    {
        var target = _page.Locator("div.ticket-my-tasks");
        await _ticket.DragToAsync(target);
        await _page.WaitForTimeoutAsync(3000);
    }

    [When(@"Jag drar samma ticket till ""Klara""")]
    public async Task WhenJagDrarSammaTicketTillKlara()
    {
        var target = _page.Locator("div.ticket-done");
        await _ticket.DragToAsync(target);
        await _page.WaitForTimeoutAsync(3000);
    }

    [Then(@"Ska min ticket finnas i ""Klara"" fältet")]
    public async Task ThenSkaMinTicketFinnasIKlaraFaltet()
    {
        var ticketsInKlara = _page.Locator("div.ticket-done div.ticket-task-item");
        await ticketsInKlara.WaitForAsync(new() { State = WaitForSelectorState.Visible, Timeout = 5000 });
        int count = await ticketsInKlara.CountAsync();

        Assert.True(count > 0, "No tickets found in 'Klara' column.");
    }

   
    

}





   