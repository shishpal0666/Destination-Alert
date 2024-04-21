import React, { useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Custom icon for marker
const icon = L.icon({
    iconUrl: "./resources/gps-search.png",
    iconSize: [30, 30],
});

// Default position for the map
const position = [18.464, 73.834];

// Component to reset map view based on selected position
function ResetCenterView(props) {
    const { selectPosition } = props;
    const map = useMap();

    useEffect(() => {
        // Update map view if a position is selected and map is available
        if (selectPosition && map) {
            map.setView(
                L.latLng(selectPosition?.lat, selectPosition?.lon),
                map.getZoom(),
                {
                    animate: true
                }
            )
        }
    }, [selectPosition, map]); // Update when selectPosition or map changes

    return null;
}

// Maps component displaying Leaflet map with selected position marker
function Maps(props) {
    const { selectPosition } = props;
    const locationSelection = [selectPosition?.lat, selectPosition?.lon];

    return (
        <div className="maps">
            {/* Leaflet MapContainer */}
            <MapContainer center={position} zoom={15} style={{ width: "100%", height: "100%" }}>
                {/* OpenStreetMap TileLayer */}
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {/* Marker for the selected position */}
                {selectPosition && (
                    <Marker position={locationSelection} icon={icon}>
                        <Popup>
                            A pretty CSS3 popup. <br /> Easily customizable.
                        </Popup>
                    </Marker>
                )}
                {/* Component to reset map view */}
                <ResetCenterView selectPosition={selectPosition} />
            </MapContainer>
        </div>
    );
}

export default Maps;
