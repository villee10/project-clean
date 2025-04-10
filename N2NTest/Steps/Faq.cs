using Microsoft.Playwright;
using TechTalk.SpecFlow;
using Xunit;

namespace End2EndTester.Steps;

[Binding]
public class Faq
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

    [Given(@"I am on the FAQ page")]
    public async Task GivenIAmOnTheFaqPage()
    {
        await _page.GotoAsync("http://localhost:3001/faq");
    }

    [When(@"I click the Yes button")]
    public async Task WhenIClickTheYesButton()
    {
        await _page.ClickAsync("button:has-text('Ja')");


    }

    [Then(@"I should be navigated to the form page")]
    public async Task ThenIShouldBeNavigatedToTheFormPage()
    {
        
        await _page.WaitForURLAsync("http://localhost:3001/dynamisk"); // anpassa till rätt path
        var formElement = await _page.QuerySelectorAsync("form"); // eller en specifik rubrik/class på formuläret
        Assert.NotNull(formElement);
    }
}