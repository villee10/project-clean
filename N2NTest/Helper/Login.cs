using Microsoft.Playwright;

namespace N2NTest.Helper
{
    public static class Login
    {
        public static async Task LoginAsync(IPage page)
        {
            await page.GotoAsync("http://localhost:3001/staff/login");

            await page.FillAsync("input.staff-field-input[type='text']", "Ville");
            await page.FillAsync("input.staff-field-input[type='password']", "12345");

            await page.ClickAsync("button:has-text('LOGGA IN')");

            await page.WaitForURLAsync("**/staff/dashboard");
        }

        

    }
}