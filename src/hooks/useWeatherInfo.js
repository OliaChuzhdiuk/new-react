import { useState, useEffect } from "react";

const useWeatherInfo = (city) => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const YOUR_API_KEY = "2FVWKLWMHS84HNRY56NJX2J6W";
        const startDate = new Date("2024-02-20");
        const endDate = new Date("2024-02-25");

        const startDateString = startDate.toISOString().split("T")[0];
        const endDateString = endDate.toISOString().split("T")[0];

        const apiUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(
          city
        )}/${startDateString}/${endDateString}?unitGroup=metric&include=days&key=${YOUR_API_KEY}&contentType=json`;

        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`Weather API error: ${response.status}`);
        }

        const data = await response.json();

        setWeatherData(data);
      } catch (error) {
        setWeatherData(null);
      }
    };

    fetchData();
  }, [city]);

  return weatherData;
};

export default useWeatherInfo;
