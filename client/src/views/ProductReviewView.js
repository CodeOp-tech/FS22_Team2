import React, { useState, useContext } from "react";
import "./ProductReviewView.css";
import AddReview from "../components/AddReview";
import ReviewList from "../components/ReviewList";
import ProductContext from "../ProductContext";

function ProductReviewView(props) {
    const product = props.product; // received from parent PopUpView
    const { reviews } = useContext(ProductContext);
    const [showAddReview, setShowAddReview] = useState(true);

    function hideAddReview() {
        setShowAddReview(false);
    }

    return (
        <div className="container popup-review">
            <div className="revBottom" style={{marginTop:'90px'}}>
            <h3>Customer Reviews</h3>
            {showAddReview && <AddReview product={product} hideAddReviewCb={hideAddReview}/>}

            <ReviewList />
            </div>
        </div>
    ) 
}

export default ProductReviewView;