import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';

export default function ReviewsForm({ newForm, createReview, editReview, setEditReview, updateReview, reviewDetails }) {
    const { id } = useParams();
    const [userReview, setUserReview] = useState({
        reviewer: "",
        title: "",
        content: "",
        rating: ""
    });

    useEffect(() => {
        setUserReview(reviewDetails ? reviewDetails : { ...userReview, product_id: id });
    }, []);

    const handleTextChange = (event) => {
        setUserReview({ ...userReview, [event.target.id]: event.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (newForm) {
            createReview(userReview)
            setUserReview({
                reviewer: "",
                title: "",
                content: "",
                rating: "",
                product_id: id
            });
        }

        if (!newForm) {
            updateReview(userReview);
            setEditReview(!editReview);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="reviewer">Name:</label>
                <input
                    id="reviewer"
                    value={userReview.reviewer}
                    type="text"
                    onChange={handleTextChange}
                    placeholder="Your name"
                    required
                />
                <label htmlFor="title">Title:</label>
                <input
                    id="title"
                    type="text"
                    required
                    value={userReview.title}
                    onChange={handleTextChange}
                />
                <label htmlFor="rating">Rating:</label>
                <input
                    id="rating"
                    type="number"
                    name="rating"
                    min="0"
                    max="5"
                    step="1"
                    value={userReview.rating}
                    onChange={handleTextChange}
                    required
                />
                <label htmlFor="content">Review:</label>
                <textarea
                    id="content"
                    type="text"
                    name="content"
                    value={userReview.content}
                    placeholder="What do you think..."
                    onChange={handleTextChange}
                    required
                />

                <br />

                <input type="submit" />
            </form>
        </div>
    )
}
