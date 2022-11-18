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
  const [home, setHome] = useState(null); // center of map //useState 17
  const [currView, setCurrView] = useState("homeV"); //useState 18

  //map app
  useEffect(() => {
    getAndSetHome();
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
        let newPlace = {
          latLng: d.latLng,
          input_address: addr,
          formatted_address: d.formatted_address,
        };
        // Add it to 'places' state
        setPlace((places) => [...places, newPlace]);
      } else {
        console.log("addMarkerForAddress(): no results found");
      }
    } else {
      console.log("addMarkerForAddress(): response.error:", myresponse.error);
    }
  }

  return (
    <div>
      <h1>Home!</h1>
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
            <h3>1. Set Home</h3>
            <p>
              The map will be centered and the "home" (green) marker will be
              determined by one of these:
            </p>
            <ol>
              <li>
                A <code>home</code> query parameter like:{" "}
                <code>http://localhost:3000?home=oslo</code>
              </li>
              <li>Allow the browser to determine your current location</li>
              <li>Use Plaça Catalunya in Barcelona as a last resort</li>
            </ol>

            <h3 className="mt-4">2. Add Markers</h3>
            <p>Enter an address to add a blue marker on the map</p>
            <AddressForm addMarkerCb={(addr) => addMarkerForAddress(addr)} />
          </div>

          <div className="col">
            {props.home && (
              <MarkerMap places={places} home={props.home} zoom={13} />
            )}
          </div>
        </div>

        <MarkerTable places={places} />
      </div>
    </div>
  );
}
export default HomeView;
