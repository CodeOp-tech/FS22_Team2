import React, {useContext} from 'react';
import ProductContext from '../ProductContext';

function ReviewList() {
    const { reviews } = useContext(ProductContext);

    return (
        <div className='ReviewList'>
            <ul>
                {
                    reviews.map(review => (
                        <li key={review.id}>
                            {review.stars}
                            {review.review_title}
                        </li>
                    ))
                }
            </ul>
        </div>

    )
}

export default ReviewList;