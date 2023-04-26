import React, { useState } from 'react';
import './App.css';
import NewsAPI from './NewsAPI';
import WeatherAPI from './WeatherAPI';
import WeatherSearchBar from './WeatherSearchBar';

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
    setCity(city.name);
  }

  return (
    <div className="App">
      <WeatherAPI selectedCity={selectedCity} />
      <WeatherSearchBar
        cityInput={cityInput}
        setCityInput={setCityInput}
        handleSearch={handleSearch}
      /><br></br>
      <NewsAPI city={city} />
    </div>
  );
}

export default App;
