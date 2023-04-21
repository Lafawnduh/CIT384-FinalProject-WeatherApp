import React, { useState } from 'react';
import './App.css';
import NewsAPI from './NewsAPI';
import WeatherAPI from './WeatherAPI';
import WeatherSearchBar from './WeatherSearchBar';

function App() {
  const [city, setCity] = useState('Los Angeles');
  const [cityInput, setCityInput] = useState('');

  function handleSearch(city) {
    setCity(city);
  }

  return (
    <div className="App">

      <WeatherAPI city={city} />
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
