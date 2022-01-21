import React from 'react';
import $ from 'jquery';

class ProductCard extends React.Component {
  constructor(props) {
    // console.log('Props at the card level: ', props)
    super(props)
    this.state = {
      type: props.type,
      item: props.item,
      showModal: false
    };
    this.cardClickHandler = this.cardClickHandler.bind(this);
    this.handleCardClick = props.handleCardClick;
    this.handleStarClick = this.handleStarClick.bind(this);
    this.sendItemFeatures = props.handleStarClick;
  }

  cardClickHandler(e) {
    e.preventDefault();
    console.log('This is the ID: ', this.state.item.id)
  }

  handleStarClick(e) {
    e.preventDefault()
    this.sendItemFeatures(this.state.item.features)
  }

  render() {
    // if (!this.state.item.styles[0].photos[0].thumbnail_url) {
    //   this.state.item.styles[0].photos[0].thumbnail_url =
    // }
    // console.log('State Props: ', this.state)
    if (this.state.type === 'related') {
      return (
        <div
          className='product_card related_product'
          id={this.state.id}
          onClick={this.cardClickHandler}>
          <div
            className={"actionButton"}
            onClick={this.handleStarClick}>
            ActionButton
          </div>
          <span>
            <img
              className="related_product_image"
              src={this.state.item.thumbnail || null}
            />
            <ul>
              <li>Catergory: {this.state.item.category}</li>
              <li>Name: {this.state.item.name}</li>
              <li>Price: ${this.state.item.default_price}</li>
              <li>Slogan: {this.state.item.slogan}</li>
            </ul>
          </span>

        </div>
      )
    } else {
      return (
      <div className="product_card">
        <div>
          <div>Pending Item Image</div>
          <img placeholder="Images Will Import as outfit items are added"/>
        </div>
        <ul>
          <li key={this.state.i}>Item Catergory</li>
          <li key={this.state.i}>Item Name</li>
          <li key={this.state.i}>Item Price</li>
          <li key={this.state.i}>Fancy Item Slogan</li>
        </ul>
      </div>
      )
    }
  }
};

export default ProductCard;
