import React, { useState } from "react";

// Base URL for Nominatim API
const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org/search?";
// Default parameters for Nominatim API request
let params = {
    q: "",
    format: "json",
    addressdetails: "addressdetails",
};

// SearchBar component for location search functionality
function SearchBar(props) {
    const { selectPosition, setSelectPosition } = props;
    if(false){
        console.log(selectPosition);
    }
    // State variables
    const [results, setResults] = useState([]); // Stores search results
    const [input, setInput] = useState(""); // Stores user input

    // Function to fetch data from Nominatim API based on user input
    const fetchData = (value) => {
        // Update search parameters with user input
        params = {
            q: value,
            format: "json",
            addressdetails: 1,
            polygon_geojson: 0,
        };
        // Construct query string
        const queryString = new URLSearchParams(params).toString();
        // Define request options
        const requestOptions = {
            method: "GET",
            redirect: "follow",
        };

        // Fetch data from Nominatim API
        fetch(`${NOMINATIM_BASE_URL}${queryString}`, requestOptions)
            .then((response) => response.json())
            .then((json) => {
                // Filter results based on user input
                const result = json.filter((location) => {
                    return value && location && location.display_name && location.display_name.toLowerCase().includes(value.toLowerCase());
                });
                // Update search results state
                setResults(result);
            })
            .catch((err) => console.error("Error fetching data:", err));
    };

    // Handler for input change
    const handleChange = (value) => {
        setInput(value); // Update input state
        fetchData(value); // Fetch data based on input value
    };

    return (
        <div className="search">
            {/* Input field for location search */}
            <input
                className="searchbar"
                type="search"
                placeholder="Search the location"
                value={input}
                onChange={(e) => handleChange(e.target.value)} // Call handleChange on input change
            />
            {/* List to display search results */}
            <div className="result-list">
                {/* Map through search results and display them */}
                {results.map((result, id) => (
                    <div className="result-elements" key={id} onClick={() => setSelectPosition(result)}>
                        <img className="loc-img" src="./resources/gps-search.png" alt="" width={20} height={20} />
                        {result.display_name}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SearchBar;
