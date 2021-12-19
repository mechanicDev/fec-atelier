import React from 'react';
import axios from 'axios';

class ProductInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: ''
    };
  }

  componentDidMount() {
    axios.post(`/reviews/meta`, {
      data : {
        product_id : this.props.itemid
      }
    })
      .then((reviewsData) => {
        this.setState({
          reviews : reviewsData.data.ratings
        })
      })
  }

  render() {
    return (
      <div className="product-info">Product Info</div>
    )
  }
}

export default ProductInfo;
