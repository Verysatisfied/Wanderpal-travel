import React from "react";
import styled from "styled-components";
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
import { FaBell } from "react-icons/fa"; // Assuming you use react-icons for the bell icon
import { toast } from "react-toastify";

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

export const TopLeftContainer = styled.div`
  margin: 20px;
  padding: 10px;
`;
export const NotificationButton = styled.button`
  background: #faa935;
  color: white;
  border: none;
  padding: 8px 16px;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  &:hover {
    background-color: #e89c30; // Darker shade for hover effect
  }
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
  const handleNotificationToggle = () => {
    // Toggle the state of the notifications (pseudo-implementation)
    toast.info("Weather notifications are now on.");
  };

  const isDay = weather?.weather[0].icon?.includes("d");
  const getTime = (timeStamp) => {
    return `${new Date(timeStamp * 1000).getHours()} : ${new Date(
      timeStamp * 1000
    ).getMinutes()}`;
  };

  return (
    <>
      <TopLeftContainer>
        <NotificationButton onClick={handleNotificationToggle}>
          <FaBell />
          Turn weather change notifications
        </NotificationButton>
      </TopLeftContainer>
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
