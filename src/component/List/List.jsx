import React, { useState } from "react";
import Card from "../Card/Card";
import AddModal from "../AddModal/AddModal";
import SearchForm from "../SearchForm/SearchForm";
import WeatherInfo from "../WeatherInfo/WeatherInfo";
import useWeatherInfo from "../../hooks/useWeatherInfo";
import AsideData from "../AsideData/AsideData";
import s from "./List.module.css";

function List() {
  const [searchData, setSearchData] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [trips, setTrips] = useState(() => {
    const storedTrips = localStorage.getItem("trips");
    return storedTrips
      ? JSON.parse(storedTrips)
      : [
          {
            city: "New York",
            startDate: "2024-02-23",
            endDate: "2024-02-28",
          },
        ];
  });
  const [selectedCity, setSelectedCity] = useState("New York");
  const weatherData = useWeatherInfo(selectedCity);

  const cities = [
    "New York",
    "Paris",
    "London",
    "Berlin",
    "Madrid",
    "Dublin",
    "Prague",
    "Vienna",
    "Barcelona",
    "Warsaw",
    "Stockholm",
    "Zurich",
    "Helsinki",
  ];

  const handleAddTrip = (newTrip) => {
    setTrips([...trips, newTrip]);
    setModalOpen(false);
  };

  const handleCityChange = (city) => {
    setSelectedCity(city);
  };

  const filterTrips = (trip) => {
    const searchLowerCase = searchData.toLowerCase();
    return (
      trip.city.toLowerCase().includes(searchLowerCase) ||
      trip.startDate.toLowerCase().includes(searchLowerCase) ||
      trip.endDate.toLowerCase().includes(searchLowerCase)
    );
  };

  const filteredTrips = trips.filter(filterTrips);

  const handleSearchSubmit = (searchQuery) => {
    setSearchData(searchQuery.toLowerCase());
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className={s.tripList}>
      <h2 className={s.heading}>Weather forecast</h2>
      <SearchForm onSubmit={handleSearchSubmit} />
      <div className={s.flexContainer}>
        <div>
          <div className={s.cardsContainer}>
            {filteredTrips.map((trip, index) => (
              <Card
                key={index}
                trip={trip}
                onSelectTrip={() => handleCityChange(trip.city)}
              />
            ))}
            <button className={s.addButton} onClick={openModal}>
              <span className={s.plusSymbol}>+</span> Add Trip
            </button>
          </div>{" "}
          {selectedCity && weatherData && (
            <WeatherInfo
              city={selectedCity}
              onDataReceived={weatherData}
              condition={weatherData.conditions}
            />
          )}{" "}
        </div>

        <div className={s.asideData}>
          {selectedCity && weatherData && (
            <AsideData city={selectedCity} onDataReceived={weatherData} />
          )}
        </div>
      </div>

      {isModalOpen && (
        <AddModal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          onAddItem={handleAddTrip}
          title="Create Trip"
          options={cities}
        />
      )}
    </div>
  );
}

export default List;
