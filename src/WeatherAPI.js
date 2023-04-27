import React, { useState, useEffect } from 'react';
import config from './config';

function WeatherAPI({ selectedCity }) {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://api.openweathermap.org/data/3.0/onecall?lat=${selectedCity.lat}&lon=${selectedCity.lon}&exclude=minutely,hourly,daily,alerts&units=imperial&appid=${config.WEATHER_API_KEY}`
      );
      const data = await response.json();
      setWeatherData(data);
    };
    fetchData();
  }, [selectedCity]);

  function generateWeatherTip(temperature, weatherCondition) {
    let tip = '';

    if (temperature < 40) {
      tip = "It's pretty cold outside. Make sure to wear a warm coat.";
    } else if (temperature >= 40 && temperature < 60) {
      tip = "It's a bit chilly today. A light sweater or jacket should be enough to keep you warm.";
    } else if (temperature >= 60 && temperature < 80) {
      tip = "The weather is quite nice. You should be comfortable in a t-shirt and shorts or light pants.";
    } else {
      tip = "It's hot outside. Stay cool with lightweight clothing and drink plenty of water.";
    }

    if (
      weatherCondition === "Rain" ||
      weatherCondition === "Drizzle" ||
      weatherCondition === "Thunderstorm"
    ) {
      tip += " Don't forget your umbrella, as it's raining.";
    } else if (weatherCondition === "Snow") {
      tip +=
        " Be prepared for snowy conditions. Wear warm boots and be cautious while walking or driving.";
    }

    return tip;
  }

  return (
    <div className="container">
      <div className="weather-card">
        <h2>{weatherData ? selectedCity.name : 'Loading...'}</h2>
        {weatherData && (
          <>
            <img
              src={`http://openweathermap.org/img/w/${weatherData.current.weather[0].icon}.png`}
              alt="Weather icon"
            />
            <p>Temperature: {weatherData.current.temp}&deg;F</p>
            <p>Description: {weatherData.current.weather[0].description}</p>
            <p>Humidity: {weatherData.current.humidity}%</p>
            <p id="weatherTip">
              <b>Weather Tip: </b>
              {generateWeatherTip(weatherData.current.temp, weatherData.current.weather[0].main)}
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default WeatherAPI;