// Function to get URL parameters
function getUrlParam(paramName) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get(paramName);
}

var audio = new Audio("../resources/sounds/DestinationAlert.mp3");

// Get the latitude and longitude values from URL parameters
const lat = Number(getUrlParam('lat'));
const lon = Number(getUrlParam('lon'));
const AlertDistance = Number(getUrlParam('distance'));
const startLat = Number(getUrlParam('userLat'));
const startLon = Number(getUrlParam('userLon'));
const destinationAddress = getUrlParam('destinationAddress');

// Update the HTML content of the destination-details div with start distance
const address = document.querySelector('.address');
address.innerHTML = `<p>Destination Address: ${destinationAddress}</p>`;

// Function to calculate distance from start coordinates to destination coordinates
const totalDistance = getDistanceFromLatLonInKm(startLat, startLon, lat, lon);
const totalAlertDistance = totalDistance - AlertDistance;

// Function to calculate distance between two coordinates using Haversine formula
function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1); // deg2rad below
    const dLon = deg2rad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d;
}

function deg2rad(deg) {
    return deg * (Math.PI / 180);
}

// Function to get user's current location
function getCurrentLocation() {
    return new Promise((resolve, reject) => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(position => {
                resolve({ latitude: position.coords.latitude, longitude: position.coords.longitude });
            }, error => {
                reject(error);
            });
        } else {
            reject(new Error("Geolocation is not supported by this browser."));
        }
    });
}

// Check user's distance from destination periodically
const intervalId = setInterval(() => {
    getCurrentLocation().then(userLocation => {
        const remainingDistance = getDistanceFromLatLonInKm(userLocation.latitude, userLocation.longitude, lat, lon);
        const remainingAlertDistance = remainingDistance - AlertDistance;

        const movedPercentage = ((totalAlertDistance - remainingAlertDistance) / totalAlertDistance) * 100;
        const pixelDistance = document.querySelector('.destination-point').offsetLeft - document.querySelector('.start-point').offsetLeft - 40;

        if (movedPercentage > 0 && movedPercentage <= 100) {
            // Position user point on the dotted line
            const dottedLine = document.querySelector('.dotted-line');
            const startOffset = 30; // Offset of the start point from the left
            const userPoint = document.querySelector('.user-point');
            const newPosition = startOffset + Math.round(pixelDistance * movedPercentage / 100);
            userPoint.style.left = `${newPosition}px`;
        } else if (movedPercentage > 100) {
            // Position user point at the end of the dotted line
            const userPoint = document.querySelector('.user-point');
            const newPosition = 30 + pixelDistance;
            userPoint.style.left = `${newPosition}px`;
        }

        if (remainingAlertDistance <= 0) {
            // User is within the alert remainingDistance
            audio.play();
            clearInterval(intervalId);
        }
    }).catch(error => {
        console.error("Error getting user location:", error.message);
    });
}, 5000); // Check every 5 seconds

// Event listener to stop the audio
document.getElementById('stop').addEventListener('click', stopsound);
function stopsound() {
    audio.pause();
}
