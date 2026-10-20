
using System.Text.RegularExpressions;

namespace Novolog.Api.Services;

public static class PhoneFormatter
{
    public static string Format(string? number)
    {
        if (string.IsNullOrWhiteSpace(number))
        {
            return string.Empty;
        }

        // Remove existing hyphens and spaces
        var cleaned = Regex.Replace(number.Trim(), @"[\s-]", "");

        // Match Israeli phone prefixes
        var match = Regex.Match(
            cleaned,
            @"^(0(?:[23489]|[57]\d))(\d{7})$"
        );

        if (!match.Success)
        {
            return number.Trim();
        }

        return $"{match.Groups[1].Value}-{match.Groups[2].Value}";
    }


    public static bool IsValid(string? number)
    {
        if (string.IsNullOrWhiteSpace(number))
        {
            return false;
        }

        var digits = Regex.Replace(number, @"[\s-]", "");

        return Regex.IsMatch(
            digits,
            @"^0(?:[23489]\d{7}|[57]\d{8})$"
        );
    }

}
