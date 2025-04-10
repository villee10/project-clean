

using Microsoft.Playwright;
using TechTalk.SpecFlow;
using Xunit;

namespace End2EndTester.Steps;

[Binding]
public class Login
{
    private IPlaywright _playwright;
    private IBrowser _browser;
    private IBrowserContext _context;
    private IPage _page;
    
    [BeforeScenario]
    public async Task Setup()
    {
        _playwright = await Playwright.CreateAsync();
        _browser = await _playwright.Chromium.LaunchAsync(new BrowserTypeLaunchOptions { Headless = false, SlowMo = 2000 });
        _context = await _browser.NewContextAsync();
        _page = await _context.NewPageAsync();
    }
    
    [AfterScenario]
    public async Task Teardown()
    {
        await _browser.CloseAsync();
        _playwright.Dispose();
    }

    [Given(@"I am at the WTP homepage")]
    public async Task GivenIAmOnTheWTPHomepage()
    {
        await _page.GotoAsync("http://localhost:3001/");
    }

    [Given(@"I see the register button")]
    public async Task GivenISeeTheRegisterButton()
    {
        var element = await _page.QuerySelectorAsync("[class='navbar-right']");
        Assert.NotNull(element);
    }

    [When(@"I click on the register button")]
    public async Task WhenIClickOnTheRegisterButton()
    {
        await _page.ClickAsync("[class='navbar-right']");
    }
    
    [Then(@"I should see the register form")]
    public async Task ThenIShouldSeeTheRegisterForm()
    {
        var element = await _page.QuerySelectorAsync("[class='staff-login-title']");
        Assert.NotNull(element);
    }
    
    [When(@"I fill in the form with valid data")]
    public async Task WhenIFillInTheFormWithValidData()
    {
        await _page.FillAsync("input.staff-field-input[type='text']", "Ville");
        await _page.FillAsync("input.staff-field-input[type='password']", "12345");
    }

    [When(@"I click on the submit button")]
    public async Task WhenIClickOnTheSubmitButton() 
    {
        await _page.ClickAsync("button.staff-login-button");
    }
    
   
    [Then(@"I should see a success message")]
    public async Task ThenIShouldSeeASuccessMessage()
    {
        var element = await _page.QuerySelectorAsync("[class='user-name']");
        Assert.NotNull(element);
    }
}

