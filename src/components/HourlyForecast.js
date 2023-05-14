import React, { useState, useEffect } from 'react';
import config from './config';
import '../styles/HourlyForecast.css';

function HourlyForecast({ selectedCity }) {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${selectedCity.lat}&lon=${selectedCity.lon}&exclude=minutely,daily,alerts&units=imperial&appid=${config.WEATHER_API_KEY}`
      );
      const data = await response.json();
      setWeatherData(data);
    };
    fetchData();
  }, [selectedCity]);

  return (
    <div className="container">
      <div className="weather-card">
        <h2>{weatherData ? `Hourly Forecast for ${selectedCity.name}, ${selectedCity.state}` : 'Loading...'}</h2>
        <div className="hourly-weather-container">
          <table className="hourly-table">
            <thead>
              <tr>
                <th>Time</th>
                <th>Temperature</th>
              </tr>
            </thead>
            <tbody>
              {weatherData &&
                weatherData.hourly.slice(0, 8).map((hour, index) => (
                  <tr key={index}>
                    <td>{new Date(hour.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                    <td>{Math.round(hour.temp)}&deg;F</td>
                    <td>
                      <img src={`http://openweathermap.org/img/w/${hour.weather[0].icon}.png`} alt="Weather icon" />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <table className="hourly-table">
            <thead>
              <tr>
                <th>Time</th>
                <th>Temperature</th>
              </tr>
            </thead>
            <tbody>
              {weatherData &&
                weatherData.hourly.slice(9, 16).map((hour, index) => (
                  <tr key={index}>
                    <td>{new Date(hour.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                    <td>{Math.round(hour.temp)}&deg;F</td>
                    <td>
                      <img src={`http://openweathermap.org/img/w/${hour.weather[0].icon}.png`} alt="Weather icon" />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <table className="hourly-table">
            <thead>
              <tr>
                <th>Time</th>
                <th>Temperature</th>
              </tr>
            </thead>
            <tbody>
            {weatherData &&
              weatherData.hourly.slice(17, 24).map((hour, index) => (
                <tr key={index}>
                  <td>{new Date(hour.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                  <td>{Math.round(hour.temp)}&deg;F</td>
                  <td>
                    <img src={`http://openweathermap.org/img/w/${hour.weather[0].icon}.png`} alt="Weather icon" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default HourlyForecast;
