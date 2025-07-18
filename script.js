const apiKey = "fdcd9b4cc83d7f22472d820d7a703ec9";

const citySelect = document.getElementById("citySelect");
const cityInput = document.getElementById("cityInput");
const weatherResult = document.getElementById("weatherResult");
const errorMsg = document.getElementById("errorMsg");
const getWeatherBtn = document.getElementById("getWeatherBtn");

getWeatherBtn.addEventListener("click", () => {
  errorMsg.textContent = "";
  weatherResult.style.display = "none";

  let city = cityInput.value.trim();

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

    const iconCode = data.weather[0].icon;

    const sunSVG = `
      <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="orange" stroke="orange" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" >
        <circle cx="12" cy="12" r="5" />
        <line x1="12" y1="1" x2="12" y2="3" />
        <line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" />
        <line x1="21" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
      </svg>
    `;

    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    const iconHtml = (iconCode === "01d" || iconCode === "01n") ? sunSVG : `<img src="${iconUrl}" alt="hava durumu" />`;

    weatherResult.innerHTML = `
      <h2>${data.name}</h2>
      <p style="text-transform: capitalize;">${data.weather[0].description}</p>
      ${iconHtml}
      <p><strong>Sıcaklık:</strong> ${data.main.temp} °C</p>
      <p><strong>Nem:</strong> %${data.main.humidity}</p>
      <p><strong>Rüzgar:</strong> ${data.wind.speed} m/s</p>
    `;

  } catch (error) {
    errorMsg.textContent = error.message;
  }
}
