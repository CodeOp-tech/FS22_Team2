import React, {useState, useContext} from "react";
import { FaStar } from "react-icons/fa";
import StarRating from "./StarRating";
import ProductContext from '../ProductContext';

const EMPTY_FORM = {
    stars: 0,
    review_title: "",
    review_body: "",
}

function AddReview(props) {
    const product = props.product; // received from parent ProductReviewView
    const [formData, setFormData] = useState(EMPTY_FORM);

    const { addReviewCb } = useContext(ProductContext);

    function handleChange(event) {
        let { name, value } = event.target
        setFormData((data) => ({...data, [name] : value }))
    }

    function handleStarClick(name, rating) {
        setFormData((data) => ({...data, [name] : rating }))
    }

    function handleSubmit(event) {
        event.preventDefault();
        addReviewCb(formData, product.product_id); // call on addReviewCb in parent App via Product Context
        alert("Thank you for sharing your product review!");
        setFormData(EMPTY_FORM); // this not necessary, since hiding form after submission as per below
        props.hideAddReviewCb();
    }

    return (
        <div className="AddReview container">
            <div className="row">
            <p><b>Add Product Review here:</b></p>
            </div>
            <form onSubmit={handleSubmit}>
            <div className="row">
                <label>
                    Rate out of 5 stars:
                    <StarRating
                    name="stars"
                    starClickCb={handleStarClick} // starClickCb is passed to child StarRating
                    />
                </label>
                </div>

            <div className="row">
                <label>
                    Title of Review:
                    <input
                    id="title"
                    name="review_title"
                    type="text"
                    value={formData.review_title}
                    onChange={handleChange}
                    required
                    />
                </label>
            </div>

            <div className="row">
                <label>
                    Review:
                    <input
                    id="review"
                    name="review_body"
                    type="text"
                    value={formData.review_body}
                    onChange={handleChange}
                    required
                    />
                </label>
            </div>
            <button type="submit">Add Product Review</button>
            </form>

        </div>
    )
}

export default AddReview;