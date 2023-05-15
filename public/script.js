function displayWeatherData() {
    const apiUrl =
      'https://api.openweathermap.org/data/3.0/onecall?lat=34.2345615&lon=-118.5369316&exclude=minutely,hourly,daily,alerts&units=imperial&appid=31ebf19b38a7f34d4735fa6505384d76';
  
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
  