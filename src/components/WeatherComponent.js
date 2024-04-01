import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import sunsetIcon from "../assets/icons/temp.svg";
import sunriseIcon from "../assets/icons/temp.svg";
import humidityIcon from "../assets/icons/humidity.svg";
import windIcon from "../assets/icons/wind.svg";
import pressureIcon from "../assets/icons/pressure.svg";
import sunnyIcon from "../assets/icons/sunny.svg";
import nightIcon from "../assets/icons/night.svg";
import dayIcon from "../assets/icons/day.svg";
import cloudyNightIcon from "../assets/icons/cloudy-night.svg";
import cloudyIcon from "../assets/icons/cloudy.svg";
import perfectDayIcon from "../assets/icons/perfect-day.svg";
import rainIcon from "../assets/icons/rain.svg";
import rainNightIcon from "../assets/icons/rain-night.svg";
import stormIcon from "../assets/icons/storm.svg";

export const WeatherInfoIcons = {
  sunset: sunsetIcon,
  sunrise: sunriseIcon,
  humidity: humidityIcon,
  wind: windIcon,
  pressure: pressureIcon,
};

export const WeatherIcons = {
  "01d": sunnyIcon,
  "01n": nightIcon,
  "02d": dayIcon,
  "02n": cloudyNightIcon,
  "03d": cloudyIcon,
  "03n": cloudyIcon,
  "04d": perfectDayIcon,
  "04n": cloudyNightIcon,
  "09d": rainIcon,
  "09n": rainNightIcon,
  "10d": rainIcon,
  "10n": rainNightIcon,
  "11d": stormIcon,
  "11n": stormIcon,
};

const Location = styled.span`
  margin: 15px auto;
  text-transform: capitalize;
  font-size: 28px;
  font-weight: bold;
`;
const Condition = styled.span`
  margin: 20px auto;
  text-transform: capitalize;
  font-size: 14px;
  & span {
    font-size: 28px;
  }
`;
const WeatherInfoLabel = styled.span`
  margin: 20px 25px 10px;
  text-transform: capitalize;
  text-align: start;
  width: 90%;
  font-weight: bold;
  font-size: 14px;
`;
const WeatherIcon = styled.img`
  width: 100px;
  height: 100px;
  margin: 5px auto;
`;
const WeatherContainer = styled.div`
  display: flex;
  width: 100%;
  margin: 30px auto;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const WeatherInfoContainer = styled.div`
  display: flex;
  width: 90%;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap;
`;
const InfoContainer = styled.div`
  display: flex;
  margin: 5px 10px;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`;
const InfoIcon = styled.img`
  width: 36px;
  height: 36px;
`;
const InfoLabel = styled.span`
  display: flex;
  flex-direction: column;
  font-size: 14px;
  margin: 15px;
  & span {
    font-size: 12px;
    text-transform: capitalize;
  }
`;
const BackButton = styled.button`
  margin: 20px auto;
  padding: 10px 20px;
  font-size: 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;
const WeatherInfoComponent = (props) => {
  const { name, value } = props;
  return (
    <InfoContainer>
      <InfoIcon src={WeatherInfoIcons[name]} />
      <InfoLabel>
        {value}
        <span>{name}</span>
      </InfoLabel>
    </InfoContainer>
  );
};
const WeatherComponent = (props) => {
  const { weather } = props;
  const isDay = weather?.weather[0].icon?.includes("d");
  const getTime = (timeStamp) => {
    return `${new Date(timeStamp * 1000).getHours()} : ${new Date(
      timeStamp * 1000
    ).getMinutes()}`;
  };

  return (
    <>
      <WeatherContainer>
        <Condition>
          <span>{`${Math.floor(weather?.main?.temp - 273)}°C`}</span>
          {`  |  ${weather?.weather[0].description}`}
        </Condition>
        <WeatherIcon src={WeatherIcons[weather?.weather[0].icon]} />
      </WeatherContainer>
      <Location>{`${weather?.name}, ${weather?.sys?.country}`}</Location>

      <WeatherInfoLabel>Weather Info</WeatherInfoLabel>
      <WeatherInfoContainer>
        <WeatherInfoComponent
          name={isDay ? "sunset" : "sunrise"}
          value={`${getTime(weather?.sys[isDay ? "sunset" : "sunrise"])}`}
        />
        <WeatherInfoComponent
          name={"humidity"}
          value={weather?.main?.humidity}
        />
        <WeatherInfoComponent name={"wind"} value={weather?.wind?.speed} />
        <WeatherInfoComponent
          name={"pressure"}
          value={weather?.main?.pressure}
        />
      </WeatherInfoContainer>
      {/* <BackButton onClick={() => window.history.back()}>Back</BackButton> */}
    </>
  );
};

export default WeatherComponent;