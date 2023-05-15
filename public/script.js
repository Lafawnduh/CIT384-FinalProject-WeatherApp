function displayWeatherData() {
    const apiUrl =
      'https://api.openweathermap.org/data/3.0/onecall?lat=34.2345615&lon=-118.5369316&exclude=minutely,hourly,daily,alerts&units=imperial&appid=ddf1d8d0b94403ae257d9095b4ebe01b';
  
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        const responseContainer = document.getElementById('response-container');
        responseContainer.textContent = JSON.stringify(data, null, 2);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  
  window.addEventListener('load', displayWeatherData);
  