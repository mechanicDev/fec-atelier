import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import _ from 'underscore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';

import Overview from './components/Overview/Overview.jsx';
import QA from './components/QA/QA.jsx';
import Ratings from './components/Ratings/Ratings.jsx';
import RelatedItems from './components/RelatedProducts/Related-Items.jsx';
import Outfits from './components/RelatedProducts/Outfits.jsx';

import ClickTrackerOverview from './components/Overview/components/ClickTrackerOverview.jsx';
import ClickTracker from './components/ClickTracker.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item_id: Math.floor(Math.random() * (60563 - 59553 + 1)) + 59553,
      features: [],
      myOutfit: [],
      //item_id: Math.floor(Math.random() * (60563 - 59553 + 1)) + 59553,
      item_id: 59557,
      myOutfit: [],
      darkmode: false
    };
    this.changeProductOnCardClick = this.changeProductOnCardClick.bind(this);
  }

  changeProductOnCardClick(id) {
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

  darkModeToggle = (e) => {
    this.setState((state, props) => ({
      darkmode: !state.darkmode
    }))
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

    let darkModeStyle = this.state.darkmode ? {
      'background-color': 'rgb(29, 29, 29)',
      'color': 'rgb(221, 221, 221)'
  } : null;

    return (
      <div style={darkModeStyle}>
        <h1>Atelier</h1>
        <FontAwesomeIcon onClick={this.darkModeToggle} className="darkmode-btn" icon={this.state.darkmode ? faSun : faMoon}></FontAwesomeIcon>
        <div className="main">
          <div className="overview-widget">
            <ClickTrackerOverview render={sendMetrics => {
              return <Overview itemid={this.state.item_id}
              addToOutfit={this.addToOutfit}
              render={sendMetrics}/>
            }} />
          </div>
          <div>
            <ClickTracker render={sendMetrics => {
              return <QA itemid={this.state.item_id} render={sendMetrics} />
            }} />
          </div>
          <div className="ratings">
            <Ratings itemId={this.state.item_id} />
          </div>
        </div>
        <div>
          <h3>Related Products</h3>
          <RelatedItems
            itemId={this.state.item_id}
            features={this.state.features}
            changeProductOnCardClick={this.changeProductOnCardClick} />
        </div>
        <div>
          <Outfits itemId={this.state.item_id} />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
