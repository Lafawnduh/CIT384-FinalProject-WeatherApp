import React, { useState, useEffect } from 'react';
//import axios from 'axios';
import config from './config';
//test whatever
function WeatherAPI({ city }) {
    const [weatherData, setWeatherData] = useState(null);
  
    useEffect(() => {
      const fetchData = async () => {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${config.WEATHER_API_KEY}&units=imperial`);
        const data = await response.json();
        setWeatherData(data);
      };
      fetchData();
    }, [city, state]);

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

    if (weatherCondition === "Rain" || weatherCondition === "Drizzle" || weatherCondition === "Thunderstorm") {
        tip += " Don't forget your umbrella, as it's raining.";
    } else if (weatherCondition === "Snow") {
        tip += " Be prepared for snowy conditions. Wear warm boots and be cautious while walking or driving.";
    }

    return tip;
  }

  return (
    <div className="container">
      <div className="weather-card">
        <h2>{weatherData ? weatherData.name : 'Loading...'}</h2>
        {weatherData && (
          <>
            <img src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`} alt="Weather icon"/>
            <p>Temperature: {weatherData.main.temp}&deg;F</p>
            <p>Humidity: {weatherData.main.humidity}%</p>
            <p>Description: {weatherData.weather[0].description}</p>
            <p id="weatherTip"><b>Weather Tip: </b>{generateWeatherTip(weatherData.main.temp, weatherData.weather[0].main)}</p>
          </>
        )}
      </div>      
    </div>
  );
}

export default WeatherAPI;