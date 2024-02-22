import React from "react";
import useWeatherInfo from "../../hooks/useWeatherInfo";
import s from "./WeatherInfo.module.css";

function WeatherInfo({ city }) {
  const weatherData = useWeatherInfo(city);

  if (!weatherData || !weatherData.days) {
    return <div>Loading...</div>;
  }

  const { days } = weatherData;
  const getWeatherIcon = (condition) => {
    const conditionsArray = condition.toLowerCase().split(", ");
    switch (conditionsArray[0]) {
      case "partly cloudy":
        return "https://openweathermap.org/img/wn/02d.png";
      case "cloudy":
        return "https://openweathermap.org/img/wn/04d.png";
      case "clear":
        return "https://openweathermap.org/img/wn/01d.png";
      case "rain":
        return "https://openweathermap.org/img/wn/10d.png";
      default:
        return "https://openweathermap.org/img/wn/01d.png";
    }
  };

  return (
    <div className={s.weatherInfoCards}>
      <ul className={s.weatherInfo}>
        {days.map((day) => (
          <li key={day.datetime} className={s.weatherDay}>
            <img src={getWeatherIcon(day.conditions)} alt={day.conditions} />
            <p>
              {new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(
                new Date(day.datetime)
              )}
              , {day.tempmax}°C/{day.tempmin}°C,
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default WeatherInfo;
