import React from 'react';
import $ from 'jquery';
import ProductCard from './Product-Card.jsx';
import TableRow from './TableRow.jsx';
import { Carousel } from '@trendyol-js/react-carousel';
import { Item } from './Product-Card.jsx';
import ReactModal from 'react-modal';

class RelatedItems extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentItem: props.itemId,
      relatedItems: [],
      showModal: false,
      currentItemFeatures: props.features,
      combinedItemFeatures: {}
    };
    this.changeProductOnCardClick = props.changeProductOnCardClick;
    this.handleClick = this.handleClick.bind(this);
    this.closeModalOnClick = this.closeModalOnClick.bind(this);
    this.handleStarClick = this.handleStarClick.bind(this);
  }

  componentDidMount() {
    ReactModal.setAppElement('body');
    $.ajax({
      url: '/relatedItems',
      method: 'GET',
      data: { item_id: this.state.currentItem },
      success: data => {
        this.setState({ relatedItems: data })
      }
    })
  }

  handleClick(e) {
    this.setState({showModal: !this.state.showModal})
  }

  closeModalOnClick() {
    this.setState({showModal: false})
  }

  onModalOpen(e) {

  }

  handleStarClick(related) {
    let combined = {};
    let main = this.state.currentItemFeatures;

    for (let i=0; i < main.length; i++) {
      let currentFeature = main[i].feature;
      let currentItemFeatureValue = main[i].value;
      if(!combined.currentFeature) {
        combined[currentFeature] = [currentItemFeatureValue, null]
      }
    }

    for (let i = 0; i < related.length; i++) {
      let currentFeature = related[i].feature;
      let currentItemFeatureValue = related[i].value;
      if(!combined.currentFeature) {
        combined[currentFeature] = [null, currentItemFeatureValue];
      }
      else {
        combined[currentFeature] = [combined[currentFeature][0], currentItemFeatureValue]
      }
    }
    this.setState({
      combinedItemFeatures: combined,
      showModal: !this.state.showModal
    })
  }

  UNSAFE_componentWillReceiveProps({features}) {
    this.setState({currentItemFeatures: features})
  }

  render() {
    if (!this.state.relatedItems.length) {
      return <div key={this.props.itemId} className="blank_Load"></div>
    }
    return (
      <div onClick={this.onclick}>

        <ReactModal
          style={{
            overlay: {
              position: 'fixed',
              top: '20%',
              left: '25%',
              right: '25%',
              bottom: '20%',
              backgroundColor: 'White',
              border: '2px solid grey'
            }
          }}
            className={"ReactModal__Content"}
            bodyOpenClassName={"ReactModal__Body--open"}
            isOpen={this.state.showModal}
            onAfterOpen={this.onModalOpen}
            shouldCloseOnOverlayClick={true}
            onRequestClose={this.closeModalOnClick}
          >
            {Object.keys(this.state.combinedItemFeatures).map(feature => {
              return <TableRow
                key={feature}
                featureName={feature}
                values={this.state.combinedItemFeatures[feature]}/>
            })}
          </ReactModal>
      <Carousel
        show={3.5}
        slide={3}
        transition={0.5}
        >
        {this.state.relatedItems.map(item => {
          return (
          <ProductCard
            key={item.id}
            mainItem={this.props.itemId}
            type={'related'}
            item={item}
            handleCardClick = {this.changeProductOnCardClick}
            handleStarClick = {this.handleStarClick}
          />)
        })}
      </Carousel>
      </div>
    )
  }
}

export default RelatedItems;
