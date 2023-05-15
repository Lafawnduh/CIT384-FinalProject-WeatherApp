// Import necessary libraries
import React, { useState, useEffect } from 'react';
import config from './config';
import '../styles/DailyForecast.css';

// DailyForecast component
function DailyForecast({ selectedCity }) {
  // State to store the fetched weather data
  const [weatherData, setWeatherData] = useState(null);

  // useEffect hook to fetch daily weather data when selectedCity changes
  useEffect(() => {
    // Function to fetch weather data from OpenWeatherMap API
    const fetchData = async () => {
      const response = await fetch(
        `https://api.openweathermap.org/data/3.0/onecall?lat=${selectedCity.lat}&lon=${selectedCity.lon}&exclude=minutely,hourly,alerts&units=imperial&appid=${config.WEATHER_API_KEY}`
      );
      const data = await response.json();
      setWeatherData(data); // Update weatherData state with fetched data
    };
    fetchData(); // Call the fetchData function
  }, [selectedCity]);

  return (
    <div className="container">
      <div className="daily-weather-card">
        {/* Display header with city and state if weatherData is available, otherwise show 'Loading...' */}
        <h2>{weatherData ? `Daily Forecast for ${selectedCity.name}, ${selectedCity.state}` : 'Loading...'}</h2>
        <div className="daily-weather-container">
          {/* Check if weatherData is available */}
          {weatherData &&
            weatherData.daily.slice(0, 7).map((day, index) => (
              <div key={index} className="daily-weather">
                <h3>{new Date(day.dt * 1000).toLocaleDateString()}</h3>
                <img src={`http://openweathermap.org/img/w/${day.weather[0].icon}.png`} alt="Weather icon" />
                <p>{Math.round(day.temp.day)}&deg;F</p>
                <p>{day.weather[0].description}</p>
                <p>Humidity: {day.humidity}%</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

// Export the DailyForecast component
export default DailyForecast;
