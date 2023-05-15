// Import necessary libraries and components
import React, { useState, useEffect } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import config from './config';
import '../styles/WeatherSearchBar.css';

// WeatherSearchBar component
function WeatherSearchBar({ cityInput, setCityInput, handleSearch }) {
  // State to store the list of city options for Autocomplete
  const [options, setOptions] = useState([]);
  // State to store the selected city from Autocomplete
  const [selectedCity, setSelectedCity] = useState(null);

  // useEffect hook to fetch city suggestions when cityInput changes
  useEffect(() => {
    // Fetch city suggestions if cityInput has more than 2 characters
    if (cityInput.length > 2) {
      // Function to fetch city suggestions from OpenWeatherMap API
      const fetchCities = async () => {
        const response = await fetch(
          `https://api.openweathermap.org/geo/1.0/direct?q=${cityInput}&limit=8&appid=${config.WEATHER_API_KEY1}`
        );
        const data = await response.json();
        setOptions(data); // Update options state with fetched city suggestions
      };
      fetchCities(); // Call the fetchCities function
    }
  }, [cityInput]);

  return (
    <div className="weather-search-bar">
      <Autocomplete
        options={options} // Pass the city options for Autocomplete
        getOptionLabel={(option) => `${option.name}, ${option.state}, ${option.country}`} // Display the label for each option
        onChange={(_event, value) => setSelectedCity(value)} // Update the selectedCity state when an option is selected
        renderInput={(params) => (
          <TextField
            {...params}
            label="City"
            value={cityInput}
            onChange={(e) => setCityInput(e.target.value)} // Update the cityInput state when the input value changes
          />
        )}
        className="search-input"
      />
      <Button
        variant="contained"
        onClick={() => {
          if (selectedCity) {
            handleSearch(selectedCity); // Call the handleSearch function with the selectedCity when the button is clicked
            setCityInput(''); // Reset the cityInput state
            setSelectedCity(null); // Reset the selectedCity state
          }
        }}
        className="search-button"
      >
        Search
      </Button>
    </div>
  );
}

// Export the WeatherSearchBar component
export default WeatherSearchBar;
