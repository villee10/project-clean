using Microsoft.Playwright;
using TechTalk.SpecFlow;
using Xunit;

namespace E2ETesting.Steps;

[Binding]
public class ContactFormSteps
{
    // SETUP:
    private IPlaywright _playwright;
    private IBrowser _browser;
    private IBrowserContext _context;
    private IPage _page;
    private string _baseUrl = "http://localhost:3001";

    [BeforeScenario]
    public async Task Setup()
    {
        _playwright = await Playwright.CreateAsync();
        _browser = await _playwright.Chromium.LaunchAsync(new() { Headless = false, SlowMo = 0 });
        _context = await _browser.NewContextAsync();
        _page = await _context.NewPageAsync();
    }

    [AfterScenario]
    public async Task TearDown()
    {
        await _context.CloseAsync();
        await _browser.CloseAsync();
        _playwright.Dispose();
    }

    // STEPS:
    [Given(@"Att jag är på formulär sidan.")]
    public async Task GivenJaÄrPåFormulerSidan()
    {
        await _page.GotoAsync($"{_baseUrl}");
        await _page.WaitForSelectorAsync(".dynamisk-form-container");
    }

    [When(@"Jag väljer ""(.*)"" som företag")]
    public async Task JagVäljerTeleBredbandSomFöretag(string companyType)
    {
        await _page.WaitForSelectorAsync("select[name='companyType']");
        await _page.SelectOptionAsync("select[name='companyType']", companyType);
        // Allow time for dynamic fields to load
        await _page.WaitForTimeoutAsync(500);
    }

    [When(@"Jag fyller i mina personuppgifter")]
    public async Task WhenIFillInMyPersonalInformation()
    {
        await _page.FillAsync("input[name='firstName']", "Ville");
        await _page.FillAsync("input[name='email']", "ville.eliasson99@gmail.com");
    }

    [When(@"Jag väljer ""(.*)"" som min typ av tjänst")]
    public async Task WhenISelectAsTheServiceType(string serviceType)
    {
        await _page.WaitForSelectorAsync("select[name=serviceType]");
        await _page.SelectOptionAsync("select[name='serviceType']", serviceType);
    }


    [When(@"Jag fyller i ""(.*)"" som mitt registreringsnummer")]
    
    public async Task WhenJagSkriverInMittRegistreringsnummer( string regNum)
    {
        await _page.FillAsync("input[name='registrationNumber']", regNum);
    }

    [When(@"Jag fyller i ""(.*)"" som ärende")]
    public async Task WhenJagFyllerIProblemEfterReoarationSomÄrende( string issueType)
    {
        await _page.SelectOptionAsync("select[name='issueType']", issueType);
    }
    
    

    [When(@"Jag väljer ""(.*)"" som mitt ärende")]
    public async Task WhenISelectAsTheIssueType(string issueType)
    {
        await _page.WaitForSelectorAsync("select[name=issueType]");
        await _page.SelectOptionAsync("select[name='issueType']", issueType);
    }

    

    [When(@"Jag beskriver mitt ärende i ett meddelande")]
    public async Task WhenIEnterADetailedMessage()
    {
        await _page.FillAsync("textarea[name='message']", "Jag behöver hjälp nu.");
    }

    [When(@"Klickar på ""Skicka""")]
    public async Task WhenISubmitTheForm()
    {
        await _page.ClickAsync("button.dynamisk-form-button");
        
        // Wait for form submission to complete
        await _page.WaitForSelectorAsync(".dynamisk-message", new() { State = WaitForSelectorState.Visible });
    }

    

    [Then(@"Får jag ett autosvar på mailen med en länk")]
    public async Task ThenIShouldSeeASuccessMessage()
    {
        var messageElement = await _page.WaitForSelectorAsync(".dynamisk-message:not(.error)");
        Assert.NotNull(messageElement);
        
        // Verify the message is not an error
        var classAttribute = await messageElement.GetAttributeAsync("class");
        Assert.DoesNotContain("error", classAttribute);
        
        // Optional: Verify specific success message text
        var messageText = await messageElement.TextContentAsync();
        Assert.NotEmpty(messageText);
    }

   
}