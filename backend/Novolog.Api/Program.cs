using Novolog.Api.Services;
using Novolog.Api.Models;
using System.Net.Mail;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();
builder.Services.AddSingleton<DoctorCatalog>();
builder.Services.AddProblemDetails();
builder.Services.AddSingleton<ContactRequestStore>();

var app = builder.Build();
app.UseExceptionHandler();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

var summaries = new[]
{
    "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
};

app.MapGet("/weatherforecast", () =>
{
    var forecast = Enumerable.Range(1, 5).Select(index =>
        new WeatherForecast
        (
            DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
            Random.Shared.Next(-20, 55),
            summaries[Random.Shared.Next(summaries.Length)]
        ))
        .ToArray();
    return forecast;
})
.WithName("GetWeatherForecast");



app.MapGet("/api/doctors",
    (DoctorCatalog catalog,
     bool activeOnly = false,
     bool payingOnly = false) =>
{
    var doctors = catalog.GetDoctors(activeOnly, payingOnly);

    return Results.Ok(doctors);
});



app.MapPost("/api/contact-requests",
   async (
    ContactRequest request,
    DoctorCatalog catalog,
    ContactRequestStore store) =>
  {
      if (string.IsNullOrWhiteSpace(request.FullName) ||
          string.IsNullOrWhiteSpace(request.Phone) ||
          string.IsNullOrWhiteSpace(request.Email))
      {
          return Results.BadRequest(
              "Full name, phone and email are required."
          );
      }

      if (!catalog.Doctors.Any(d => d.Id == request.DoctorId))
      {
          return Results.BadRequest(
              "The selected doctor does not exist."
          );
      }

      // Validate phone number
      if (!PhoneFormatter.IsValid(request.Phone))
      {
          return Results.BadRequest(
              "Invalid Israeli phone number."
          );
      }

      // Validate email address
      var email = request.Email.Trim();

      if (!MailAddress.TryCreate(email, out var parsedEmail) ||
          !string.Equals(
              parsedEmail.Address,
              email,
              StringComparison.OrdinalIgnoreCase))
      {
          return Results.BadRequest(
              "Invalid email address."
          );
      }

      await store.SaveAsync(request);

      return Results.Ok(
          new { message = "Contact request received." }
      );
  });



app.Run();

record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}
