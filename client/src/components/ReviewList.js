import React, {useContext} from 'react';
import ProductContext from '../ProductContext';
import { FaStar } from "react-icons/fa";
import "./ReviewList.css";

function ReviewList() {
    const { reviews } = useContext(ProductContext);

    return (
        <div className='ReviewList'>
            <div>
                {
                    reviews.map(review => (
                        <div className="ReviewBox" key={review.id}>
                            <ul>
                            <li><small>Review by {review.username}</small></li>
                            <li>
                                {[...Array(review.stars)].map((star, i) => (
                                <FaStar
                                className='star'
                                color="#ffc107" // yellow star
                                size={30}
                                key={i}
                                />
                            ))}
                            {[...Array(5 - review.stars)].map((star, i) => (
                                <FaStar
                                className='star'
                                color="#C0C0C0" // gray star 
                                size={30}
                                key={i}
                                />
                            ))}
                            </li>
                            <li><small>Reviewed on {review.review_date.slice(0, 10)} {review.review_date.slice(11, 19)}</small></li>
                            <br></br>
                            <li><b>{review.review_title}</b></li>
                            <li>{review.review_body}</li>
                            </ul>   
                        </div>
                    ))
                }
            </div>
        </div>

    )
}

export default ReviewList;