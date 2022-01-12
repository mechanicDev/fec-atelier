import React from 'react';
import axios from 'axios';
import _ from 'underscore';
import StarRating from '../../Ratings/components/StarRating.jsx';
import "regenerator-runtime/runtime.js";

class ProductInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      starCount: 0,
      reviews: {}
    };
    this.getStarCount = this.getStarCount.bind(this);
    this.grabReviews = this.grabReviews.bind(this);
    this.calculateStarRating = this.calculateStarRating.bind(this);
    this.getPrice = this.getPrice.bind(this);
  }

  async grabReviews() {
    await axios.post(`/reviews/meta`, {
      data : {
        product_id : this.props.itemid
      }
    })
    .then((reviewsData) => {
      this.setState({
        reviews : reviewsData.data.ratings
      });
      return this.getStarCount(reviewsData.data.ratings);
    })
    .then((starsList) => {
      this.setState({
        starCount: starsList
      });
    });
  }

  getStarCount(listOfStars) {
    return _.values(listOfStars);
  }

  calculateStarRating() {
    let totalStars = 0;
    let actual = 0;
    let outOfFiveStars;
    totalStars = (_.reduce(this.state.starCount, (memo, num) => {
      return parseInt(memo) + parseInt(num);
    }, 0)) * 5;
    for (let i = 0; i < this.state.starCount.length; i++) {
      actual += ((i+1) * parseInt(this.state.starCount[i]));
    };
    outOfFiveStars = Math.ceil(((actual/totalStars) * 5) / .25) * .25;
    return outOfFiveStars.toString();
  }

  getPrice() {
    let ogStyles = {
      'textDecoration': 'line-through'
    }
    let saleStyles = {
      'color': 'red'
    }
    if (this.props.salePrice !== null) {
      return (
        <div>
          <div className="og-price" style={ogStyles}>{this.props.originalPrice}</div>
          <div className="sale-price" style={saleStyles}>{this.props.salePrice}</div>
        </div>
      )
    } else {
      return (
        <div>
          <div className="og-price">{this.props.originalPrice}</div>
          <div className="sale-price">{this.props.salePrice}</div>
        </div>
      )
    }
  }

  componentDidMount() {
    this.grabReviews();
    this.grabReviews();
    this.getStarCount(this.state.reviews);
  }

  render() {

    let numReviews = _.reduce(this.state.starCount, (memo, num) => {
      return parseInt(memo) + parseInt(num);
        }, 0)

    return (
      <div className="product-info" data-testid="product-info">
        <h4>Product Info</h4>
        {this.state.starCount.length ?
          <div className="star-rating" data-testid="star-rating">
            <StarRating star_rating={this.calculateStarRating()}></StarRating>
            <a href="#reviews-link">{` Read all ${numReviews} reviews`}</a>
          </div>
          : null
        }
        {this.props.productData ? <div>{this.props.productData.category}</div> : null}
        {this.getPrice()}
        {this.props.productData ? <div>{this.props.productData.name}</div> : null}
        {this.props.productData ? <div>{this.props.productData.description}</div> : null}
    </div>
    )
  }
}

export default ProductInfo;
