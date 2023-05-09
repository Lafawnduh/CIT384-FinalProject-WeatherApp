// Import necessary libraries
import React, { useState, useEffect } from 'react';
import config from './config';
import '../styles/HourlyForecast.css';

// HourlyForecast component
function HourlyForecast({ selectedCity }) {
  // State to store the fetched weather data
  const [weatherData, setWeatherData] = useState(null);

  // useEffect hook to fetch hourly weather data when selectedCity changes
  useEffect(() => {
    // Function to fetch weather data from OpenWeatherMap API
    const fetchData = async () => {
      const response = await fetch(
        `https://api.openweathermap.org/data/3.0/onecall?lat=${selectedCity.lat}&lon=${selectedCity.lon}&exclude=minutely,daily,alerts&units=imperial&appid=${config.WEATHER_API_KEY}`
      );
      const data = await response.json();
      setWeatherData(data); // Update weatherData state with fetched data
    };
    fetchData(); // Call the fetchData function
  }, [selectedCity]);

  return (
    <div className="container">
      <div className="weather-card">
        {/* Display header with city and state if weatherData is available, otherwise show 'Loading...' */}
        <h2>{weatherData ? `Hourly Forecast for ${selectedCity.name}, ${selectedCity.state}` : 'Loading...'}</h2>
        <div className="hourly-weather-container">
          {/* Check if weatherData is available */}
          {weatherData &&
            // Iterate through the hourly forecast data and display the relevant information
            weatherData.hourly.map((hour, index) => (
              <div key={index} className="hourly-weather">
                {/* Display the time */}
                <h3>{new Date(hour.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</h3>
                {/* Display the weather icon */}
                <img
                  src={`http://openweathermap.org/img/w/${hour.weather[0].icon}.png`}
                  alt="Weather icon"
                />
                {/* Display the hour's temperature */}
                <p>Temperature: {hour.temp}&deg;F</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

// Export the HourlyForecast component
export default HourlyForecast;
