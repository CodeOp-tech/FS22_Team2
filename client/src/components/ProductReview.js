import React from "react";
import "./ProductReview.css";
import StarRating from "./StarRating";

function PopUpReview(props) {
    const product = props.product; // received from parent PopUpView

    return (
        <div className="container popup-review">
            <h3>Product Reviews</h3>
            <StarRating />
        </div>
    ) 
}

export default PopUpReview;