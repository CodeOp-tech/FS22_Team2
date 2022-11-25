import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Api from "../helpers/Api";
import Local from "../helpers/Local";
//map stuff:
import { getHome } from "../helpers/geoLocation";
//import AddressForm from "../components/AddressForm";
//import MarkerTable from "../components/MarkerTable";
import MarkerMap from "../components/MarkerMap";
import { geocode } from "../helpers/geo-opencage";
import SearchMaps from "../components/SearchMaps";
import ShopView from "./ShopView";
import Points from "../components/Points";

function UserProfileView(props) {
  //maps below: app stuff
  const [home, setHome] = useState([41.390205, 2.154007]); // center of map
  //const [currView, setCurrView] = useState("homeV");
  const [shops, setShops] = useState([]);
  //user stuff:
  const [errorMsg, setErrorMsg] = useState("");
  const [shopProfile, setShopProfile] = useState([]);
  const [allShops, setAllShops] = useState("");
  const [error, setError] = useState("");

  let { userId } = useParams();

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
    console.log(input, "******************************");
    let myresponse = await Api.getSearchShops(input);
    if (myresponse.ok) {
      console.log(myresponse.data);
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
      setErrorMsg(myresponse.error);
    }
    console.log(shopProfile);
  }

  return (
    <div>
      <div className="UserProfileView">
        <h1>Hey there, {props.user.username}!</h1>
        <br /> <Points />
        <h2>
          {" "}
          You have <b>{props.user.user_points}</b> points!
          <br />
          <button type="submit" className="btn btn-primary">
            Redeem
          </button>
        </h2>
        <br />
      </div>

      <div className="Demo1View">
        <div className="row mb-5">
          <div className="col">
            <h2>What do you need? </h2>
            <h4>Enter the products you need and plan your route</h4>
            <br></br>
            <SearchMaps getSelectedShopsCb={getSelectedShops} />
          </div>

          <div className="col">
            {home && (
              <MarkerMap
                shops={shops}
                home={home}
                zoom={13}
                setShopCb={(id) => setShop(id)}
              />
            )}
          </div>
        </div>
      </div>
      <ShopView />
    </div>
  );
}

export default UserProfileView;
