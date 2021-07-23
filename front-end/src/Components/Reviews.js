import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { apiURL } from '../util/apiURL.js';
import ReviewsForm from './ReviewsForm';
import Review from './Review.js';

const API = apiURL();
export default function Reviews({ productId }) {
    const [allReviews, setAllReviews] = useState([]);

    useEffect(() => {
        console.log("COUNT RUNNING")
        axios.get(`${API}/products/${productId}/itemreviews`)
            .then(res => setAllReviews(res.data.reverse()))
            .catch(e => console.log("no such product"))
    }, [productId]);

    const createReview = (review) => {
        axios.post(`${API}/products/${productId}/itemreviews`, review)
            .then(res => {
                if (res.data === "error")
                    throw Error("Invalid data was sent.");

                setAllReviews([res.data, ...allReviews])
            })
            .catch(e => console.log(e))
    }

    const updateReview = (updatedReview) => {
        axios.put(`${API}/products/${productId}/itemreviews/${updatedReview.id}`, updatedReview)
            .then(res => {
                if (res.data === "error")
                    throw Error("Invalid data was sent.");

                const copy = [...allReviews];
                const index = copy.findIndex(review => review.id === updatedReview.id);
                copy[index] = res.data;
                setAllReviews(copy);
            })
            .catch(e => console.log(e))
    }

    return (
        <div>
            <h1>REVIEWS</h1>
            <ReviewsForm newForm={true} createReview={createReview} />
            {allReviews.map(review => <Review key={review.id} review={review} updateReview={updateReview} />)}
        </div>
    )
}
