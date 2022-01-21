import React from 'react';

const StarRating = (props) => {

  const roundedRating = (Math.round(props.star_rating * 4) / 4).toFixed(2);
  let ratingWidth = roundedRating * 15;

  if (isNaN(ratingWidth)) {
    return (
    <div className="rating"  style={{width: 0}}></div>
  );
  } else {
    return (
      <div className="rating" style={{width: ratingWidth}}></div>
    );
  }
}

export default StarRating;
