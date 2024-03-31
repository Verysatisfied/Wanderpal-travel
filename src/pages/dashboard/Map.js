import React, { useState, useRef } from "react";
import { useEffect } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import styled from "styled-components";
function Routing({ startCoords, endCoords }) {
  const map = useMap();
  useEffect(() => {
    if (!map) return;
    const routingControl = L.Routing.control({
      waypoints: [L.latLng(...startCoords), L.latLng(...endCoords)],
      routeWhileDragging: true,
    }).addTo(map);
    return () => routingControl.remove();
  }, [map, startCoords, endCoords]);
  return null;
}
function TravelMap() {
  const defaultStart = [51.897426, -8.486562]; // Fitzgerald's Park
  const defaultEnd = [51.8928, -8.4894]; // University College Cork
  const [startLocation, setStartLocation] = useState("");
  const [endLocation, setEndLocation] = useState("");
  const [route, setRoute] = useState({ start: defaultStart, end: defaultEnd });
  const mapRef = useRef(null);
  // 地理编码函数
  const geocodeLocation = async (locationName) => {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${locationName}`
    );
    const data = await response.json();
    if (data && data.length > 0) {
      return [data[0].lat, data[0].lon];
    }
    return null;
  };
  // 处理“搜索”按钮点击事件
  const handleSearch = async (e) => {
    e.preventDefault();
    const startCoords = await geocodeLocation(startLocation);
    const endCoords = await geocodeLocation(endLocation);
    if (startCoords && endCoords) {
      setRoute({ start: startCoords, end: endCoords });
      mapRef.current.flyTo(startCoords, 13); // 将地图中心移动到起点
    }
  };
  return (
    <>
      <Form onSubmit={handleSearch}>
        <Input
          type="text"
          value={startLocation}
          onChange={(e) => setStartLocation(e.target.value)}
          placeholder="Start Location"
        />
        <Input
          type="text"
          value={endLocation}
          onChange={(e) => setEndLocation(e.target.value)}
          placeholder="End Location"
        />

        <SearchButton type="submit">Search</SearchButton>
      </Form>
      <MapContainer
        center={[51.505, -0.09]} // 初始中心点，您可以更改为科克市或其他位置
        zoom={13}
        style={{ height: "100vh", width: "100%" }}
        whenCreated={(mapInstance) => (mapRef.current = mapInstance)}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {route.start && route.end && (
          <Routing
            startCoords={route.start.map(Number)}
            endCoords={route.end.map(Number)}
          />
        )}
      </MapContainer>
    </>
  );
}
export default TravelMap;

const SearchButton = styled.button`
  background-color: #faa935;
  color: white;
  padding: 10px 10px; /* Adjust padding to add space on the left */
  margin-left: 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: gold; /* Change hover color */
  }
`;

const Form = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;

const Input = styled.input`
  padding: 10px;
  margin-right: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;
