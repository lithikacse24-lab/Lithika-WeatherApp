let timer;
function show()
{
    const API_KEY = "9bfc2d19d166eb64b64dd2869a834828";     /*use your api key here*/
    const io = document.getElementById("input");
    const CITY_NAME = io.value.trim();
    const result = document.getElementById("weatherResult");
    if (CITY_NAME === "")
    {   result.innerHTML = "<p style='color:#ff6b6b;'>Please enter a valid city name !!</p>";
        return;   
    }
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${CITY_NAME}&units=metric&appid=${API_KEY}`)
        .then((response) => response.json())
        .then((data) => {
            if (data.cod != 200) {
                result.innerHTML = `<p style="color:#ff6b6b;">${data.message}</p>`;
                return;
            }
            const city = data.name;
            const country = data.sys.country;
            const current_temp = data.main.temp;
            const feels_temp = data.main.feels_like;
            const weather = data.weather[0].main;
            const description = data.weather[0].description;
            const humidity = data.main.humidity;
            const pressure = data.main.pressure;
            const wind_speed = data.wind.speed;
            const visibility = data.visibility;
            const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
            const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString();
            const icon = data.weather[0].icon;
            const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
            result.innerHTML =
               `<h2>${city}, ${country}</h2>
                <h4 id="timeBox" style="text-align:center"></h4>
                <div style="text-align:center;">
                    <img src="${iconUrl}" alt="${weather}">
                    <h3>${weather}</h3>
                </div>
                <div class="row">🌡️ <span class="label">Temperature</span><span class="value">${current_temp} °C</span></div>
                <div class="row">🤗 <span class="label">Feels Like</span><span class="value">${feels_temp} °C</span></div>
                <div class="row">☁️ <span class="label">Weather</span><span class="value">${weather}</span></div>
                <div class="row">💧 <span class="label">Humidity</span><span class="value">${humidity}%</span></div>
                <div class="row">📈 <span class="label">Pressure</span><span class="value">${pressure} hPa</span></div>
                <div class="row">💨 <span class="label">Wind Speed</span><span class="value">${wind_speed} m/s</span></div>
                <div class="row">🔍 <span class="label">Visibility</span><span class="value">${visibility/1000} km</span></div>
                <div class="row">☀️ <span class="label">Sunrise</span><span class="value">${sunrise}</span></div>
                <div class="row">⛅ <span class="label">Sunset</span><span class="value">${sunset}</span></div>
                `;
                if (timer) clearInterval(timer);
                timer = setInterval(() => {
                    const now = new Date();
                    document.getElementById("timeBox").innerHTML =
                        now.toLocaleTimeString() + " , " + now.toDateString();
                }, 1000);
        })
        .catch((err) => {
            result.innerHTML = `<p style="color:#ff6b6b;">Error: ${err.message}</p>`;
        });    
}
