import React, { useState, useEffect, useRef } from "react";
import MySlider from "../components/MySlider";
import Podium from "../components/Podium";
import PodiumData from "../components/PodiumData";
import "../App.css";
import Intro from "../components/Intro";
import FeaturedBusiness from "../components/FeaturedBusiness";

//map stuff
import { getHome } from "../helpers/geoLocation";
import AddressForm from "../components/AddressForm";
import MarkerTable from "../components/MarkerTable";
import MarkerMap from "../components/MarkerMap";
import { geocode } from "../helpers/geo-opencage";
import SearchMaps from "../components/SearchMaps";


/*
A 'place' is an obj like this:
{
    latLng: [41.3874877, 2.1680296],
    input_address: 'placa catalunya, barcelona',
    formatted_address: 'Catalonia Square, Plaça de Catalunya, 08001 Barcelona, Spain'
}
*/

function HomeView(props) {
  const [places, setPlace] = useState([]);
  //maps below: app stuff
  const [home, setHome] = useState([41.390205, 2.154007]); // center of map //useState 17
  //const [currView, setCurrView] = useState("homeV"); //useState 18
  const [shops, setShops] = useState([]);
  const [listShops, setListShops] = useState([]);

  //map app
  useEffect(() => {
    getAndSetHome();
    getAndSetShops();
  }, []);

  //maps
  async function getAndSetHome() {
    let latLng = await getHome(); // returns [lat, lng]
    setHome(latLng);
  }
  async function addMarkerForAddress(addr) {
    // Send a request to OpenCage to geocode 'addr'
    let myresponse = await geocode(addr);
    if (myresponse.ok) {
      if (myresponse.data.latLng) {
        // Create new 'place' obj
        let d = myresponse.data;
        let newShop = {
          latLng: d.latLng,
          input_address: addr,
          formatted_address: d.formatted_address,
        };
        // Add it to 'places' state
        setShops((shops) => [...shops, newShop]);
      } else {
        console.log("addMarkerForAddress(): no results found");
      }
    } else {
      console.log("addMarkerForAddress(): response.error:", myresponse.error);
    }
  }

  useEffect(() => {
    fetch("/shops")
      .then((res) => res.json())
      .then((json) => {
        setShops(json);
      })
      .catch((error) => {});
  }, []);

  async function getAndSetShops() {
    //    let latLng = await getShops(); // returns [lat, lng]
    //   //need fetch to get shops
    //    setShops(latLng);
  }
  function searchMapCb(input) {
    let listShops = shops.filter((p) => {
      return p.product_name.toLowerCase().includes(input.toLowerCase());
      // convert both product_name and input to lowercase so not case sensitive
    });
    setListShops(listShops); // "searchedByShop" state set to SingleShopView via ProductContext
  }


  return (
    <div>

      <Intro />
      <h2>Congratulations To This Month's WINNERS!</h2>
      <br></br>

      <Podium winners={PodiumData} />
      <hr></hr>
      <MySlider />

      <FeaturedBusiness />
      <div className="Demo1View">
        <div className="row mb-5">
          <div className="col">
            <h3>Create Your Shopping List </h3>
            <p>Enter the products you need and plan your route</p>
            {/* <ol>
              <li>
                A <code>home</code> query parameter like:{" "}
                <code>http://localhost:3000?home=oslo</code>
              </li>
              <li>Allow the browser to determine your current location</li>
              <li>Use Plaça Catalunya in Barcelona as a last resort</li>
            </ol> */}

            <h3 className="mt-4"> Add Markers</h3>
            <p>Enter an address to add a blue marker on the map</p>
            <AddressForm
              addMarkerCb={(addr) => addMarkerForAddress(addr)}
              shops={shops}
            />
          </div>

          <div className="col">
            {home && <MarkerMap shops={shops} home={home} zoom={13} />}
          </div>
        </div>

        {/* <MarkerTable places={places} /> */}
      </div>

    </div>
  );
}
export default HomeView;
