import React, {useContext, useEffect, useState} from 'react';
import ProductContext from '../ProductContext';
import { FaStar } from "react-icons/fa";
import "./ReviewList.css";

function ReviewList() {
    const { reviews } = useContext(ProductContext);
    const [star5, setStar5] = useState(null);
    const [star4, setStar4] = useState(null);
    const [star3, setStar3] = useState(null);
    const [star2, setStar2] = useState(null);
    const [star1, setStar1] = useState(null);

    useEffect(() => {
        getStars();
    }, [reviews]) // Note: must have reviews here, if not star state remains constant

    function getStars() {
        let star5 = 0;
        let star4 = 0;
        let star3 = 0;
        let star2 = 0;
        let star1 = 0;

        for (let i = 0; i < reviews.length; i++) {
            if (reviews[i].stars === 5) {
                star5++;
            } if (reviews[i].stars === 4) {
                star4++;
            } if (reviews[i].stars === 3) {
                star3++;
            } if (reviews[i].stars === 2) {
                star2++;
            } if (reviews[i].stars === 1) {
                star1++;
            }
        }
        console.log(star5, star4, star3, star2, star1);
        setStar5(star5); 
        setStar4(star4);
        setStar3(star3);
        setStar2(star2);
        setStar1(star1);
    }

    return (
        <div className='ReviewList'>
            <div className='ReviewAggregate container'>
            Total Ratings: {reviews.length}
            <div className='FiveStars row'>
                <div className='col-sm-3'>
                {[...Array(5)].map((star, i) => (
                    <FaStar
                    className='star'
                    color="#ffc107" // yellow star
                    size={30}
                    key={i}
                    />
                    ))} 
                </div>

                <div className='col-sm-9'>
                    : {star5 && ((star5 / reviews.length) * 100).toFixed(2)}%
                </div>
            </div>

            <div className='FourStars row'>
                <div className='col-sm-3'>
                {[...Array(4)].map((star, i) => (
                    <FaStar
                    className='star'
                    color="#ffc107" // yellow star
                    size={30}
                    key={i}
                    />
                    ))} 
                </div>

                <div className='col-sm-9'>
                    : {star4 && ((star4 / reviews.length) * 100).toFixed(2)}%
                </div>
            </div>

            <div className='ThreeStars row'>
                <div className='col-sm-3'>
                {[...Array(3)].map((star, i) => (
                    <FaStar
                    className='star'
                    color="#ffc107" // yellow star
                    size={30}
                    key={i}
                    />
                    ))} 
                </div>

                <div className='col-sm-9'>
                    : {star3 && ((star3 / reviews.length) * 100).toFixed(2)}%
                </div>
            </div>

            <div className='TwoStars row'>
                <div className='col-sm-3'>
                {[...Array(2)].map((star, i) => (
                    <FaStar
                    className='star'
                    color="#ffc107" // yellow star
                    size={30}
                    key={i}
                    />
                    ))} 
                </div>

                <div className='col-sm-9'>
                    : {star2 && ((star2 / reviews.length) * 100).toFixed(2)}%
                </div>
            </div>

            <div className='OneStar row'>
                <div className='col-sm-3'>
                {[...Array(1)].map((star, i) => (
                    <FaStar
                    className='star'
                    color="#ffc107" // yellow star
                    size={30}
                    key={i}
                    />
                    ))} 
                </div>

                <div className='col-sm-9'>
                    : {star1 && ((star1 / reviews.length) * 100).toFixed(2)}%
                </div>
            </div>

            </div> 

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