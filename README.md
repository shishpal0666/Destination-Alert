# Destination Alert System

The Destination Alert System is a web-based application designed to help users track their journey to a specified destination by providing real-time alerts as they approach. This project leverages geolocation and mapping technologies to ensure users are notified when they are within a certain distance from their target destination.

## Features

- **Real-time Location Tracking:** The application tracks the user's location in real-time using the browser's geolocation feature.
- **Interactive Map:** Displays an interactive map using Leaflet, allowing users to visualize their route and destination.
- **Customizable Alerts:** Users can set a destination and receive alerts when they are within a specified distance from it.
- **Distance Calculation:** Utilizes the Haversine formula to calculate the distance between the user's current location and the destination.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **Leaflet**: An open-source JavaScript library for mobile-friendly interactive maps.
- **Nominatim API**: A geocoding service for converting coordinates into addresses.
- **JavaScript**: The programming language used for implementing logic and interactivity.
- **HTML & CSS**: Used for structuring and styling the web application.

## Installation

To run the project locally, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/destination-alert-system.git
   cd destination-alert-system
2. **Install dependencies:**

   ```bash
   npm install
   ```
3. **Start the development server:**
   ```bash
   npm start
   ```
4. **Open your browser and navigate to:**

   http://localhost:3000

## Usage
   Set Your Destination: Enter the name or coordinates of your destination in the input field.
   The map will update to show the destination.

   
   Track Your Location: Allow the application to access your location.
   The map will display your real-time location.

