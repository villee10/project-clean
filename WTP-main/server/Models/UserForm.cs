namespace server.Models;

public class UserForm
{
    public int Id { get; set; }
    public string FirstName { get; set; }
    public string Password { get; set; }
    public string Company { get; set; }
    public string Role { get; set; }
    public DateTime CreatedAt { get; set; }
    
    public string Email { get; set; }
}
