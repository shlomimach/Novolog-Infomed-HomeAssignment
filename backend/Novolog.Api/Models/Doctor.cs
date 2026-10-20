namespace Novolog.Api.Models;

public class Doctor
{
    public int Id { get; set; }

    public string FullName { get; set; } = string.Empty;

    public bool IsActive { get; set; }

    public int PromotionLevel { get; set; }

    public List<DoctorPhone> Phones { get; set; } = new();

    public List<string> LanguageIds { get; set; } = new();
    public List<string> Languages { get; set; } = new();

    public List<DoctorClinic> Clinics { get; set; } = new();

    public DoctorReviews Reviews { get; set; } = new();
    public bool HasArticle { get; set; }
}

public class DoctorReviews
{
    public double AverageRating { get; set; }

    public int TotalRatings { get; set; }

    public double ProfessionalismRate { get; set; }

    public double WaitingTimeRate { get; set; }

    public double ServiceRate { get; set; }
}


public class DoctorPhone
{
    public string Number { get; set; } = string.Empty;
    public int PhoneType { get; set; }
}

public class DoctorClinic
{
    public string Name { get; set; } = string.Empty;
    public DoctorAddress Address { get; set; } = new();
    public List<DoctorPhone> Phones { get; set; } = new();
    public bool IsActive { get; set; }
}

public class DoctorAddress
{
    public string CityName { get; set; } = string.Empty;
    public string Street { get; set; } = string.Empty;
}
