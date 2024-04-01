import React, { useState } from "react";
import styled from "styled-components";
import Axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CityComponent from "../../components/CityComponent";
import WeatherComponent from "../../components/WeatherComponent";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 380px;
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

  const fetchWeather = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=fe4feefa8543e06d4f3c66d92c61b69c`
      );
      updateWeather(response.data);
    } catch (error) {
      toast.error("City not found. Please enter a valid city name.");
    }
  };

  const clearWeather = () => {
    updateWeather(null);
  };

  return (
    <Container>
      {weather ? (
        <WeatherComponent weather={weather} city={city} goBack={clearWeather} />
      ) : (
        <CityComponent updateCity={updateCity} fetchWeather={fetchWeather} />
      )}
    </Container>
  );
}

export default Weather;
