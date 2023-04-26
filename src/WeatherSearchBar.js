import React, { useState, useEffect } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import config from './config';

function WeatherSearchBar({ cityInput, setCityInput, handleSearch }) {
  const [options, setOptions] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);

  useEffect(() => {
    if (cityInput.length > 2) {
      const fetchCities = async () => {
        const response = await fetch(
          `http://api.openweathermap.org/geo/1.0/direct?q=${cityInput}&limit=8&appid=${config.WEATHER_API_KEY}`
        );
        const data = await response.json();
        setOptions(data);
      };
      fetchCities();
    }
  }, [cityInput]);

  return (
    <div>
      <Autocomplete
        options={options}
        getOptionLabel={(option) => `${option.name}, ${option.state}, ${option.country}`}
        onChange={(event, value) => setSelectedCity(value)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="City"
            value={cityInput}
            onChange={(e) => setCityInput(e.target.value)}
          />
        )}
      />
      <Button
        variant="contained"
        onClick={() => {
          if (selectedCity) {
            handleSearch(selectedCity);
            setCityInput('');
            setSelectedCity(null);
          }
        }}
      >
        Search
      </Button>
    </div>
  );
}

export default WeatherSearchBar;
