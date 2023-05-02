import React, { useState, useEffect } from 'react';
import config from './config';
import '../styles/HourlyForecast.css';

function HourlyForecast({ selectedCity }) {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://api.openweathermap.org/data/3.0/onecall?lat=${selectedCity.lat}&lon=${selectedCity.lon}&exclude=minutely,daily,alerts&units=imperial&appid=${config.WEATHER_API_KEY}`
      );
      const data = await response.json();
      setWeatherData(data);
    };
    fetchData();
  }, [selectedCity]);

  return (
    <div className="container">
      <div className="weather-card">
        <h2>{weatherData ? `Hourly Forecast for ${selectedCity.name} ${selectedCity.state}` : 'Loading...'}</h2>
        <div className="hourly-weather-container">
          {weatherData &&
            weatherData.hourly.map((hour, index) => (
              <div key={index} className="hourly-weather">
                <h3>{new Date(hour.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</h3>
                <img
                  src={`http://openweathermap.org/img/w/${hour.weather[0].icon}.png`}
                  alt="Weather icon"
                />
                <p>Temperature: {hour.temp}&deg;F</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default HourlyForecast;