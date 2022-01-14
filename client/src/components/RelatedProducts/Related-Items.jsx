import React from 'react';
import $ from 'jquery';
import ProductCard from './Product-Card.jsx';
import { Carousel } from '@trendyol-js/react-carousel';
import { Item } from './Product-Card.jsx';

class RelatedItems extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentItem: props.itemId,
      relatedItems: []
    };
    this.changeProduct = props.changeProduct;
  }

  componentDidMount() {
    $.ajax({
      url: '/relatedItems',
      method: 'GET',
      data: { item_id: this.state.currentItem },
      success: data => {
        this.setState({ relatedItems: data })
      }
    })
  }

  render() {
    console.log('State: ', this.state)
    if (!this.state.relatedItems.length) {
      return <div className="blank_Load">Testing</div>
    }
    let i = 0;
    return (
      <div onClick={this.onclick}>
      <Carousel
        show={3.5}
        slide={3}
        transition={0.5}
        >
        {this.state.relatedItems.map(item => {
          i++;
          console.log('This should work??', item.id)
          return (
          <ProductCard
            // key={item.id}
            id={item.id}
            type={'related'}
            item={item}
            changeProduct={this.changeProduct}
          />)
        })}
      </Carousel>
      </div>
    )
  }
}

export default RelatedItems;
