import React from 'react';
import Modal from 'react-modal';
import _ from 'underscore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

class ImageGallery extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modalOpen: false,
      zoom: false
    }
  }

  openModal = (e) => {
    e.preventDefault();
    this.props.render(e);
    this.setState({
      modalOpen: true
    });
  }

  closeModal = (e) => {
    this.setState({
      modalOpen: false
    });
  }

  zoomIn = (e) => {
    e.preventDefault();
    this.props.render(e);
    this.closeModal();
    if (this.state.zoom === false) {
      this.setState((state, props) => ({
        zoom: !state.zoom
      }))
    } else {
      this.setState((state, props) => ({
        zoom: !state.zoom
      }))
    }
  }

  zoomOut = (e) => {
    e.preventDefault();
    this.props.render(e);
    if (this.state.zoom === false) {
      this.setState((state, props) => ({
        zoom: !state.zoom
      }))
    } else {
      this.setState((state, props) => ({
        zoom: !state.zoom
      }))
    }
  }

  zoomImage = (e) => {
    let magnifying_area = document.getElementById('magnifying_area');
    let magnifying_img = document.getElementById('magnifying_img');

    let clientX = e.clientX - magnifying_area.offsetLeft;
    let clientY = e.clientY - magnifying_area.offsetTop;

    let mWidth = magnifying_area.offsetWidth;
    let mHeight = magnifying_area.offsetTop;

    clientX = clientX / mWidth * 200;
    clientY = clientY / mHeight * 200;

    magnifying_img.style.transform = `translate(-${clientX}%, -${clientY}%) scale(1.4)`;
  }

  unzoomImage = (e) => {
    this.props.render(e);
    let magnifying_area = document.getElementById('magnifying_area');
    let magnifying_img = document.getElementById('magnifying_img');

    magnifying_img.style.transform = 'translate(-50%, -50%) scale(1)';
  }

  render() {
    let currentPhoto = this.props.currentPhoto
    let subtractor = this.props.styleData[this.props.selectedStyle] !== undefined ? this.props.styleData[this.props.selectedStyle].photos.length - 7 : null
    let thumbnailIndex = currentPhoto > subtractor && subtractor > 0 ? currentPhoto - subtractor : 0;
    let range = this.props.styleData[this.props.selectedStyle] !== undefined ?
    this.props.currentPhoto < this.props.styleData[this.props.selectedStyle].photos.length - 7 ?
    this.props.styleData[this.props.selectedStyle].photos.slice(this.props.currentPhoto, this.props.currentPhoto + 7)
    : (this.props.styleData[this.props.selectedStyle].photos.slice(-7)) : null

    return (
      <>
        {this.state.zoom ? (
        <figure id="magnifying_area">
          <img alt="magnified main image" id="magnifying_img" src={this.props.photo} onClick={this.zoomOut} onMouseMove={this.zoomImage} onMouseLeave={this.unzoomImage}></img>
        </figure>
         ) : null}
        <div className="image-gallery" data-testid="image-gallery">
          <div className="image-gallery-container">
            <div className="thumbnail-list">
              {this.props.styleData[this.props.selectedStyle] !== undefined ? _.map(range, (photo, index) => {
                return thumbnailIndex === index ?
                  (<img alt="image thumbnail" className="image-gallery-thumbnail" src={photo.url} key={index} id={index} style={{border: '3px solid #8e9efa'}}></img>) :
                  (<img alt="image thumbnail" className="image-gallery-thumbnail" src={photo.url} key={index} id={index} onClick={this.props.changePhoto}></img>)
                }) : null
              }
            </div>
            <img alt="main gallery image" className="main-gallery" src={this.props.photo} onClick={this.openModal}></img>
            {this.props.currentPhoto === 0 ?
            <FontAwesomeIcon className='backward' onClick={this.props.backward} icon={faAngleLeft} size='2x' style={{display: 'none'}}></FontAwesomeIcon> :
            <FontAwesomeIcon className='backward' onClick={this.props.backward} icon={faAngleLeft} size='2x'></FontAwesomeIcon>}
            {this.props.styleData[this.props.selectedStyle] !== undefined && this.props.currentPhoto === this.props.styleData[this.props.selectedStyle].photos.length - 1 ?
              <FontAwesomeIcon className='forward' onClick={this.props.forward} icon={faAngleRight} size='2x' style={{display: 'none'}}></FontAwesomeIcon> :
              <FontAwesomeIcon className='forward' onClick={this.props.forward} icon={faAngleRight} size='2x'></FontAwesomeIcon>
            }
          </div>
        </div>

        <Modal isOpen={this.state.modalOpen} ariaHideApp={false} className="modal-gallery">
          <button className="modal-close" onClick={this.closeModal}>Close</button>
          <div className="modal-buttons">
            <FontAwesomeIcon className='modal-back' onClick={this.props.backward} icon={faAngleLeft} size='2x' color="white"></FontAwesomeIcon>
            <FontAwesomeIcon className='modal-forward' onClick={this.props.forward} icon={faAngleRight} size='2x' color="white"></FontAwesomeIcon>
            <img alt="modal main image" className="modal-image" src={this.props.photo} onClick={this.zoomIn}></img>
          {this.props.styleData[this.props.selectedStyle] !== undefined ? _.map(range, (photo, index) => {
            return thumbnailIndex === index ?
              (<span className="modal-radio-button" type="radio" key={index} id={index} style={{color: '#8e9efa'}}>.</span>) :
              (<span className="modal-radio-button" type="radio" key={index} id={index} onClick={this.props.changePhoto}>.</span>)
              }) : null
            }
          </div>
        </Modal>
      </>
    )
  }
}

export default ImageGallery;
