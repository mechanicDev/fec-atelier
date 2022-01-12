import React from 'react';
import { getReviewsByItem, getReviewsMetaByItem } from '../../../.././utils/apiCalls.js';
import RatingsList from './components/RatingsList.jsx';
import RatingsMeta from './components/RatingsBreakdown.jsx';
import axios from 'axios';

class Ratings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item_id: 59557,
      ratings: [{review_id: 1, summary: 'summary1', body: 'body1'}, {review_id: 2, summary: 'summary2', body: 'body2'}],
      ratings_meta: {}
    };
    this.getAllReviews = this.getAllReviews.bind(this);
    this.getReviewsMeta = this.getReviewsMeta.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  componentDidMount(props){
    this.getAllReviews(this.props.itemid, (error, result) => {
      if (error) {
        console.log('client reports retrieve reviews error: ', error);
      } else {
        this.setState({ratings: result});
      }
    })

    this.getReviewsMeta(this.props.itemid, (error, result) => {
      if (error) {
        console.log('client reports retrieve reviews meta error: ', error);
      } else {
        this.setState({ratings_meta: result});
      }
    })
  }

  getAllReviews(item_id, callback) {
    axios.get('/ratings', {
      headers : {
        "item_id" : item_id
      }
    })
      .then((response) => {
        callback(null, response.data);
      })
      .catch((error) => {
        console.log('ratings list failure in client from axios: ', error);
        callback(error);
      })
  }

  getReviewsMeta(item_id, callback) {
    axios.get('/reviews/meta', {
      headers : {
        "item_id" : item_id
      }
    })
      .then((response) => {
        callback(null, response.data);
      })
      .catch((error) => {
        console.log('ratings meta failure in client from axios: ', error);
        callback(error);
      })
  }

  render(props) {

    return (
      <div data-testid="ratings" className="ratings-widget">
        <a id="reviews-link"></a>
        <h3>RATINGS & REVIEWS</h3>
        <br></br><RatingsMeta className="ratings_meta" ratings_meta={this.state.ratings_meta}></RatingsMeta><RatingsList className="ratings_list" ratings={this.state.ratings}></RatingsList>
      </div>
    );
  }
}

export default Ratings;