using server.Models;

namespace server.Services;

using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;


public class EmailService : IEmailService
{
    private readonly IConfiguration _configuration;
    private readonly ILogger<EmailService> _logger;

    public EmailService(IConfiguration configuration, ILogger<EmailService> logger)
    {
        _configuration = configuration;
        _logger = logger;
    }

    public async Task<bool> SendChatInvitation(string recipientEmail, string chatLink, string firstName)
    {
        try
        {
            _logger.LogInformation("Försöker skicka e-post till {Email}", recipientEmail);

            var smtpServer = _configuration["Email:SmtpServer"];
            var portStr = _configuration["Email:Port"];
            var username = _configuration["Email:Username"];
            var password = _configuration["Email:Password"];
            var fromEmail = _configuration["Email:From"];

            if (string.IsNullOrEmpty(smtpServer) || 
                string.IsNullOrEmpty(portStr) || 
                string.IsNullOrEmpty(username) || 
                string.IsNullOrEmpty(password) ||
                string.IsNullOrEmpty(fromEmail))
            {
                _logger.LogWarning("E-postkonfiguration saknas. Hoppar över att skicka e-post till {Email}", recipientEmail);
                return false;
            }

            var message = new MimeMessage();
            message.From.Add(new MailboxAddress("WTP", fromEmail));
            message.To.Add(new MailboxAddress(firstName, recipientEmail));
            message.Subject = "Din chattlänk är redo!";

            var builder = new BodyBuilder
            {
                HtmlBody = $@"
                    <h2>Hej {firstName}!</h2>
                    <p>Tack för ditt formulär. Du kan nu komma åt ditt chattrum genom att klicka på länken nedan:</p>
                    <p><a href='{chatLink}'>Klicka här för att gå till chatten</a></p>
                 
                    <p>Länken är personlig och ska inte delas med andra.</p>
                    <br/>
                    <p>Med vänliga hälsningar,<br/>WTP Kundtjänst</p>
                "
            };

            message.Body = builder.ToMessageBody();

            // Lägg till tydlig loggning av anslutningsdetaljer
            _logger.LogInformation("Ansluter till SMTP-server {Server}:{Port}", smtpServer, portStr);

            using var client = new SmtpClient();
            client.Timeout = 30000; // Sätt timeout till 30 sekunder
            await client.ConnectAsync(
                smtpServer,
                int.Parse(portStr),
                SecureSocketOptions.StartTls);

            _logger.LogInformation("SMTP-anslutning upprättad, försöker autentisera");
            await client.AuthenticateAsync(username, password);
            _logger.LogInformation("SMTP-autentisering lyckades, skickar e-post");
            await client.SendAsync(message);
            await client.DisconnectAsync(true);
            
            _logger.LogInformation("E-post skickad till {Email}", recipientEmail);
            return true;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Fel vid skickande av e-post till {Email}: {Message}", recipientEmail, ex.Message);
            return false;
        }
    }
    
    public async Task SendChangePasswordLink(string recipientEmail, string firstName, string password)
    {
        var message = new MimeMessage();
        message.From.Add(new MailboxAddress("WTP", _configuration["Email:From"]));
        message.To.Add(new MailboxAddress(firstName, recipientEmail));
        message.Subject = "Din chattlänk är redo!";

        var builder = new BodyBuilder
        {
            HtmlBody = $@"
                <h2>Hej {firstName}!</h2>
                <p>Du har blivit tillagd som kundtjänst.</p>
                <p>Ditt nuvarande lösenord är {password}</p>
                <p>och ditt användarnamn är {firstName}</p>
                <br>
                <p>Vi ber dig att ändra ditt lösenord</p>
                <p>första gången du loggar in.</p>
                
                <br/>
                <p>Med vänliga hälsningar,<br/>Ditt Företag</p>
            "
        };

        message.Body = builder.ToMessageBody();

        try
        {
            using var client = new SmtpClient();
            
            // Lägg till null-check här
            var port = _configuration["Email:Port"];
            if (string.IsNullOrEmpty(port))
            {
                throw new InvalidOperationException("Email port configuration is missing");
            }

            await client.ConnectAsync(
                _configuration["Email:SmtpServer"],
                int.Parse(port),
                SecureSocketOptions.StartTls);

            await client.AuthenticateAsync(
                _configuration["Email:Username"],
                _configuration["Email:Password"]);

            await client.SendAsync(message);
            await client.DisconnectAsync(true);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Fel vid skickande av e-post till {Email}", recipientEmail);
            throw;
        }
    }
}