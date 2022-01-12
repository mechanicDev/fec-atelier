import React from 'react';
import _ from 'underscore';
import { Checkmark } from 'react-checkmark';

class StyleSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isChecked: true
    };
  }

  render() {
    const checkmark = <Checkmark size='15px' color='#8e9efa'/>
    return (
      <div className="styles-info" data-testid="style-selector">
        <h4>Style {this.props.styleName}</h4>
        <div className="style-img-container">
          {_.map(this.props.styleImgs, (style, index) => {
            if (index % 4 === 0) {
              return (
              <span key={index} className="style-img-background">
                <br></br>
                {this.props.selectedStyle === index && checkmark}
                <img className="style-img" id={index} src={style} onClick={this.props.selectStyle}></img>
              </span>)
            } else {
              return (
              <span key={index} className="style-img-background">
                {this.props.selectedStyle === index && checkmark}
                <img className="style-img" id={index} src={style} onClick={this.props.selectStyle}></img>
              </span>)
            }
          })}
        </div>
      </div>
    )
  }
}

export default StyleSelector;
