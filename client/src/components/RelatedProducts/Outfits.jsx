import React from 'react';
import $ from 'jquery';
import ProductCard from './Product-Card.jsx';
import { Carousel } from '@trendyol-js/react-carousel';
import { Item } from  './Product-Card.jsx';

class Outfits extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      outfit: [],
      outfitDetails: [{item: 1}]
    };
  }

  UNSAFE_componentWillReceiveProp({ outfitDetails }) {
    this.setState({ outfitDetails });
    setTimeout(() => {
      console.log('This is the new state: ', this.state)
      this.forceUpdate()
    },20)
  }

  render() {
    if (!this.state.outfit.length) {
      return <div></div>
    } else {
      console.log('This should be working')
      return (
        <div key={Math.random()}>
          <Carousel
            show={3.5}
            slide={3}
            transition={0.5}
          >
            {this.state.outfitDetails.map(item => {
              return (
                <ProductCard
                  key={Math.random()}
                  type={'outfit'}
                  item={item}
                  handleXClick={this.handleXClick}
                />
              )
            })}
          </Carousel>
        </div>
      )

    }
  }
}

export default Outfits;
