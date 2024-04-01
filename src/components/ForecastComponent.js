import React from "react";
import styled from "styled-components";
import { FaTint, FaWind } from "react-icons/fa";
import { FaCalendarAlt, FaThermometerHalf, FaCloudRain } from "react-icons/fa"; // Import icons
import { FaArrowLeft } from "react-icons/fa"; // Import the back arrow icon

// Styled Components
const ForecastContainer = styled.div`
  margin-top: 60px; /* 增加标题的上边距 */
`;

const ForecastTitle = styled.h2`
  margin-bottom: 30px; /* 增加标题的下边距 */
`;

const ForecastList = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const ForecastItem = styled.div`
  margin-bottom: 50px;
  padding: 35px; /* 调整预报项目的内边距 */
  border: 1px solid #ccc;
  border-radius: 10px; /* 增加预报项目的圆角 */
  width: calc(20% - 20px); // 设置每个预报项目的宽度
  box-sizing: border-box;

  @media (max-width: 768px) {
    width: calc(50% - 20px);
  }
  p {
    margin-bottom: 10px;
    white-space: nowrap;
  }
`;
const BackButton = styled.button`
  margin-top: 20px;
  padding: 8px 16px;
  background-color: #faa935;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: gold;
  }
`;
function ForecastComponent({ forecastWeather, goBack }) {
  const filteredForecast = forecastWeather.list.filter(
    (forecast, index) => index % 8 === 0
  );

  return (
    <ForecastContainer>
      <ForecastTitle>
        5-Day Forecast for {forecastWeather.city.name}
      </ForecastTitle>
      <ForecastList>
        {filteredForecast.map((forecast, index) => (
          <ForecastItem key={index}>
            <img
              src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`}
              alt={forecast.weather[0].description}
            />
            <p>
              <FaCalendarAlt /> {forecast.dt_txt.split(" ")[0]}
            </p>
            <p>
              <FaThermometerHalf />
              {Math.round(forecast.main.temp - 273.15)}°C
            </p>
            <p>
              <FaCloudRain /> Chance of Rain: {Math.round(forecast.pop * 100)}%
            </p>

            <div>
              <FaTint />
              <span>Humidity: {forecast.main.humidity}%</span>
            </div>
            <div>
              <FaWind />
              <span>Wind: {forecast.wind.speed} m/s</span>
            </div>
          </ForecastItem>
        ))}
      </ForecastList>{" "}
      <BackButton onClick={goBack}>
        <FaArrowLeft /> Back to Weather
      </BackButton>
    </ForecastContainer>
  );
}

export default ForecastComponent;
