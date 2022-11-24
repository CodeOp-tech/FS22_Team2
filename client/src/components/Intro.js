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
                // ZOE NOTE: Changed words to more public-friendly, now M words type very slowly on second round - tried messing with other params, gave up
                .typeString('My')
                .pauseFor(2500)
                .changeDelay(1000)
                .deleteChars(1)
                .typeString('arketplace')
                .pauseFor(2000)
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
                  .typeString("Shopping")
                  .pauseFor(2600)
                  // .changeDelay(800)
                  .deleteChars(7)
                  .typeString("ustainability")
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
                  .typeString("Buddy")
                  .pauseFor(2500)
                  .deleteChars(4)
                  .typeString("ooster")
                  .pauseFor(3000)
                  .start();
              }}
            />
          </span>

          <span>
              Want to shop local, have fun and make a difference? MSB helps shoppers find local small businesses that sell what you need, and earn points and prizes for shopping more sustainably. We also help businesses get free promotion to their local customer base. Join today!
          </span>
        </div>
      </div>

      <div className="i-right">
        <div className="lady">
          <img src={IntroGal} alt="" />
        </div>
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
