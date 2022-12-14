import React, { useState, useEffect, useRef } from "react";
import MySlider from "../components/MySlider";
import Podium from "../components/Podium";
import PodiumData from "../components/PodiumData";
import "../App.css";
import Intro from "../components/Intro";
import FeaturedBusiness from "../components/FeaturedBusiness";
import "./HomeView.css";

//map stuff
import { getHome } from "../helpers/geoLocation";
import AddressForm from "../components/AddressForm";
import MarkerTable from "../components/MarkerTable";
import MarkerMap from "../components/MarkerMap";
import { geocode } from "../helpers/geo-opencage";

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

  const [listShops, setListShops] = useState([]);

  //map app
  useEffect(() => {
    getAndSetHome();
    // getAndSetShops();
  }, []);

  //maps
  async function getAndSetHome() {
    let latLng = await getHome(); // returns [lat, lng]
    setHome(latLng);
  }
  // async function addMarkerForAddress(addr) {
  //   // Send a request to OpenCage to geocode 'addr'
  //   let myresponse = await geocode(addr);
  //   if (myresponse.ok) {
  //     if (myresponse.data.latLng) {
  //       // Create new 'place' obj
  //       let d = myresponse.data;
  //       let newShop = {
  //         latLng: d.latLng,
  //         input_address: addr,
  //         formatted_address: d.formatted_address,
  //       };
  //       // Add it to 'places' state
  //       setShops((shops) => [...shops, newShop]);
  //     } else {
  //       console.log("addMarkerForAddress(): no results found");
  //     }
  //   } else {
  //     console.log("addMarkerForAddress(): response.error:", myresponse.error);
  //   }
  // }

  // useEffect(() => {
  //   fetch("/shops")
  //     .then((res) => res.json())
  //     .then((json) => {
  //       setShops(json);
  //     })
  //     .catch((error) => {});
  // }, []);

  // useEffect(() => {
  //   fetch("/shops?products= scarf,coffee")
  //     .then((res) => res.json())
  //     .then((json) => {
  //       setListShops(json);
  //     })
  //     .catch((error) => {});
  // }, []);

  //Get /shops?product=scarf,sponge

  //    let latLng = await getShops(); // returns [lat, lng]
  //   //need fetch to get shops
  //    setShops(latLng);

  //   let listShops = shops.filter((p) => {
  //     return p.product_name.toLowerCase().includes(input.toLowerCase());
  //     // convert both product_name and input to lowercase so not case sensitive
  //   });
  //   setListShops(listShops); // "searchedByShop" state set to SingleShopView via ProductContext
  // }

  //Get /shops?product=scarf,sponge

  return (
    <div>
      <Intro />
      <br />
      <div classname="Congrats">
        <h2>Leaderboard</h2>
        <p className="para">
          Earn points and redeem prizes for shopping sustainably!
          <br />
          Check out our top sustainable shoppers.
        </p>
      </div>

      <Podium winners={PodiumData} />

      <MySlider />
      <FeaturedBusiness />
      <div className="Demo1View">
        <div className="row mb-5">
          <div className="col">
            <h1>Store Locations</h1>

            {/* <ol>
              <li>
                A <code>home</code> query parameter like:{" "}
                <code>http://localhost:3000?home=oslo</code>
              </li>
              <li>Allow the browser to determine your current location</li>
              <li>Use Plaça Catalunya in Barcelona as a last resort</li>
            </ol> */}
          </div>
          <h3 className="mt-4"> </h3>

          {/* <AddressForm
            addMarkerCb={(addr) => addMarkerForAddress(addr)}
            shops={shops}
          /> */}
        </div>

        <div className="col">
          {home && <MarkerMap shops={props.shops} home={home} zoom={13} />}
        </div>
        <br></br>
        {/* <MarkerTable places={places} /> */}
      </div>
    </div>
  );
}

export default HomeView;
