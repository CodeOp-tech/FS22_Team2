import React, {useContext} from 'react';
import ProductContext from '../ProductContext';
import { FaStar } from "react-icons/fa";

function ReviewList() {
    const { reviews } = useContext(ProductContext);

    return (
        <div className='ReviewList'>
            <div>
                {
                    reviews.map(review => (
                        <div key={review.id}>
                            <ul>
                            <li>
                                {[...Array(review.stars)].map((star, i) => (
                                <FaStar
                                className='star'
                                color="#ffc107" // yellow star
                                size={40}
                                key={i}
                                />
                            ))}
                            {[...Array(5 - review.stars)].map((star, i) => (
                                <FaStar
                                className='star'
                                color="#C0C0C0" // gray star 
                                size={40}
                                key={i}
                                />
                            ))}
                            </li>
                            <li>{review.username}</li>
                            <li>{review.review_date}</li>
                            <li>{review.review_title}</li>
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