async function getWeather() {
  const city = document.getElementById("city-input").value.trim();
  if (city === "") {
    alert("Lütfen bir şehir ismi girin!");
    return;
  }

  const apiKey = "fdcd9b4cc83d7f22472d820d7a703ec9"; // OpenWeatherMap'ten alınan API Key
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=tr`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Şehir bulunamadı!");
    const data = await response.json();

    const weatherHtml = `
      <h2>${data.name}</h2>
      <p>Sıcaklık: ${data.main.temp}°C</p>
      <p>Durum: ${data.weather[0].description}</p>
      <p>Nem: ${data.main.humidity}%</p>
      <p>Rüzgar: ${data.wind.speed} m/s</p>
    `;

    document.getElementById("weather-info").innerHTML = weatherHtml;
  } catch (error) {
    document.getElementById("weather-info").innerHTML = `<p style="color: yellow;">${error.message}</p>`;
  }
}
