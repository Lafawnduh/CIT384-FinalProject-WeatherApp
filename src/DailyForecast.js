import React, { useState, useEffect } from 'react';
import config from './config';
import './DailyForecast.css';

function DailyForecast({ selectedCity }) {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://api.openweathermap.org/data/3.0/onecall?lat=${selectedCity.lat}&lon=${selectedCity.lon}&exclude=minutely,hourly,alerts&units=imperial&appid=${config.WEATHER_API_KEY}`
      );
      const data = await response.json();
      setWeatherData(data);
    };
    fetchData();
  }, [selectedCity]);

  return (
    <div className="container">
      <div className="weather-card">
      <h2>{weatherData ? `Daily Forecast for ${selectedCity.name} ${selectedCity.state}` : 'Loading...'}</h2>
        <div className="daily-weather-container">
          {weatherData &&
            weatherData.daily.slice(0, 7).map((day, index) => (
              <div key={index} className="daily-weather">
                <h3>{new Date(day.dt * 1000).toLocaleDateString()}</h3>
                <img
                  src={`http://openweathermap.org/img/w/${day.weather[0].icon}.png`}
                  alt="Weather icon"
                />
                <p>Temperature: {day.temp.day}&deg;F</p>
                <p>Description: {day.weather[0].description}</p>
                <p>Humidity: {day.humidity}%</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default DailyForecast;
