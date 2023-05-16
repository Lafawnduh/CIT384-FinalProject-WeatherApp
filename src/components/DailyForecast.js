// Import the necessary libraries and modules
// React is the base library
// useState and useEffect are hooks provided by React
// config is presumably a custom module that exports configuration data, likely including API keys
import React, { useState, useEffect } from 'react';
import config from './config';
import '../styles/DailyForecast.css'; // Import the associated CSS for this component

// Define the DailyForecast component, which accepts a prop `selectedCity`
function DailyForecast({ selectedCity }) {
  // Declare a state variable `weatherData` and a function to update it `setWeatherData`, initialized to null
  const [weatherData, setWeatherData] = useState(null);

  // Use the useEffect hook to execute code when `selectedCity` changes
  useEffect(() => {
    // Define an async function to fetch weather data from OpenWeatherMap API
    const fetchData = async () => {
      const response = await fetch(
        `https://api.openweathermap.org/data/3.0/onecall?lat=${selectedCity.lat}&lon=${selectedCity.lon}&exclude=minutely,hourly,alerts&units=imperial&appid=${config.WEATHER_API_KEY1}`
      );
      const data = await response.json(); // Parse the response as JSON
      setWeatherData(data); // Update the state variable `weatherData` with the fetched data
    };
    fetchData(); // Call the fetchData function
  }, [selectedCity]); // End of useEffect hook, with `selectedCity` as the dependency

  // Define what the component renders
  return (
    <div className="container">
      <div className="daily-weather-card">
        {/* Render the city and state if `weatherData` is available, otherwise render 'Loading...' */}
        <h2>{weatherData ? `Daily Forecast for ${selectedCity.name}, ${selectedCity.state}` : 'Loading...'}</h2>
        <div className="daily-weather-container">
          {/* If `weatherData` is available, render each day's forecast */}
          {weatherData &&
            weatherData.daily.slice(0, 7).map((day, index) => (
              <div key={index} className="daily-weather">
                <h3>{new Date(day.dt * 1000).toLocaleDateString()}</h3> {/* Render the date */}
                <img src={`http://openweathermap.org/img/w/${day.weather[0].icon}.png`} alt="Weather icon" /> {/* Render the weather icon */}
                <p>{Math.round(day.temp.day)}&deg;F</p> {/* Render the temperature rounded to the nearest whole number*/}
                <p>{day.weather[0].description}</p> {/* Render the weather description */}
                <p>Humidity: {day.humidity}%</p> {/* Render the humidity */}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

// Export the DailyForecast component so it can be used in other modules
export default DailyForecast;
