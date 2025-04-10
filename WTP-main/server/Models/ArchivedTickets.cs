namespace server.Models;

public record ArchivedTickets(
        string FirstName,
        string Email,
        string ServiceType,
        string IssueType,
        string Message,
        string ChatToken,
        DateTime SubmittedAt,
        DateTime ResolvedAt,
        string FormType,
        string CompanyType
        );
