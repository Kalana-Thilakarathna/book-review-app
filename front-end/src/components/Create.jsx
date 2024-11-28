import React, { useState } from "react";
import Rating from "react-rating-stars-component";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Create() {
  const [rating, setRating] = useState(0);
  const navigation = useNavigate();
  const [formData, setFormData] = useState({
    bookTitle: "",
    author: "",
    reviewText: "",
    rating: 0,
    date: new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
  });

  const handleRating = (newRating) => {
    setRating(newRating);
    console.log(rating);
  };

  const handleFormData = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    formData.rating = rating;
    axios.post("http://localhost:3000/reviews/create", formData).then((res) => {
      alert(res.data.message);
      navigation("/");
    })
    .catch((error) => {
      console.log(error);
      alert(error.response.data.message);
    });
  };

  return (
    <div className="flex flex-col mt-3 mx-2">
      <h1 className="text-30-bold">Create a review</h1>
      <div className="mt-5 flex flex-col justify-center items-center">
        <form className="review-form w-full">
          <div className="flex flex-row justify-between items-baseline gap-5">
            <label className="review-form_label" htmlFor="bookTitle">
              Title
            </label>
            <input
              className="review-form_input w-full max-w-lg"
              type="text"
              id="bookTitle"
              name="bookTitle"
              placeholder="Enter the Title for the Review"
              value={formData.bookTitle}
              onChange={handleFormData}
            />
          </div>
          <div className="flex flex-row justify-between items-baseline gap-5">
            <label className="review-form_label" htmlFor="author">
              Author
            </label>
            <input
              className="review-form_input w-full max-w-lg"
              type="text"
              id="author"
              name="author"
              placeholder="Enter the Author of the Book"
              value={formData.author}
              onChange={handleFormData}
            />
          </div>
          <div className="flex flex-col justify-between items-baseline gap-5">
            <label className="review-form_label" htmlFor="reviewText">
              Review Text
            </label>
            <textarea
              className="review-form_textarea  w-full"
              type="text"
              id="reviewText"
              name="reviewText"
              placeholder="Entern your Review here"
              value={formData.reviewText}
              onChange={handleFormData}
            />
          </div>
          <div className="flex flex-row justify-between items-baseline">
            <div className="flex flex-row justify-between items-baseline gap-5">
              <label className="review-form_label" htmlFor="rating">
                Rating
              </label>
              <div className="flex flex-col justify-center items-center mr-20">
                <Rating
                  count={5}
                  value={rating}
                  size={30}
                  activeColor="#ffd700"
                  onChange={handleRating}
                />
                <span className="font-bold">{rating} out of 5</span>
              </div>
            </div>
            <div className="flex flex-row justify-between items-baseline gap-5">
              <p className="review-form_label">
                Creating Date :{" "}
                {new Date().toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
        </form>
        <button
          className="review-form_btn hover:scale-105"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default Create;
