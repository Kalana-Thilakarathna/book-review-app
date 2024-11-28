import React from 'react'

function Rating({ rating, isEdit, onRatingChange }) {
  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <label
            key={star}
            className={`cursor-pointer text-2xl ${
              star <= rating ? "text-yellow-500" : "text-gray-300"
            }`}
          >
            <input
              type="radio"
              name="rate"
              value={star}
              className="hidden"
              disabled={!isEdit}
              onChange={() => onRatingChange(star)}
              checked={rating === star}
            />
            ★
          </label>
        ))}
      </div>
    </div>
  );
}

export default Rating