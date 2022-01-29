import React from 'react';
import $ from 'jquery';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faStar} from '@fortawesome/free-solid-svg-icons';

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
    this.handleCardClick(this.state.item.id)
  }

  handleStarClick(e) {
    e.preventDefault()
    this.sendItemFeatures(this.state.item.features)
  }

  render() {
    if (this.state.type === 'related') {
      return (
        <div
          className='product_card related_product'
          id={this.state.id}
          onClick={this.cardClickHandler}
          style={{
            position: 'relative',
            height: '400px',
            width: '300px'
          }}
          >
          <span>
            <img
              className="related_product_image"
              src={this.state.item.thumbnail || null}
              style={{
                width: 'auto'
              }}
            />

          <FontAwesomeIcon
              className="actionButton"
              icon={faStar}
              onClick={this.handleStarClick}>}>
          </FontAwesomeIcon>

            <div
              style={{
                position: 'absolute',
                bottom: '0',
                left: '2',
                width: 'auto',
                height: 'auto',
                padding: '2px'
              }}
            >

              <div
                style={{
                  fontFamily: 'roboto',
                  fontSize: '20px',
                  }} >
                {this.state.item.category}
              </div>

              <div
                style={{
                  fontSize: '24px',
                  fontWeight: 'bold'}} >
                    {this.state.item.name}: {this.state.item.slogan}
              </div>

              <div
                style={{
                  fontSize: '20px'
                }}>
                  Price: ${this.state.item.default_price}
              </div>

            </div>

          </span>

        </div>
      )
    } else {
      console.log('This should render the outfit card')
      return (
      <div
        className="product_card"
        id={this.state.id}
        >

        <div
          className={"xButton"}
          onClick={this.handleXClick}>
          X
        </div>

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
