import React from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating";

function Review_card({ review }) {
  return (
    <div className="review-card hover:scale-105">
      <div className="flex flex-row justify-between items-center gap-2">
        <p className="review-card_title line-clamp-1 hover:line-clamp-2">
          {review.bookTitle}
        </p>
        <p className="review-card_author line-clamp-1 hover:line-clamp-2">
          Author : {review.author}
        </p>
      </div>
      <p className="text-15-semibold mt-2">Review</p>
      <p className="review-card_desc my-2">{review.reviewText}</p>
      <p className="text-sm">
        <span className="font-bold">Created at : </span>
        {review.date}
      </p>
      <div className="flex flex-row justify-between items-center mt-3">

        <Rating
          rating={review.rating}
          isEdit={false}
        />

        <Link
          to={`/review/${review._id}`}
          className="review-card_btn hover:scale-105 transition-all text-center ml-2"
        >
          Read More
        </Link>
      </div>
    </div>
  );
}

export default Review_card;
