import React, { useState } from "react";
import MySlider from "../components/MySlider";
import Podium from "../components/Podium";

import PodiumData from "../components/PodiumData";
import "../App.css";
//import "../styles.css";

function HomeView() {
  return (
    <div>
      <h1>Home!</h1>

      <h2>Congratulations To This Month's WINNERS!</h2>
      <br></br>

      <Podium winners={PodiumData} />

      <br></br>

      <h2> This Month You Can Win...</h2>
      <MySlider />
    </div>
  );
}
export default HomeView;
