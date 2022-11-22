// import React, { useEffect, useState } from "react";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// // import { useMap } from "react-leaflet/hooks";
// import "leaflet/dist/leaflet.css";
// // import L from "leaflet";
// // import { LatLngExpression } from "leaflet";
// import AddressForm from "./AddressForm";
// // import MarkerTable from "../components/MarkerTable";
// import MarkerMap from "./MarkerMap";
// import { geocode } from "../helpers/geo-opencage";

// const barcelona = [41.37861515964027, 2.1798093354905523];

// const TheMap = (props) => {
//   const [loactions, setLocations] = useState([]);

//   useEffect(() => {
//     fetch("/")
//       .then((res) => res.json())
//       .then((json) => {
//         setLocations(json);
//       })
//       .catch((error) => {});
//   }, []);

//   async function addMarkerForAddress(addr) {
//     let myresponse = await geocode(addr);
//     console.log(myresponse);
//     if (myresponse.ok) {
//       if (myresponse.data.latLng) {
//         // Create new 'location' obj
//         let d = myresponse.data;
//         let newLocataion = {
//           name: addr,
//           latitude: d.latLng[0],
//           longitude: d.latLng[1],

//           // formatted_address: d.formatted_address,
//         };
//       }
//     }
//   }
// };
// export default TheMap;
