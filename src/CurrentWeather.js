import React, { useState, useEffect } from 'react';
import config from './config';
import './CurrentWeather.css';

function CurrentWeather({ selectedCity }) {
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

  return (
    <div className="current-weather-container">
      {weatherData ? (
        <>
          <h2>Current Weather for {selectedCity.name}, {selectedCity.state}</h2>
          <div className="current-weather">
            <h3>{new Date(weatherData.current.dt * 1000).toLocaleString()}</h3>
            <img
              src={`http://openweathermap.org/img/w/${weatherData.current.weather[0].icon}.png`}
              alt="Weather icon"
            />
            <p>Temperature: {weatherData.current.temp}&deg;F</p>
            <p>Description: {weatherData.current.weather[0].description}</p>
            <p>Humidity: {weatherData.current.humidity}%</p>
          </div>
        </>
      ) : (
        <h2>Loading...</h2>
      )}
    </div>
  );
}

export default CurrentWeather;
