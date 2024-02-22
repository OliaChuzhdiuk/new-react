import React from "react";

function TripForecast({ selectedTrip }) {
  return (
    <div className="trip-forecast">
      <h2>Forecast</h2>
      {selectedTrip ? (
        <p>
          Display forecast for {selectedTrip.city} from {selectedTrip.startDate}{" "}
          to {selectedTrip.endDate}
        </p>
      ) : (
        <p>Select a trip to see the forecast</p>
      )}
    </div>
  );
}

export default TripForecast;
