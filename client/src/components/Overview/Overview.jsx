import React from 'react';
import axios from 'axios';

import ProductInfo from './components/ProductInfo.jsx';
import StyleSelector from './components/StyleSelector.jsx';
import AddToCart from './components/AddToCart.jsx';
import ImageGallery from './components/ImageGallery.jsx';

class Overview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productData : '',
      styleData : ''
    };
  }

  componentDidMount() {
    axios.get(`/products/${this.props.itemid}`)
      .then((result) => {
        this.setState({
          productData : result.data
        });
      })
      .catch((err) => {
        console.error(err);
      });

    axios.get(`products/${this.props.itemid}/styles`)
      .then((result) => {
        this.setState({
          styleData : result.data
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  render() {
    return (
      <div>
        <div>
          <h1>Overview Widget Here</h1>
          <ProductInfo itemid={this.props.itemid} productData={this.state.productData}/>
          <StyleSelector styleData={this.state.styleData} />
          <AddToCart styleData={this.state.styleData} />
          <ImageGallery styleData={this.state.styleData}/>
        </div>
      </div>
    )
  }
}

export default Overview;
