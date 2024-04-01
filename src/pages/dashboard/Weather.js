import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CityComponent from "../../components/CityComponent";
import WeatherComponent from "../../components/WeatherComponent";
import ForecastComponent from "../../components/ForecastComponent";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  padding: 20px 10px;
  margin: auto;
  border-radius: 4px;
  box-shadow: 0 3px 6px 0 #555;
  background: white;
  font-family: Montserrat;
`;

function Weather() {
  const [city, updateCity] = useState("");
  const [weather, updateWeather] = useState(null);
  const [forecastWeather, updateForecastWeather] = useState(null);
  const [searchClicked, setSearchClicked] = useState(false); // Track if search button clicked

  const fetchForecastWeather = async () => {
    try {
      const response = await Axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=fe4feefa8543e06d4f3c66d92c61b69c`
      );
      updateForecastWeather(response.data);
    } catch (error) {
      toast.error("City not found. Please enter a valid city name.");
    }
  };

  const fetchWeather = async (e) => {
    e.preventDefault();
    setSearchClicked(true); // Set search button clicked
    if (!city) {
      return;
    }
    try {
      const response = await Axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=fe4feefa8543e06d4f3c66d92c61b69c`
      );
      updateWeather(response.data);
      fetchForecastWeather(); // Fetch forecast weather after fetching current weather
    } catch (error) {
      toast.error("City not found. Please enter a valid city name.");
    }
  };

  const clearWeather = () => {
    updateWeather(null);
    updateForecastWeather(null);
    setSearchClicked(false); // Reset search button clicked
  };

  return (
    <Container>
      {weather ? (
        <>
          <WeatherComponent
            weather={weather}
            city={city}
            goBack={clearWeather}
          />
          {forecastWeather && (
            <ForecastComponent
              forecastWeather={forecastWeather}
              goBack={clearWeather}
            />
          )}
        </>
      ) : (
        <CityComponent
          updateCity={updateCity}
          fetchWeather={fetchWeather}
          searchClicked={searchClicked} // Pass searchClicked state to CityComponent
        />
      )}
    </Container>
  );
}

export default Weather;
