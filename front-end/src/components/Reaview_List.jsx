import React, { useEffect, useState } from "react";
import Review_card from "./Review_card";
import axios from "axios";
import { FaSortNumericDownAlt, FaSortNumericUp } from "react-icons/fa";

function Reaview_List() {
  const [reviews, setReviews] = useState([]);
  const [rateFilter, setRateFilter] = useState("all");
  const [isChecked, setIsChecked] = useState(true); //ischecked latest to old

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  const handleFilter = (event) => {
    setRateFilter(event.target.value);
  }

  const fetchReviews = async () => {
    try {
      const query = rateFilter ? `?rate=${rateFilter}&sote=${isChecked}` : "";
      const response = await axios.get(`http://localhost:3000/reviews${query}`);
      setReviews(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [rateFilter, isChecked]);

  return (
    <div className="flex flex-col  mt-5 mx-2">
      <div className="flex flex-row items-baseline justify-between">
        <h1 className="text-30-bold">Reviews</h1>
        <div className="flex justify-center items-center">
          <p>Filter by : </p>
          <select
            className="filter-select"
            onChange={handleFilter}
            value={rateFilter}
          >
            <option value="all">All</option>
            <option value="1">1 star</option>
            <option value="2">2 stars</option>
            <option value="3">3 stars</option>
            <option value="4">4 stars</option>
            <option value="5">5 stars</option>
          </select>
          <p className="ml-2">Sorted </p>
          <div
            onClick={toggleCheckbox}
            style={{ cursor: "pointer", fontSize: "24px" }}
            className="mx-2"
          >
            {isChecked ? (
              <FaSortNumericDownAlt />
            ) : (
              < FaSortNumericUp />
            )}
          </div>
        </div>
      </div>
      <div className="card_grid mt-5">
        {reviews.length < 1 ? (
          <h1 className="no-result">No reviews</h1>
        ) : (
          reviews.map((review) => (
            <Review_card key={review.id} review={review} />
          ))
        )}
      </div>
    </div>
  );
}

export default Reaview_List;







