namespace server.Models;

public class TeleForm
{
    public int Id { get; set; }
    
    // Gör dessa egenskaper nullbara för att testa
    public string? FirstName { get; set; }
    public string? Email { get; set; }
    public string? ServiceType { get; set; }
    public string? IssueType { get; set; }
    public string? Message { get; set; }
    public string? ChatToken { get; set; }
    public string? CompanyType { get; set; }
    
    // Gör DateTime nullable
    public DateTime? SubmittedAt { get; set; }
    public bool IsChatActive { get; set; }
}