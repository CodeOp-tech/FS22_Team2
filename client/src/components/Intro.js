import React from "react";
import "./Intro.css";
import IntroGal from "../DC/IntroGal.jpg";
import MinBack from "../DC/MinBack.jpg";

const Intro = () => {
  return (
    <div className="intro">
      <div className="i-left">
        <div className="i-name">
          <span>
            {" "}
            Hi!<br></br> Welcome to M.S.B!{" "}
          </span>
          <span>About us... </span>
        </div>
      </div>

      <div className="i-right">
        <div className="lady">
          <p>I am right side!</p>
          <img src={IntroGal} alt="" />
        </div>
      </div>
    </div>
  );
};
export default Intro;
