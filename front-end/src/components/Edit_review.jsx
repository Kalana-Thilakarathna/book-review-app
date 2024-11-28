import React, { useEffect, useState } from "react";
import Rating from "./Rating";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function Edit_review() {
  const { id } = useParams();
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
  };

  const handleFormData = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleEdit = (event) => {
    event.preventDefault();
    formData.rating = rating;
    axios
      .put(`http://localhost:3000/reviews/edit/${id}`, formData)
      .then((res) => {
        console.log(res.data.message);
        alert(res.data.message);
        navigation("../");
      })
      .catch((error) => {
        console.log(error);
        alert(error.response.data.message);
      });
  };

  const handleDelete = (event) => {
    event.preventDefault();
    axios
      .delete(`http://localhost:3000/reviews/edit/delete/${id}`)
      .then((res) => {
        alert(res.data.message);
        navigation("../");
      })
      .catch((error) => {
        console.log(error);
        alert(error.response.data.message);
      });
  } 

  const getReview = async (id) => {
    try {
      const response = await axios.get(`http://localhost:3000/reviews/${id}`);
      setFormData(response.data.data);
      setRating(response.data.data.rating);
    } catch (error) {
      console.error("Error fetching review:", error);
    }
  };

  useEffect(() => {
    if (id) {
      getReview(id); // Fetch the review by id
    }
  }, []);

  return (
    <div className="flex flex-col mt-3 mx-2">
      <h1 className="text-30-bold">Edit The review of {formData.bookTitle}</h1>
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
                  rating={rating}
                  isEdit={true}
                  onRatingChange={handleRating}
                />
                <span className="font-bold">{rating} out of 5</span>
              </div>
            </div>
            <div className="flex flex-row justify-between items-baseline gap-5">
              <p className="review-form_label">Created At : {formData.date}</p>
            </div>
          </div>
        </form>
        <div className="flex justify-end w-full mr-10 gap-5">
          <button
            className="review-form_btn-delete hover:scale-105"
            onClick={handleDelete}
          >
            Delete
          </button>
          <button
            className="review-form_btn hover:scale-105"
            onClick={handleEdit}
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
}

export default Edit_review;
