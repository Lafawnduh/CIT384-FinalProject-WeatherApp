import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function WeatherSearchBar({ cityInput, setCityInput, handleSearch }) {
  return (
    <div>
      <TextField
        label="City"
        value={cityInput}
        onChange={(e) => setCityInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.keyCode === 13 && cityInput) {
            handleSearch(cityInput);
            setCityInput('');
          }
        }}
      />
      <Button
        variant="contained"
        onClick={() => {
          if (cityInput) {
            handleSearch(cityInput);
            setCityInput('');
          }
        }}
      >
        Search
      </Button>
    </div>
  );
}

export default WeatherSearchBar;
