import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Api from "../helpers/Api";
//map stuff:
import { getHome } from "../helpers/geoLocation";
import AddressForm from "../components/AddressForm";
import MarkerTable from "../components/MarkerTable";
import MarkerMap from "../components/MarkerMap";
import { geocode } from "../helpers/geo-opencage";
import SearchMaps from "../components/SearchMaps";

function UserProfileView(props) {
  // const [places, setPlace] = useState([]);
  //maps below: app stuff
  const [home, setHome] = useState([41.390205, 2.154007]); // center of map //useState 17
  const [currView, setCurrView] = useState("homeV"); //useState 18
  const [shops, setShops] = useState([]);
  //user stuff:
  const [user, setUser] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  let { userId } = useParams();

  useEffect(() => {
    fetch("/shops")
      .then((res) => res.json())
      .then((json) => {
        setShops(json);
      })
      .catch((error) => {});
  }, []);

  useEffect(() => {
    getAndSetHome();
    fetchProfile();
  }, []);

  async function fetchProfile() {
    let myresponse = await Api.getUser(userId);
    if (myresponse.ok) {
      setUser(myresponse.data);
      setErrorMsg("");
    } else {
      setUser(null);
      let msg = `Error ${myresponse.status}: ${myresponse.error}`;
      setErrorMsg(msg);
    }
  }

  if (errorMsg) {
    return <h2 style={{ color: "red" }}>{errorMsg}</h2>;
  }

  if (!user) {
    return <h2>Loading...</h2>;
  }
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

  return (
    <div>
      <div className="UserProfileView">
        <h1>User Profile View</h1>
        ID: {user.userId}
        <br />
        Username: {user.username}
        <br />
        Email: {user.userEmail}
      </div>
      
      <div className="Demo1View">
        <div className="row mb-5">
          <div className="col">
            <h3>Create Your Shopping List </h3>
            <p>Enter the products you need and plan your route</p>

            <SearchMaps />
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

export default UserProfileView;
