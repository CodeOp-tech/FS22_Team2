import React from "react";
import "./FloatingDiv.css";

const FloatingDiv = ({ image, text1 }) => {
  return (
    <div classname="floatingdiv">
      <img
        src="https://cdn-icons-png.flaticon.com/512/3637/3637285.png"
        alt=""
      />
      <span>
        {text1}
        <br></br>
      </span>
    </div>
  );
};
export default FloatingDiv;
