import React, { useState } from 'react';
import './App.css';
import NewsAPI from './NewsAPI';
import DailyForecast from './DailyForecast';
import WeatherSearchBar from './WeatherSearchBar';
import HourlyForecast from './HourlyForecast';
import CurrentWeather from './CurrentWeather';

function App() {
  const [city, setCity] = useState('Los Angeles');
  const [cityInput, setCityInput] = useState('');
  const [selectedCity, setSelectedCity] = useState({
    name: 'Los Angeles',
    state: 'CA',
    country: 'US',
    lat: 34.0536909,
    lon: -118.242766,
  });

  function handleSearch(city) {
    setSelectedCity(city);
    // Update the city variable with the entire string that includes the city name, state, and country
    setCity(`${city.name} ${city.state} ${city.country}`);
  }

  return (
    <div className="App">
      <CurrentWeather selectedCity={selectedCity}/>
      
      <WeatherSearchBar
        cityInput={cityInput}
        setCityInput={setCityInput}
        handleSearch={handleSearch}
      /><br></br>

      <HourlyForecast selectedCity={selectedCity} />

      <NewsAPI city={city} />

      <DailyForecast selectedCity={selectedCity} />
    </div>
  );
}

export default App;
