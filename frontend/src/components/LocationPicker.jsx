import React, { useState, useEffect, useRef, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

/* ---------------- LEAFLET ICON FIX ---------------- */
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

/* =====================================================
   FARM LOCATION MARKER COMPONENT
===================================================== */
const FarmLocationMarker = ({ position, setPosition, setAddress }) => {

  const markerRef = useRef(null);

  /* -------- MAP CLICK HANDLER -------- */
  const map = useMapEvents({
    click(e) {
      setPosition(e.latlng);
      if (setAddress) {
        setAddress(`Lat: ${e.latlng.lat.toFixed(6)}, Lng: ${e.latlng.lng.toFixed(6)}`);
      }
    },
  });

  /* -------- MARKER DRAG HANDLER -------- */
  const eventHandlers = useMemo(() => ({
    dragend() {
      const marker = markerRef.current;
      if (marker) {
        const newPos = marker.getLatLng();
        setPosition(newPos);
        if (setAddress) {
          setAddress(`Lat: ${newPos.lat.toFixed(6)}, Lng: ${newPos.lng.toFixed(6)}`);
        }
      }
    },
  }), [setPosition, setAddress]);

  /* -------- CENTER MAP ON LOCATION -------- */
  useEffect(() => {
    if (position) {
      map.flyTo(position, map.getZoom());
    }
  }, [position, map]);

  if (!position) return null;

  return (
    <Marker
      position={position}
      draggable
      eventHandlers={eventHandlers}
      ref={markerRef}
    >
      <Popup>
        🌾 Selected Farm Location
        <br />
        Drag marker to refine field position
      </Popup>
    </Marker>
  );
};

/* =====================================================
   MAIN LOCATION PICKER COMPONENT
===================================================== */
const LocationPicker = ({ onLocationSelect, initialLocation }) => {

  const [position, setPosition] = useState(null);

  /* -------- DEFAULT MAP CENTER (INDIA) -------- */
  const defaultCenter = [20.5937, 78.9629];

  /* -------- HANDLE LOCATION CHANGE -------- */
  const handleSetPosition = (pos) => {
    setPosition(pos);
    if (onLocationSelect) {
      onLocationSelect(`${pos.lat.toFixed(6)}, ${pos.lng.toFixed(6)}`);
    }
  };

  /* -------- LOCATE FARM USING GPS -------- */
  const handleLocateFarm = (e) => {
    e.preventDefault();

    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        handleSetPosition({ lat: latitude, lng: longitude });
      },
      (err) => {
        console.error('Location error:', err);
        alert('Unable to fetch location. Please allow GPS access.');
      }
    );
  };

  return (
    <div className="flex flex-col gap-3">

      {/* -------- MAP CONTAINER -------- */}
      <div className="h-64 w-full rounded-xl overflow-hidden border border-green-300 relative">
        <MapContainer
          center={defaultCenter}
          zoom={5}
          scrollWheelZoom={true}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <FarmLocationMarker
            position={position}
            setPosition={handleSetPosition}
          />
        </MapContainer>
      </div>

      {/* -------- LOCATE BUTTON -------- */}
      <button
        type="button"
        onClick={handleLocateFarm}
        className="self-start bg-green-100 hover:bg-green-200 text-green-800 text-xs px-4 py-2 rounded-lg border border-green-300 font-semibold flex items-center"
      >
        📍 Locate My Farm
      </button>

      {/* -------- HELPER TEXT -------- */}
      <p className="text-xs text-gray-500">
        Click on the map or drag the marker to mark the exact farm or field location.
      </p>

    </div>
  );
};

export default LocationPicker;
