import React, {useState, useContext} from "react";
import { FaStar } from "react-icons/fa";
import StarRating from "./StarRating";
import ProductContext from '../ProductContext';
import "./AddReview.css"

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
        addReviewCb(formData, product.product_id); // call on addReview function in parent App via addReviewCb passed in Product Context
        setFormData(EMPTY_FORM); // this not necessary, since hiding form after submission as per below
        props.hideAddReviewCb();
    }

    return (
        <div className="container">
            <div className="row">
            <p style={{fontSize:'20px'}}><b>Add Product Review here:</b></p>
            </div>
            <form onSubmit={handleSubmit}>
            <div className="stars">
                <label className="row">
                    <div className="col-sm-3">
                    <h5>Rate out of 5 stars:</h5>
                    </div>

                    <div className="col-sm-9"> 
                    <StarRating
                    name="stars"
                    starClickCb={handleStarClick} // starClickCb is passed to child StarRating
                    />
                    </div>
                </label>
                </div>
                <br></br>

            <div className="reviewTitle">
                <label className="row">
                    <div className="col-sm-3">
                    <h6>Title of Review:</h6>
                    </div>

                    <div className="col-sm-9">
                    <input
                    style={{borderRadius:'10px', border:'none', backgroundColor:'white'}}
                    id="title"
                    name="review_title"
                    type="text"
                    value={formData.review_title}
                    placeholder="type review title here..."
                    onChange={handleChange}
                    required
                    />
                    </div>
                </label>
            </div>
            <br></br>

            <div className="reviewText">
                <label className="row">
                    <div className="col-sm-3">
                    <h6>Review:</h6>
                    </div>

                    <div className="col-sm-9">
                    <textarea
                    style={{borderRadius:'10px', border:'none'}}
                    id="review"
                    name="review_body"
                    type="text"
                    value={formData.review_body}
                    placeholder="type review here..."
                    onChange={handleChange}
                    required
                    />
                    </div>
                </label>
            </div>
            <br></br>

            <button className="addReview" type="submit">Add Product Review</button>
            </form>
            <br></br>

        </div>
    )
}

export default AddReview;