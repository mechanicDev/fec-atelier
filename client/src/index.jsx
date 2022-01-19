import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import _ from 'underscore';

import Overview from './components/Overview/Overview.jsx';
import QA from './components/QA/QA.jsx';
import Ratings from './components/Ratings/Ratings.jsx';
import RelatedItems from './components/RelatedProducts/Related-Items.jsx';
import Outfits from './components/RelatedProducts/Outfits.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item_id: Math.floor(Math.random() * (60563 - 59553 + 1)) + 59553,
      features: [],
      myOutfit: []
    };
    this.changeProduct = this.changeProduct.bind(this);
  }

  changeProduct(id) {
    this.setState({ item_id: id });
  }

  addToOutfit = (sku) => {
    let newOutfit = this.state.myOutfit
    _.contains(this.state.myOutfit, sku) ?
      (newOutfit.splice(newOutfit.indexOf(sku), 1),
        this.setState((state, props) => ({
          myOutfit: newOutfit
        }), () => {
          console.log('removed from my outfit :',this.state.myOutfit)
        })) :
      this.setState((state, props) => ({
        myOutfit: state.myOutfit.concat([sku])
      }), () => {
        console.log('added to my outfit :',this.state.myOutfit)
      })
  }

  componentDidMount() {
    console.log('This is running how many times???')
    $.ajax({
      url: `/products/${this.state.item_id}`,
      method: 'GET',
      success: data => {
        this.setState({features: data.features})
      }
    })
  };

  componentDidUpdate() {

  }

  render() {
    return (
      <div>
        {/* <h1>Atelier</h1> */}
        {/* <div className="main"> */}
          {/* <div className="overview-widget"> */}
            {/* <Overview itemid={this.state.item_id} */}
            {/* addToOutfit={this.addToOutfit}/> */}
          {/* </div> */}
          {/* <QA itemid={this.state.item_id} /> */}
          {/* <div className="ratings"> */}
            {/* <Ratings itemid={this.state.item_id} /> */}
          {/* </div>
        </div>
        <div> */}
          {/* <h3>Related Products</h3> */}
          <RelatedItems
            itemId={this.state.item_id}
            features={this.state.features}
            changeProduct={this.changeProduct} />
        {/* </div> */}
        {/* <div> */}
          {/* <Outfits itemId={this.state.item_id} /> */}
        {/* </div> */}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
