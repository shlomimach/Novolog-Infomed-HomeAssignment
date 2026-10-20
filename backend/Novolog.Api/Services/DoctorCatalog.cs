using System.Text.Json;
using Novolog.Api.Models;

namespace Novolog.Api.Services;

public class DoctorCatalog
{
    public IReadOnlyList<Doctor> Doctors { get; }

    // Filtering and Sorting
    public IReadOnlyList<Doctor> GetDoctors(
        bool activeOnly = false,
        bool payingOnly = false)
    {
        IEnumerable<Doctor> doctors = Doctors;

        if (activeOnly)
        {
            doctors = doctors.Where(d => d.IsActive);
        }

        if (payingOnly)
        {
            doctors = doctors.Where(d => d.PromotionLevel <= 5);
        }

        return doctors
            .OrderByDescending(d => d.Reviews.AverageRating)
            .ThenByDescending(d => d.Reviews.TotalRatings)
            .ThenBy(d => d.PromotionLevel)
            .ToList();
    }

    //Load Json
    public DoctorCatalog(IWebHostEnvironment environment)
    {
        var path = Path.Combine(
            environment.ContentRootPath,
            "Data",
            "doctors.json"
        );

        var json = File.ReadAllText(path);

        var options = new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true
        };

        // המרת נתוני JSON לאובייקטים מסוג Doctor
        var doctors = JsonSerializer.Deserialize<List<Doctor>>(
            json,
            options
        ) ?? throw new InvalidDataException(
            "Could not load doctors data."
        );

        // Format phone numbers
        FormatDoctorPhoneNumbers(doctors);
        //ממלא את שפות הרופאים לפי המזהים שלהם
        PopulateDoctorLanguages(environment, doctors);
        // מילוי מאמרי הרופאים
        PopulateDoctorArticles(environment, doctors);

        Doctors = doctors;

    }


    private static void PopulateDoctorArticles(
        IWebHostEnvironment environment,
        List<Doctor> doctors)
    {
        var path = Path.Combine(
            environment.ContentRootPath,
            "Data",
            "articles.json"
        );

        var json = File.ReadAllText(path);

        var options = new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true
        };

        var articles = JsonSerializer.Deserialize<List<Article>>(
            json,
            options
        ) ?? throw new InvalidDataException(
            "Could not load articles data."
        );

        var doctorIdsWithArticles = articles
            .SelectMany(a => a.Sponsorships)
            .Select(s => s.SponsorshipId)
            .ToHashSet();

        foreach (var doctor in doctors)
        {
            doctor.HasArticle =
                doctorIdsWithArticles.Contains(doctor.Id);
        }
    }

    private static void PopulateDoctorLanguages(IWebHostEnvironment environment, List<Doctor> doctors)
    {
        var languagePath = Path.Combine(
            environment.ContentRootPath,
            "Data",
            "language.json"
        );

        var languageJson = File.ReadAllText(languagePath);

        var languageData =
            JsonSerializer.Deserialize<
                Dictionary<string, Dictionary<string, string>>>(languageJson)
            ?? throw new InvalidDataException(
                "Could not load language data."
            );

        if (!languageData.TryGetValue("language", out var languageNames))
        {
            throw new InvalidDataException("Missing language mapping.");
        }

        foreach (var doctor in doctors)
        {
            doctor.Languages = doctor.LanguageIds
                .Where(id => languageNames.ContainsKey(id))
                .Select(id => languageNames[id])
                .ToList();
        }
    }

    private static void FormatDoctorPhoneNumbers(List<Doctor> doctors)
    {
        foreach (var doctor in doctors)
        {
            foreach (var phone in doctor.Phones)
            {
                phone.Number = PhoneFormatter.Format(phone.Number);
            }

            foreach (var clinic in doctor.Clinics)
            {
                foreach (var phone in clinic.Phones)
                {
                    phone.Number = PhoneFormatter.Format(phone.Number);
                }
            }
        }
    }
}