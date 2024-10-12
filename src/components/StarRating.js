import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import '../styles/StarRating.css'; 

const StarRating = ({ onRatingChange }) => {
  const [rating, setRating] = useState(1);

  const drawStar = (e) => {
    const target = e.target;
    setRating(target.value);
    document.querySelector(`.star span`).style.width = `${target.value * 10}%`;
    if (onRatingChange) {
      onRatingChange(target.value); 
    }
  };

  return (
    <div className="star-rating">
      <span className="star">
        ★★★★★
        <span>★★★★★</span>
        <input
          type="range"
          onInput={drawStar}
          value={rating}
          step="1"
          min="0"
          max="10"
        />
      </span>
    </div>
  );
};

export default StarRating;