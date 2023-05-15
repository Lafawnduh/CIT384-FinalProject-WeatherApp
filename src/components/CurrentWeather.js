// Import necessary libraries and components
import React, { useState, useEffect } from 'react';
import config from './config';
import '../styles/CurrentWeather.css';
import WeatherTips from './WeatherTips';

// CurrentWeather component
function CurrentWeather({ selectedCity }) {
  // State to store the fetched weather data
  const [weatherData, setWeatherData] = useState(null);

  // useEffect hook to fetch current weather data when selectedCity changes
  useEffect(() => {
    // Function to fetch weather data from OpenWeatherMap API
    const fetchData = async () => {
      const response = await fetch(
        `https://api.openweathermap.org/data/3.0/onecall?lat=${selectedCity.lat}&lon=${selectedCity.lon}&exclude=minutely,hourly,daily,alerts&units=imperial&appid=${config.WEATHER_API_KEY1}`
      );
      const data = await response.json();
      setWeatherData(data); // Update weatherData state with fetched data
    };
    fetchData(); // Call the fetchData function
  }, [selectedCity]);

  return (
    <div className="current-weather-container">
      {/* Check if weatherData is available */}
      {weatherData ? (
        <>
          <div className="current-weather">
            {/* Display the selected city and state */}
            <h2>Current Weather for {selectedCity.name}, {selectedCity.state}</h2>
            {/* Display the current date and time */}
            <h3>{new Date(weatherData.current.dt * 1000).toLocaleDateString()}, {new Date(weatherData.current.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</h3>
            {/* Display the weather icon */}
            <img
              src={`http://openweathermap.org/img/w/${weatherData.current.weather[0].icon}.png`}
              alt="Weather icon"
            />
            {/* Display the current temperature */}
            <p>Temperature: {Math.round(weatherData.current.temp)}&deg;F</p>
            {/* Display the weather description */}
            <p>Description: {weatherData.current.weather[0].description}</p>
            {/* Display the humidity */}
            <p>Humidity: {weatherData.current.humidity}%</p>
            {/* Display weather tips based on temperature and weather condition */}
            <WeatherTips
              temperature={weatherData.current.temp}
              weatherCondition={weatherData.current.weather[0].main}
            />
          </div>
        </>
      ) : (
        // Show loading message if weatherData is not available
        <h2>Loading...</h2>
      )}
    </div>
  );
}

// Export the CurrentWeather component
export default CurrentWeather;
