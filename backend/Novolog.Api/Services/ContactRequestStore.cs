using System.Text.Json;
using Novolog.Api.Models;

namespace Novolog.Api.Services;

public class ContactRequestStore
{
    private readonly string _filePath;

    // 1 הראשון - כמה כניסות מותרות בו זמנית בהתחלה.
    // 1 השני - מספר הכניסות המרבי האפשרי.
    // מנהל גישה מבוקרת לקובץ, כך שרק בקשה אחת תכתוב בכל רגע.
    private readonly SemaphoreSlim _writeLock = new(1, 1);

    public ContactRequestStore(IWebHostEnvironment environment)
    {
        var directory = Path.Combine(
            environment.ContentRootPath,
            "Storage"
        );

        Directory.CreateDirectory(directory);

        _filePath = Path.Combine(
            directory,
            "contact-requests.jsonl"
        );
    }

    public async Task SaveAsync(ContactRequest request)
    {
        var record = new
        {
            request.DoctorId,
            request.FullName,
            request.Phone,
            request.Email,
            ReceivedAtUtc = DateTimeOffset.UtcNow
        };

        var line = JsonSerializer.Serialize(record)
            + Environment.NewLine;

        await _writeLock.WaitAsync();

        try
        {
            await File.AppendAllTextAsync(_filePath, line);
        }
        finally
        {
            _writeLock.Release();
        }
    }
}
