import React, { useState } from 'react'
import ReviewsForm from './ReviewsForm';

export default function Review({ review, updateReview }) {
    const [editReview, setEditReview] = useState(false);
    return (
        <div>{editReview ? <ReviewsForm newForm={false} editReview={editReview} setEditReview={setEditReview} updateReview={updateReview} reviewDetails={review} /> : (
            <div>
                <h4>
                    {review.title} <span>{review.rating}</span>
                </h4>
                <h5>{review.reviewer}</h5>
                <p>{review.content}</p>
            </div>
        )}
            <button onClick={() => setEditReview(!editReview)}>{editReview ? "Cancel" : "Edit this review"}</button>
            {/* <button onClick={() => props.handleDelete(review.id)}>delete</button> */}
        </div>
    );
}
