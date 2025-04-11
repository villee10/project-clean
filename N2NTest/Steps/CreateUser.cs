using Microsoft.Playwright;
using TechTalk.SpecFlow;
using Xunit;
using N2NTest.Helper;
using static Microsoft.Playwright.Assertions;



namespace End2EndTester.Steps;


[Binding]
public class CreateUser
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

    [Given(@"Jag är inloggad som admin")]
    public async Task GivenJagÄrInloggadSomAdmin()
    {
        await N2NTest.Helper.Login.LoginAsync(_page);


        await _page.WaitForURLAsync("**/admin/dashboard", new() { Timeout = 30000 });
    }

    [Given(@"jag navigerar till create user sidan")]
    public async Task GivenJagNavigerarTillCreateUserSidan()
    {
        await _page.ClickAsync("text=Create User");

        // Vänta på navigation
        await _page.WaitForURLAsync("**/admin/create-user");
    }


    [When(@"Jag fyller i uppgifterna för nya användaren")]
    public async Task WhenJagFyllerIUppgifternaFörNyaAnvändaren()
    {
        string randomEmail = $"test{DateTime.Now.Ticks}@example.com";

        await _page.FillAsync("input[name='email']", randomEmail);
        await _page.FillAsync("input[name='firstName']", "Test");
        await _page.FillAsync("input[name='password']", "321123!");
        await _page.SelectOptionAsync("select[name='company']", "fordon");
        await _page.SelectOptionAsync("select[name='role']", "staff");
    }

   
    [When(@"Jag klickar på skapa användare")]
    public async Task WhenJagKlickarPåSkapaAnvändare()
    {
        await _page.ClickAsync("text=Skapa användare");
    }
    
}