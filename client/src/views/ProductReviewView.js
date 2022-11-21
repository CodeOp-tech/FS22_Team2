import React, { useContext } from "react";
import "./ProductReviewView.css";
import AddReview from "../components/AddReview";
import ReviewList from "../components/ReviewList";
import ProductContext from "../ProductContext";

function ProductReviewView(props) {
    const product = props.product; // received from parent PopUpView
    const { reviews } = useContext(ProductContext);

    return (
        <div className="container popup-review">
            <h3>Product Reviews</h3>
            <AddReview product={product} />

            <ReviewList />
        </div>
    ) 
}

export default ProductReviewView;