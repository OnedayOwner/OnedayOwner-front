import '../styles/StarRating.css'; 
import React, { useRef } from 'react';

const StarRating = ({ value, onRatingChange }) => {
  const starSpanRef = useRef(null); 

  const drawStar = (e) => {
    const newRating = e.target.value;
    if (starSpanRef.current) {
      starSpanRef.current.style.width = `${newRating * 10}%`; 
    }
    if (onRatingChange) {
      onRatingChange(newRating); 
    }
  };

  return (
    <div className="star-rating">
      <span className="star">
        ★★★★★
        <span ref={starSpanRef}>★★★★★</span>
        <input
          type="range"
          onInput={drawStar}
          value={value} 
          step="1"
          min="0"
          max="10"
        />
      </span>
    </div>
  );
};

export default StarRating;