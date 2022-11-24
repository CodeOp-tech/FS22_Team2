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
                
                .typeString('My Shopping Buddy!')
                .pauseFor(2500)
                // .changeDelay(1000)
                .deleteChars(14)
                .typeString('ustainable Business!')
                .pauseFor(5000)
                .start();
  }}
  />
       
            {/* M.S.B!{" "} */}
          </span>

          <span>
            Want to shop local, have fun and make a difference? MSB helps
            shoppers find local small businesses that sell what you need, and
            earn points and prizes for shopping more sustainably. We also help
            businesses get free promotion to their local customer base. Join
            today!
          </span>
        </div>
      </div>

      {/* <div className="i-right">
        <div className="lady">
          <img src={IntroGal} alt="" />
        </div>
      </div> */}
      <div className="lady">
        <img src={IntroGal} alt="" />
      </div>
      {/* <div
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
      ></div> */}
    </div>
  );
};
export default Intro;
