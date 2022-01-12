import React from 'react';
import axios from 'axios';
import _ from 'underscore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faShoppingCart } from '@fortawesome/free-solid-svg-icons';

class AddToCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sku: 2122777,
      selectedSize: undefined,
      selectedQuantity : 0,
      totalQuantity: null,
      myOutfit: []
    };
  }

  addToCart = () => {
    if (this.state.selectedSize === undefined) {
      alert('Please select a size');
      return;
    }
    axios.post('/cart', {
      'sku_id' : this.state.sku
    })
    .then((result) => {
      alert(`x${this.state.selectedQuantity} ${this.props.productName} size ${this.state.selectedSize} added to Cart`);
    })
  }

  addToMyOutfit = () => {
    let newOutfit = this.state.myOutfit
    _.contains(this.state.myOutfit, this.state.sku) ?
      (newOutfit.splice(newOutfit.indexOf(this.state.sku), 1),
        this.setState((state, props) => ({
          myOutfit: newOutfit
        }), () => {
          this.props.addToOutfit(this.state.sku)
        })) :
      this.setState((state, props) => ({
        myOutfit: state.myOutfit.concat([state.sku])
      }), () => {
        this.props.addToOutfit(this.state.sku)
      })
  }

  selectSize = (e) => {
    let entries = Object.entries(this.props.styleData.skus)
    for (let i = 0; i < entries.length; i++) {
      if (entries[i][1].size === e.target.value) {
        this.setState({
          selectedSize: Number(e.target.value),
          sku: Number(entries[i][0]),
          totalQuantity: entries[i][1].quantity,
          selectedQuantity: 1
        })
      }
    }
  }

  getSizes = () => {
    let sizes = [];
    let values = _.values(this.props.styleData.skus)
    for (let i = 0; i < values.length; i++) {
      sizes.push(values[i].size)
    };
    return sizes;
  }

  selectQuantity = (e) => {
    this.setState({
      selectedQuantity: e.target.value
    })
  }

  mapQuantity = () => {
    let quantity = []
    for (let i = 1; i <= this.state.totalQuantity; i++) {
      if (i <= 15) {
        if (i <= this.state.totalQuantity) {
          quantity.push(i)
        }
      }
    }
    return quantity;
  }

  render() {
    return (
      <div className="add-to-cart" data-testid="add-to-cart">
        <div className="size-selector"> Select a Size
          <select value={this.state.selectedSize} onChange={this.selectSize}>
            <option value="default">-</option>
            {this.props.styleData !== undefined ? _.map(this.getSizes(), (size, index) => {
              return (<option key={index} value={size}>{size}</option>)
            }) : null
          }
          </select>
        </div>

        <div className="qty-selector"> Select a Quantity
          <select onChange={this.selectQuantity} disabled={!this.state.selectedSize}>
            {!this.state.selectedSize ? <option value="default">-</option> :
              this.state.totalQuantity !== 0 ? _.map(this.mapQuantity(), (number, index) => {
                return (<option key={index} value={number}>{number}</option>)
                  }) : <option value='outOfStock'>Out Of Stock</option>}
          </select>
        </div>
        <div> Add To Cart
          <FontAwesomeIcon className="add-button" icon={faShoppingCart} onClick={this.addToCart}></FontAwesomeIcon>
        </div>

        <div className="add-to-my-outfit"> Add To My Outfit
          <FontAwesomeIcon className="add-button" icon={faStar} onClick={this.addToMyOutfit}></FontAwesomeIcon>
        </div>
      </div>
    )
  }
}

export default AddToCart;
