import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import s from "./Card.module.css";
import cardImage from "./Foto.jpg";

const Card = ({ trip, onSelectTrip }) => {
  const handleClick = () => {
    onSelectTrip(trip.city);
  };

  const { city, startDate, endDate } = trip;

  const calculateTimeRemaining = useCallback(() => {
    const now = new Date();
    const startTime = new Date(startDate);
    const timeRemaining = startTime - now;
    if (timeRemaining <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor(
      (timeRemaining % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  }, [startDate]);

  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    setTimeRemaining(calculateTimeRemaining());
    const timer = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [startDate, calculateTimeRemaining]);
  return (
    <div className={s.card} onClick={handleClick}>
      <img src={cardImage} alt={`${city} Trip`} className={s.cardImage} />
      <div className={s.cardInfo}>
        <h3 className={s.cardTitle}>{city}</h3>
        <p className={s.cardDate}>{`${startDate} - ${endDate}`}</p>
        <div className={s.countdown}>
          <p>Countdown:</p>
          <p>{`${timeRemaining.days}d ${timeRemaining.hours}h ${timeRemaining.minutes}m ${timeRemaining.seconds}s`}</p>
        </div>
      </div>
    </div>
  );
};

Card.propTypes = {
  trip: PropTypes.object.isRequired,
  onSelectTrip: PropTypes.func.isRequired,
};

export default Card;
