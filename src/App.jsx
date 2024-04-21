import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import Maps from "./Maps";
import "./App.css";

function App() {
  const [selectPosition, setSelectPosition] = useState(null);
  const [distance, setDistance] = useState("");
  const [userCoordinates, setUserCoordinates] = useState(null);

  useEffect(() => {
    // Check if geolocation is supported by the browser
    if ("geolocation" in navigator) {
      // Get the user's current position
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserCoordinates({
            lat: position.coords.latitude,
            lon: position.coords.longitude
          });
        },
        (error) => {
          console.error("Error getting user coordinates:", error.message);
          // alert("Please enable location services to start the journey!");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  }, []); // Empty dependency array ensures the effect runs only once

  const handleStartJourney = () => {
    const distanceNumber = parseFloat(distance);
    
    if (isNaN(distanceNumber)) {
      alert("Please enter a valid decimal number for the distance to start the journey!");
    } else if (!selectPosition) {
      alert("Select your destination to start the journey !");
    } else if (!userCoordinates) {
      alert("Please enable location services to start the journey!");
    } else {
      // Redirect to the alert page with necessary parameters
      window.location.href = `./static/alertpage.html?lat=${selectPosition.lat}&lon=${selectPosition.lon}&userLat=${userCoordinates.lat}&userLon=${userCoordinates.lon}&distance=${distanceNumber}&destinationAddress=${selectPosition.display_name}`;
    }
  };

  return (
    <div className="in-root">
      <SearchBar selectPosition={selectPosition} setSelectPosition={setSelectPosition} />
      <Maps selectPosition={selectPosition} />
      <div className="alertpage">
        {/* Input field for entering alert distance */}
        <input
          className="alert-distance"
          type="text"
          placeholder="Enter alert distance in km"
          value={distance}
          onChange={(e) => setDistance(e.target.value)}
        />
        {/* Button to start the journey */}
        <button className="start-journey" onClick={handleStartJourney}>
          Start the Journey
        </button>
      </div>
    </div>
  );
}

export default App;
