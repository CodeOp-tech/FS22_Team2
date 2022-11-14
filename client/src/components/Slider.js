import React, { useEffect, useState } from "react";
import "./App.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import bottle from "../DC/bottle.jpg";
import box from "../DC/box.jpg";
import cam from "../DC/cam.jpg";
import toast from "../DC/toast.jpg";

export default function Slider() {
  return (
    <div style={{ margin: "30px" }}>
      <h2>react slider</h2>
      <Slider
        autoplay={true}
        autoplaySpeed={3000}
        dots={true}
        pauseOnHover={true}
        centerMode={true}
        centerPadding={60}
        initialSlide={1}
        infinite={true}
        lazyLoad={true}
        slidesToShow={3}
        width={60}
        responsive={[
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: true,
            },
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2,
            },
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
        ]}
      >
        <div>
          <img
            src={bottle}
            alt=""
            style={{ width: " 60", height: "40vh", padding: "20px" }}
          />
        </div>
        <div>
          <img
            src={box}
            alt=""
            style={{ width: " 60", height: "40vh", padding: "20px" }}
          />
        </div>
        <div>
          <img
            src={cam}
            alt=""
            style={{ width: " 60", height: "40vh", padding: "20px" }}
          />
        </div>

        <div>
          <img
            src={toast}
            alt=""
            style={{ width: " 60", height: "40vh", padding: "20px" }}
          />
        </div>
      </Slider>
    </div>
  );
}
