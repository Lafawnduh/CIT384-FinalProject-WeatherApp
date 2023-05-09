// Import necessary libraries
import React from 'react';

// WeatherTips component
function WeatherTips({ temperature, weatherCondition }) {
  // Function to generate a weather tip based on temperature and weather condition
  function generateWeatherTip(temperature, weatherCondition) {
    let tip = '';

    // Determine the appropriate clothing tip based on the temperature
    if (temperature < 40) {
      tip = "It's pretty cold outside. Make sure to wear a warm coat.";
    } else if (temperature >= 40 && temperature < 60) {
      tip = "It's a bit chilly today. A light sweater or jacket should be enough to keep you warm.";
    } else if (temperature >= 60 && temperature < 80) {
      tip = "The weather is quite nice. You should be comfortable in a t-shirt and shorts or light pants.";
    } else {
      tip = "It's hot outside. Stay cool with lightweight clothing and drink plenty of water.";
    }

    // Append tips for specific weather conditions
    if (
      weatherCondition === "Rain" ||
      weatherCondition === "Drizzle" ||
      weatherCondition === "Thunderstorm"
    ) {
      tip += " Don't forget your umbrella, as it's raining.";
    } else if (weatherCondition === "Snow") {
      tip +=
        " Be prepared for snowy conditions. Wear warm boots and be cautious while walking or driving.";
    }

    return tip;
  }

  return (
    // Display the generated weather tip
    <p id="weatherTip">
      <b>Weather Tip: </b>
      {generateWeatherTip(temperature, weatherCondition)}
    </p>
  );
}

// Export the WeatherTips component
export default WeatherTips;
