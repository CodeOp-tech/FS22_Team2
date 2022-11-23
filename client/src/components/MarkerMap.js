import { React, useState, useContext } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { breakAddr } from "../helpers/utils";

//import dummylocations from "./dummylocations";

// Global Leaflet variable; only necessary for the green marker.
// Everything else is provided by React Leaflet
const L = window.L;

function MarkerMap(props) {
  // By default Leaflet only comes with blue markers. We want green too!
  // https://github.com/pointhi/leaflet-color-markers
  let greenMarker = new L.icon({
    iconUrl:
      "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    nameAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  return (
    <MapContainer
      className="MarkerMap"
      // center={[41.390205, 2.154007]}
      center={props.home}
      // center={(41.390205, 2.154007)}
      zoom={props.zoom}
      // zoom={12}
      style={{ height: "500px" }} // you MUST specify map height, else it will be 0!
    >
      {/* Create the tile layer that shows the map */}
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Draw the green "YOU ARE HERE" marker */}

      {/* <Marker position={[41.390205, 2.154007]} icon={greenMarker}>
        <Popup>YOU ARE HERE</Popup>
      </Marker> */}

      {/* Draw a blue marker for each of the places passed as prop */}
      {/* {props.places.map((p) => (
        <Marker key={p.input_address} position={p.latLng}> */}
      {/* {props.home && (
        <Marker position={props.home} icon={greenMarker}>
          <Popup>YOU ARE HERE</Popup>
        </Marker>
      )} */}

      {props.shops.map((p) => (
        <Marker
          key={p.shop_name}
          position={[p.latitude, p.longitude]}
          icon={greenMarker}
        >
          <Popup>{breakAddr(p.shop_name)}</Popup>
        </Marker>
      ))}
      {/* <h1>{this.props.stadium.name}</h1> */}
    </MapContainer>
  );
}

export default MarkerMap;
