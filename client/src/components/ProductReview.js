import React from "react";
import "./ProductReview.css";

function PopUpReview(props) {
    const product = props.product; // received from parent PopUpView

    return (
        <div className="container popup-review">
            <h3>Product Reviews</h3>
        </div>
    ) 
}

export default PopUpReview;