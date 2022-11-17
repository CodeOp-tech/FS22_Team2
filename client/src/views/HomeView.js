import React, { useState, useEffect, useRef } from "react";
import MySlider from "../components/MySlider";
import Podium from "../components/Podium";
import PodiumData from "../components/PodiumData";
import "../App.css";
import Intro from "../components/Intro";
import FeaturedBusiness from "../components/FeaturedBusiness";
import Map from "../components/Map";

function HomeView() {
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
      <Map />
    </div>
  );
}
export default HomeView;
