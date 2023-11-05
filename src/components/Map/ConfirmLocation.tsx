// SkopjeMap.tsx
import React, { useContext, useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L, { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";

import icon from "./constants";
import { GlobalContext } from "@/context/global_context";
import { Logo } from "../Logo/Logo";

const locations = [
  { lat: 41.986182, lng: 21.430158 },
  { lat: 41.992769, lng: 21.415588 },
];

const LocationMarker: React.FC = () => {
  const { location } = useContext(GlobalContext);
  const map = useMap();
  const [markerPos, setMarkerPos] = useState<LatLngExpression | null>(null);

  useEffect(() => {
    if (location) {
      const latLng: LatLngExpression = [location.latitude, location.longitude];
      console.log(latLng);
      setMarkerPos(latLng);
      map.flyTo(latLng, 18);
      const circle = L.circle(latLng, { radius: 100 });
      circle.addTo(map);
    }
  }, [location, map]);

  if (!location || !markerPos) return null;

  const handleDragEnd = (event: any) => {
    const newLatLng = event.target.getLatLng();
    if (markerPos) {
      const distance = map.distance(markerPos as LatLngExpression, newLatLng);
      if (distance > 100) {
        event.target.setLatLng(markerPos);
      } else {
        setMarkerPos(newLatLng);
      }
    }
  };

  return (
    <Marker
      draggable={true}
      position={markerPos as LatLngExpression}
      icon={icon as any}
      eventHandlers={{ dragend: handleDragEnd }}
    >
      <Popup>You are here.</Popup>
    </Marker>
  );
};

const SkopjeMap: React.FC = () => {
  const { location } = useContext(GlobalContext);
  const defaultLocation: [number, number] = [41.9965, 21.4314];
  const initialMapCenter: [number, number] =
    location?.latitude && location?.longitude
      ? [location.latitude, location.longitude]
      : defaultLocation;

  const renderedMarkers = locations.map((latLng,index) => (
    <Marker key={index} position={latLng as LatLngExpression} icon={icon as any}>
      <Popup>You are here.</Popup>
    </Marker>
  ));

  const [mapCenter, setMapCenter] =
    useState<[number, number]>(initialMapCenter);
  const [zoomLevel, setZoomLevel] = useState<number>(13);

  useEffect(() => {
    if (location) {
      setMapCenter([location.latitude, location.longitude]);
      setZoomLevel(20);
    }
  }, [location]);

  return (
    <>
      <Logo />
      <MapContainer
        center={mapCenter}
        zoom={zoomLevel}
        scrollWheelZoom
        style={{ height: "80vh", width: "100vw" }}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {location && <LocationMarker />}
        {location && renderedMarkers}
      </MapContainer>
    </>
  );
};

export default SkopjeMap;
