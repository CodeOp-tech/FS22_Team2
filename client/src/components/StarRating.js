 // Learned from https://www.youtube.com/watch?v=eDw46GYAIDQ&ab_channel=EricMurphy

import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import "./StarRating.css";

function StarRating(props) {
  const [rating, setRating] = useState(null); // if never rated anything before, it will be null
  const [hover, setHover] = useState(null); // the value that is currently being hovered over

  function handleClick(ratingValue) {
    setRating(ratingValue); // set rating state
    props.starClickCb(props.name, ratingValue); // URGENT NOTE: THIS MUST CHANGE
  }

  return (
    <div>
      {[...Array(5)].map((star, i) => { // [...Array(5)] = creating an array with 5 untitled/undefined items in it
        const ratingValue = i + 1; // arrays start at 0, want it to start at 1 (1 - 5 stars)

        return (
          <label key={i}>
            <input // radio buttons which are hidden via CSS
              type="radio"
              value={ratingValue}
              onClick={() => handleClick(ratingValue)} // passes ratingValue to handleClick to set as state
            />
            <FaStar
              className="star"
              color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"} // #ffc107 = yellow, #e4e5e9 = grey
              // if rating (old state) is more than newly selected ratingValue (selected star), then light up only the selected stars in yellow
              // hover takes precedence over rating
              size={40}
              onMouseEnter={() => setHover(ratingValue)} // when mouse enters, hover effect that lights up the star
              onMouseLeave={() => setHover(null)} 
            />
          </label>
        );
      })} {/* map function ends here */}
    </div>
  );
}

export default StarRating;
