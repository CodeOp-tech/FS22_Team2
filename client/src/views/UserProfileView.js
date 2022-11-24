import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Api from "../helpers/Api";
import Local from "../helpers/Local";
//map stuff:
import { getHome } from "../helpers/geoLocation";
import AddressForm from "../components/AddressForm";
import MarkerTable from "../components/MarkerTable";
import MarkerMap from "../components/MarkerMap";
import { geocode } from "../helpers/geo-opencage";
import SearchMaps from "../components/SearchMaps";
import ShopView from "./ShopView";

function UserProfileView(props) {
  //maps below: app stuff
  const [home, setHome] = useState([41.390205, 2.154007]); // center of map
  const [currView, setCurrView] = useState("homeV");
  const [shops, setShops] = useState([]);
  //user stuff:
  const [errorMsg, setErrorMsg] = useState("");
  const [shopProfile, setShopProfile] = useState([]);
  const [allShops, setAllShops] = useState("");
  const [error, setError] = useState("");


  let { userId } = useParams();

  // const filterProducts = ({ searchResult, setSearchResult }) => {
  //   const [keyword, setKeyword] = useState("");
  // };

  // const handleChange = (event) => {
  //   const { value } = event.target;
  //   setKeyword(event.target.value);
  // };

  // useEffect(() => {
  //   fetch("/shops")
  //     .then((res) => res.json())
  //     .then((json) => {
  //       setShops(json);
  //     })
  //     .catch((error) => {});
  // }, []);
  
  useEffect(() => {
    getSelectedShops();
  }, []);

  useEffect(() => {
    getAndSetHome();
  }, []);

  useEffect(() => {
    fetch("/shops")
      .then((res) => res.json())
      .then((json) => {
        setShops(json);
        console.log(shops);
      })
      .catch((error) => {});
  }, []);

  async function getSelectedShops(productString) {
    let myresponse = await Api.getAllShops(productString);
    if (myresponse.ok) {
      setAllShops(myresponse.data);
    } else {
      setError(myresponse.error);
    }
  }

  if (errorMsg) {
    return <h2 style={{ color: "red" }}>{errorMsg}</h2>;
  }

  if (!props.user) {
    return <h2>Loading...</h2>;
  }
  async function getAndSetHome() {
    let latLng = await getHome(); // returns [lat, lng]
    setHome(latLng);
  }
  async function getSelectedShops(input) {
    console.log(input);
    let myresponse = await Api.getSearchShops(input);
    if (myresponse.ok) {
      setShops(myresponse.data);
    } else {
      setError(myresponse.error);
    }
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

  async function setShop(id) {
    let myresponse = await Api.getShopProfile(id);
    if (myresponse.ok) {
      setShopProfile(myresponse.data);
    } else {
      setErrorMsg(myresponse.error)
    }
    console.log(shopProfile);
  }

  return (
    <div>
      <div className="UserProfileView">
        <h1>Hey there, {props.user.username}!</h1>
        <br />
        <h2> You have <b>{props.user.user_points}</b> points!
        <br />
        <button type="submit" className="btn btn-primary">Redeem</button>
        </h2>
        <br />
      </div>

      <div className="Demo1View">
        <div className="row mb-5">
          <div className="col">
            <h3>Create Your Shopping List </h3>
            <p>Enter the products you need and plan your route</p>

            <SearchMaps getSelectedShopsCb={getSelectedShops} />
            {/* {searchResult.map((product) => (
                <div>{searchResult }</div>
              ))}
              filterProducts
              handleChange /> */}

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
            {/* <AddressForm
              addMarkerCb={(addr) => addMarkerForAddress(addr)}
              shops={shops}
            /> */}
          </div>

          <div className="col">
            {home && <MarkerMap 
            shops={shops} 
            home={home} 
            zoom={13}
            setShopCb={(id) => setShop(id)} />}
          </div>
          
        </div>

        {/* <MarkerTable places={places} /> */}
      </div>

      <ShopView />
      
    </div>
  );
}

export default UserProfileView;
