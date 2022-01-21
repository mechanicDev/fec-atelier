import React from 'react';
import StarRating from './StarRating.jsx';
import StarCount from './StarCountBar.jsx';
import ProductBreakdowns from './ProductBreakdown.jsx';

class RatingsMeta extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {

    if (this.props) {

      const ratings = this.props.ratings_meta.ratings;
      const recommended = this.props.ratings_meta.recommended;
      const characteristics = this.props.ratings_meta.characteristics;

      let ratings_total = 0;
      let divisor = 0;
      let recommend_total = 0;
      let count = 0;
      let did_recommend = 0;
      let percent_recommending = 0;
      let stars_count = [0, 0, 0, 0, 0];
      let star_count_list = [];
      let characteristics_list = [];

      for (const key in ratings) {
        ratings_total += key * ratings[key];
        divisor += parseInt(ratings[key]);
        stars_count[key - 1] = ratings[key];
      }

      const ratings_average = (Math.ceil( ratings_total / divisor * 10 ) / 10).toFixed(1);

      for (const key in recommended) {
        recommend_total += parseInt(recommended[key]);
        if (count === 1) {
          did_recommend = parseInt(recommended[key]);
        }
        count = 1;
      }

      percent_recommending = (did_recommend / recommend_total * 100).toFixed(0);

      for (let i = 0; i < 5; i++) {
        star_count_list.push({stars: i + 1, star_count: ((stars_count[i] / divisor) * 605).toFixed(0)})
      }

      let star_counts = star_count_list.map((stars_counted) => {
        return (
            <StarCount className="star_counts" getAllReviews={this.props.getAllReviews}flip_filters={this.props.flip_filters} filter_data={this.props.filter_data} key={stars_counted.stars} star_number={stars_counted.stars} star_count={stars_counted.star_count} item_id={this.props.item_id} sort={this.props.sort}></StarCount>
        )
      });

      for (const key in characteristics) {
        characteristics[key]['inner_characteristic'] = key;
        characteristics_list.push(characteristics[key]);
      }

      let filters = '';

      for (let i = 0; i < 5; i++) {
        if (this.props.filters[i] === true) {
          filters = filters + `${i + 1} stars `;
        }
      }

      let product_breakdowns = characteristics_list.map((characteristic) => {
          return (
              <ProductBreakdowns key={characteristic.id} star_number={characteristic.value} star_count={characteristic.inner_characteristic}></ProductBreakdowns>
          )
        });

        return(

        <div data-testid="ratings-breakdown" className="ratings_meta">
          <div>
            <span className="ratings_average">{ratings_average}</span>
            <div className="star_rating_container"><ul><StarRating className="ratings_breakdown_stars" star_rating={ratings_average}></StarRating></ul></div>
          </div><br></br><br></br><br></br>
          <span className="percent_recommending">{percent_recommending}% of reviews recommend this product.</span><br></br><br></br>
          <h3>Rating Breakdown</h3>
          {this.props.any_filters ? <span>Current filters: {filters} <span className="link" onClick={this.props.clearFilters} >Remove all filters?</span></span>: null}
          <ul className="star_count_list">{star_counts}<ProductBreakdowns characteristics_list={characteristics_list}></ProductBreakdowns></ul>
        </div>
      )
    }
  }
}

export default RatingsMeta;
