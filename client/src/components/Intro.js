import React from "react";
import "./Intro.css";
import IntroGal from "../DC/IntroGal.jpg";
import MinBack from "../DC/MinBack.jpg";
import Typewriter from "typewriter-effect";

const Intro = () => {
  return (
    <div className="intro">
      <div className="i-left">
        <div className="i-name">
          <span>
            {" "}
            Hi!<br></br> Welcome to 
            <Typewriter
            options={{
              autoStart: true,
              loop: true,
            }}
            onInit={(typewriter) => {
              typewriter
                
                .typeString('Mambo!')
                .pauseFor(2500)
                .changeDelay(1000)
                .deleteChars(5)
                .typeString('y')
                .pauseFor(5000)
                .stop()
                .start();
  }}
  />
            <Typewriter
            options={{
              autoStart: true,
              loop: true,
            }}
            onInit={(typewriter) => {
              typewriter
                .pauseFor(1000)
                .typeString('Snake!')
                .pauseFor(2600)
                // .changeDelay(800)
                .deleteChars(5)
                .typeString('hopping')
                .pauseFor(4000)
                .start();
  }}
  />
  <Typewriter
            options={{
              autoStart: true,
              loop: true,
            }}
            onInit={(typewriter) => {
              typewriter
                .pauseFor(2000)
                .typeString('Blood!')
                .pauseFor(2500)
                .deleteChars(5)
                .typeString('uddy!')
                .pauseFor(3000)
                .start();
  }}
  />
            {/* M.S.B!{" "} */}
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

      <div
        className="blur"
        style={{
          background: "#EE715C",
          top: "11rem",
        }}
      >
        {" "}
      </div>
      <div
        className="blur"
        style={{
          background: "#F1996D",
          top: "17rem",
          width: "21rem",
          height: "11rem",
          left: "-9rem",
        }}
      ></div>
    </div>
  );
};
export default Intro;
