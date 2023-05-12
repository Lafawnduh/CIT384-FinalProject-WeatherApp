// Import necessary libraries and components
import React, { useState } from 'react';
import './App.css';
import NewsArticles from './components/NewsArticles';
import DailyForecast from './components/DailyForecast';
import WeatherSearchBar from './components/WeatherSearchBar';
import HourlyForecast from './components/HourlyForecast';
import CurrentWeather from './components/CurrentWeather';
import SlideShow from './components/SlideShow';

// App component
function App() {
  // Initialize state variables for the city, city input, and selected city
  const [city, setCity] = useState('Northridge');
  const [cityInput, setCityInput] = useState('');
  const [selectedCity, setSelectedCity] = useState({
    name: 'Northridge',
    state: 'California',
    country: 'US',
    lat: 34.2345615,
    lon: -118.5369316,
  });

  // Images for the slideshow
  const images = [
    process.env.PUBLIC_URL + '/CSUN-image-1.jpg',
    process.env.PUBLIC_URL + '/CSUN-image-2.jpg',
    process.env.PUBLIC_URL + '/CSUN-image-3.jpg',
  ];

  // Function to handle searching for a city and updating state variables
  function handleSearch(city) {
    setSelectedCity(city);
    // Update the city variable with the entire string that includes the city name, state, and country
    setCity(`${city.name} ${city.state}`);
  }

  return (
    // Render the components within the App component
    <div className="App">
      <SlideShow images={images} />

      <CurrentWeather selectedCity={selectedCity} />

      <WeatherSearchBar
        cityInput={cityInput}
        setCityInput={setCityInput}
        handleSearch={handleSearch}
      /><br></br>

      <HourlyForecast selectedCity={selectedCity} />

      <NewsArticles city={city} />

      <DailyForecast selectedCity={selectedCity} />
    </div>
  );
}

// Export the App component
export default App;
