import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import _ from 'underscore';

import Overview from './components/Overview/Overview.jsx';
import QA from './components/QA/QA.jsx';
import Ratings from './components/Ratings/Ratings.jsx';
import RelatedItems from './components/RelatedProducts/Related-Items.jsx';
import Outfits from './components/RelatedProducts/Outfits.jsx';

import ClickTrackerOverview from './components/Overview/components/ClickTrackerOverview.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // item_id: Math.floor(Math.random() * (60563 - 59553 + 1)) + 59553,
      item_id: 59557,
      myOutfit: []
    };
    this.changeProduct = this.changeProduct.bind(this);
  }

  changeProduct(id) {
    console.log('This is still running atleast')
    this.setState({ item_id: id });
  }

  addToOutfit = (sku) => {
    let newOutfit = this.state.myOutfit
    _.contains(this.state.myOutfit, sku) ?
      (newOutfit.splice(newOutfit.indexOf(sku), 1),
        this.setState((state, props) => ({
          myOutfit: newOutfit
        }))) :
      this.setState((state, props) => ({
        myOutfit: state.myOutfit.concat([sku])
      }))
  }

  render() {
    return (
      <div>
        <h1>Atelier</h1>
        <div className="main">
          <div className="overview-widget">
            {/* <ClickTrackerOverview render={sendMetrics => {
              return <Overview itemid={this.state.item_id}
              addToOutfit={this.addToOutfit}
              render={sendMetrics}/>
            }} /> */}
          </div>
          {/* <QA itemid={this.state.item_id} /> */}
          <div className="ratings">
            {/* <Ratings itemId={this.state.item_id} /> */}
          </div>
        </div>
        <div>
          <RelatedItems
            itemId={this.state.item_id}
            changeProduct={this.changeProduct} />
        </div>
        <div>
          {/* <Outfits itemId={this.state.item_id} /> */}
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
