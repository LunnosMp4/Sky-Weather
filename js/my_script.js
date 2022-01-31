let weather = {
    apiKey: "e27a83d7b9a876340a1e47ddb3b9f246",
    fetchWeather: function (city) {
      fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" +
          city +
          "&units=metric&appid=" +
          this.apiKey +
          "&lang=fr"
      )
        .then((response) => {
          if (!response.ok) {
            alert("Erreur: '" + city + "' n'existe pas.");
            throw new Error("Erreur: '" + city + "' n'existe pas.");
          }
          return response.json();
        })
        .then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) {
      const { name } = data;
      const { lon, lat } = data.coord;
      const { country } = data.sys;
      const { icon, description } = data.weather[0];
      const { temp, feels_like, temp_min, temp_max, humidity, pressure } = data.main;
      const { gust, speed, deg } = data.wind;
      const { all } = data.clouds;
      document.querySelector(".city").innerText = name + ', ' + country;
      document.querySelector(".icon").src =
        "https://openweathermap.org/img/wn/" + icon + ".png";
      document.querySelector(".description").innerText = description;
      document.querySelector(".temp").innerText = temp + "°C";
      document.querySelector(".feels_like").innerText =
        "Ressentie: " + feels_like + " °C";
      document.querySelector(".min").innerText =
        "Minimale: " + temp_min + " °C";
      document.querySelector(".max").innerText =
        "Maximale: " + temp_max + " °C";
      document.querySelector(".pressure").innerText =
        "Pression: " + pressure + " hPa";
      document.querySelector(".humidity").innerText =
        "Humidité: " + humidity + "%";
      document.querySelector(".wind").innerText =
        "Vent: " + speed + " km/h";
      document.querySelector(".rafale").innerText =
        "Rafale: " + gust + " km/h";
      document.querySelector(".nuage").innerText =
        "Couverture Nuageuse: " + all + " %";
      document.querySelector(".direction").innerText =
        "Direction: " + deg + " Degrés";
      document.querySelector(".mappy").src =
        "https://embed.windy.com/embed2.html?lat=" + lat + "&lon=" + lon + "&detailLat=" + lat + "&detailLon=" + lon + "&width=1250&height=650&zoom=12&level=surface&overlay=wind&product=ecmwf&menu=&message=true&marker=&calendar=now&pressure=&type=map&location=coordinates&detail=&metricWind=km%2Fh&metricTemp=%C2%B0C&radarRange=-1";
      document.querySelector(".weather").classList.remove("loading");
    },
    search: function () {
      this.fetchWeather(document.querySelector(".search-bar").value);
    },
  };

  document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
  });

  document
    .querySelector(".search-bar")
    .addEventListener("keyup", function (event) {
      if (event.key == "Enter") {
        weather.search();
      }
    });

  weather.fetchWeather("Montpellier");