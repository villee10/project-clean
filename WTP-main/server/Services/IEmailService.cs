namespace server.Services;

public interface IEmailService
{
    Task SendChangePasswordLink(string recipientEmail, string firstName, string password);
    Task<bool> SendChatInvitation(string recipientEmail, string chatLink, string firstName);
}