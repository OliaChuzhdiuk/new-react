import React, { useEffect, useState } from "react";
import useWeatherInfo from "../../hooks/useWeatherInfo";

import s from "./AsideData.module.css";

function AsideData({ city }) {
  const [currentDay, setCurrentDay] = useState(null);
  const weatherData = useWeatherInfo(city);

  useEffect(() => {
    if (weatherData && weatherData.days && weatherData.days.length > 0) {
      const today = new Date().toISOString().split("T")[0];
      const currentDayData = weatherData.days.find(
        (day) => day.datetime === today
      );
      setCurrentDay(currentDayData || null);
    } else {
      setCurrentDay(null);
    }
  }, [weatherData, city]);

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
    <div className={s.container}>
      {currentDay ? (
        <div>
          <h3 className={s.cityName}>Today's Weather in {city}</h3>
          <div className={s.item}>
            <p className={s.day}>
              {new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(
                new Date(currentDay.datetime)
              )}
            </p>
            <div className={s.temp}>
              <img
                src={getWeatherIcon(currentDay.conditions)}
                alt={currentDay.conditions}
              />
              <p>
                {currentDay.tempmax}
                <sup>°C</sup>
              </p>
            </div>
            <p className={s.cityName}>{city}</p>
          </div>
        </div>
      ) : (
        <div className={s.error}>
          No valid weather data available for {city}
        </div>
      )}
    </div>
  );
}

export default AsideData;
