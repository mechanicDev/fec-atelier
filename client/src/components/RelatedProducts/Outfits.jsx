import React from 'react';
import $ from 'jquery';
import ProductCard from './Product-Card.jsx';
import { Carousel } from '@trendyol-js/react-carousel';
import { Item } from  './Product-Card.jsx';

class Outfits extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      outfit: []
    };
  }

  UNSAFE_componentWillReceiveProps({ outfit }) {
    this.setState({ outfit });
    setTimeout(() => {
      console.log('The Outfit at the outfit ajax call', this.state.outfit)
      $.ajax({
        url: '/outfit',
        method: 'GET',
        data: { outfit: this.state.outfit },
        success: response => {
          console.log('This is the response: ', response)
        }
      })
    }, 60)
  }

  render() {
    if (!this.state.outfit.length) {
      return <div></div>
    }
    let i = 0;
    return (
      <Carousel
        show={3.5}
        slide={3}
        transition={0.5}
        >
          {}
      </Carousel>
    )
  }
}

export default Outfits;
