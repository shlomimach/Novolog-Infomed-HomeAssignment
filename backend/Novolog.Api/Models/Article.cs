
namespace Novolog.Api.Models;

public class Article
{
    public string Title { get; set; } = string.Empty;

    public bool IsActive { get; set; }

    public List<ArticleSponsorship> Sponsorships { get; set; } = new();
}

public class ArticleSponsorship
{
    public int SponsorshipId { get; set; }
}
