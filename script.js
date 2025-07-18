const apiKey = "fdcd9b4cc83d7f22472d820d7a703ec9"; // API key

const citySelect = document.getElementById("citySelect");
const cityInput = document.getElementById("cityInput");
const weatherResult = document.getElementById("weatherResult");
const errorMsg = document.getElementById("errorMsg");
const getWeatherBtn = document.getElementById("getWeatherBtn");

getWeatherBtn.addEventListener("click", () => {
  errorMsg.textContent = "";
  weatherResult.style.display = "none";

  let city = cityInput.value.trim();

  // Eğer manuel giriş boşsa, dropdown seçeneğini kullan
  if (city === "") {
    city = citySelect.value;
  }

  if (city === "") {
    errorMsg.textContent = "Lütfen bir şehir seçin veya yazın!";
    return;
  }

  fetchWeather(city);
});

async function fetchWeather(city) {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric&lang=tr`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Şehir bulunamadı veya API hatası.");
    }

    const data = await response.json();

    weatherResult.style.display = "block";

    // Burada OpenWeatherMap'in icon kodlarını kullanıyoruz
    // icon örn: 01d (güneş), 02d (hafif bulut), 03d/04d (bulut), vb.
    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    weatherResult.innerHTML = `
      <h2>${data.name}</h2>
      <p style="text-transform: capitalize;">${data.weather[0].description}</p>
      <img src="${iconUrl}" alt="hava durumu" />
      <p><strong>Sıcaklık:</strong> ${data.main.temp} °C</p>
      <p><strong>Nem:</strong> %${data.main.humidity}</p>
      <p><strong>Rüzgar:</strong> ${data.wind.speed} m/s</p>
    `;

  } catch (error) {
    errorMsg.textContent = error.message;
  }
}
