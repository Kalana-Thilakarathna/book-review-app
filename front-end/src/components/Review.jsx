import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Rating from "react-rating-stars-component";

function Review() {
  const { id } = useParams();
  const [review, setReview] = useState(null);

  const getReview = async (id) => {
    try {
      const response = await axios.get(`http://localhost:3000/reviews/${id}`);
      setReview(response.data.data);
    } catch (error) {
      console.error("Error fetching review:", error);
    }
  };

  useEffect(() => {
    if (id) {
      getReview(id); // Fetch the review by id
    }
  }, [id]);

  return (
    <>
      {review && (
        <>
          <div className="flex flex-col mt-10 items-center">
            <div className="flex flex-row justify-between w-full max-w-4xl sm:max-w-xl items-center">
              <p className="view-text">{review.bookTitle}</p>
              <p className="view-author">{review.author}</p>
            </div>
            <div className="flex flex-row w-full max-w-3xl sm:max-w-xl mt-5 bg-primary-100 px-3 rounded-lg mb-2">
              <p className="view-desc">{review.reviewText}</p>
            </div>
            <div className="flex flex-row justify-between w-full max-w-4xl sm:max-w-xl items-center">
              <p className="review-card_author !text-[20px]">Ratings :</p>
              <Rating
                count={5}
                value={review.rating}
                size={30}
                activeColor="#ffd700"
                edit={false}
              />
              <p className="review-card_author !text-[20px] ml-36">
                {review.date}
              </p>
            </div>
          </div>
          <div className="flex justify-end mr-48 mt-5">
            <Link
              to={`/edit/${id}`}
              className="review-card_btn items-end hover:scale-105 transition-all"
            >
              Edit
            </Link>
          </div>
        </>
      )}
    </>
  );
}

export default Review;
