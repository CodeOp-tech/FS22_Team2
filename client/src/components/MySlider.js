import React, { useEffect, useState } from "react";
import "../App.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import bottle from "../DC/bottle.jpg";
import box from "../DC/box.jpg";
import cam from "../DC/cam.jpg";
import toast from "../DC/toast.jpg";
import "./MySlider.css";

export default function MySlider() {
  return (
    <div>
      <div
        className="MySlider"
        style={{
          margin: "30px",
          marginTop: "200px",
        }}
      >
        <h3 className="winners">Win Prizes!</h3>
        <p className="para">Earn points for shopping sustainably, and use them to redeem awesome prizes like these from shops in our network.</p>

        <Slider
          autoplay={true}
          autoplaySpeed={3000}
          dots={true}
          pauseOnHover={true}
          //centerMode={true}
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
          <div className="SliderPics">
            <img
              src={bottle}
              alt=""
              style={{ width: " 60", height: "40vh", padding: "20px" }}
            />
          </div>
          <div className="SliderPics">
            <img
              src={box}
              alt=""
              style={{ width: " 60", height: "40vh", padding: "20px" }}
            />
          </div>
          <div className="SliderPics">
            <img
              src={cam}
              alt=""
              style={{ width: " 60", height: "40vh", padding: "20px" }}
            />
          </div>

          <div className="SliderPics">
            <img
              src={toast}
              alt=""
              style={{ width: " 60", height: "40vh", padding: "20px" }}
            />
          </div>
        </Slider>
      </div>
    </div>
  );
}
