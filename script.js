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
            alert("Erreur, aucune météo trouvé.");
            throw new Error("Erreur, aucune météo trouvé.");
          }
          return response.json();
        })
        .then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) {
      const { name } = data;
      const { country } = data.sys;
      const { icon, description } = data.weather[0];
      const { temp, feels_like, temp_min, temp_max, humidity, pressure } = data.main;
      const { speed, deg } = data.wind;
      document.querySelector(".city").innerText = "Météo à " + name + ', ' + country;
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
      document.querySelector(".sea").innerText =
        "Pression au niveau de la mer: " + pressure + " hPa";
      document.querySelector(".ground").innerText =
        "Pression au niveau du sol: " + pressure + " hPa";
      document.querySelector(".humidity").innerText =
        "Humidité: " + humidity + "%";
      document.querySelector(".wind").innerText =
        "Vent: " + speed + " km/h";
      document.querySelector(".direction").innerText =
        "Direction: " + deg + " Degrés";
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