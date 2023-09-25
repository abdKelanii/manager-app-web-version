import React, { useState } from "react";
import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";
import { useDispatch } from "react-redux";
import {
  setCoordinatesLat,
  setCoordinatesLong,
} from "../redux/stepper/detailsSlice";
import "leaflet/dist/leaflet.css";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon.src,
  iconRetinaUrl: markerIcon2x.src,
  shadowUrl: markerShadow.src,
});

const Map = () => {
  const [selectedCoordinates, setSelectedCoordinates] = useState(null);
  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);

  const dispatch = useDispatch();

  const handleMapClick = (e) => {
    const coordinates = {
      GPS: {
        Lat: e.latlng.lat,
        Long: e.latlng.lng,
      },
    };
    setSelectedCoordinates(coordinates);
    setLat(coordinates.GPS.Lat);
    setLong(coordinates.GPS.Long);
    dispatch(setCoordinatesLat(lat));
    dispatch(setCoordinatesLong(long));
  };

  function ClickHandler() {
    useMapEvents({
      click: handleMapClick,
    });
    return null;
  }

  return (
    <MapContainer
      center={[51, -0.09]}
      zoom={4}
      scrollWheelZoom={true}
      className="h-[35vh] rounded-lg"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <ClickHandler />
      {selectedCoordinates &&
        selectedCoordinates.GPS.Lat &&
        selectedCoordinates.GPS.Long && (
          <Marker
            position={[
              selectedCoordinates.GPS.Lat,
              selectedCoordinates.GPS.Long,
            ]}
          />
        )}
    </MapContainer>
  );
};
export default Map;
