import React, { useState } from "react";
import "./App.css";
import List from "./component/List/List";

function App() {
  const [trips, setTrips] = useState([]);

  const handleAddTrip = (newTrip) => {
    setTrips([...trips, newTrip]);
  };

  return (
    <div className="App">
      <div className="main-container">
        <List trips={trips} onAddTrip={handleAddTrip} />
      </div>
    </div>
  );
}

export default App;
