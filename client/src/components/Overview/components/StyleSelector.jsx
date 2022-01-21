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
    const checkmark = <Checkmark size='30px' color='#8e9efa'/>
    return (
      <div className="styles-info" data-testid="style-selector">
        <span className="style-name">Style > {this.props.styleName}</span>
        <div className="style-img-container">
          {_.map(this.props.styleImgs, (style, index) => {
              return (
              <span key={index} className="style-img-background">
                {this.props.selectedStyle === index && checkmark}
                <img alt="style type thumbnail" className="style-img" id={index} src={style} onClick={this.props.selectStyle}></img>
              </span>)
          })}
        </div>
      </div>
    )
  }
}

export default StyleSelector;
