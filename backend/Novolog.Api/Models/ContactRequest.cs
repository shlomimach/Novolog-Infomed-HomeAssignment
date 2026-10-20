
namespace Novolog.Api.Models;

public class ContactRequest
{
    //DTO ייעודי לבקשות יצירת קשר
    public int DoctorId { get; set; }

    public string FullName { get; set; } = string.Empty;

    public string Phone { get; set; } = string.Empty;

    public string Email { get; set; } = string.Empty;
}
