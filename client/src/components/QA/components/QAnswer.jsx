import React from 'react';

class QAnswer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answer: '',
      nickname: '',
      email: '',
      photos: ''
    };
  }

  render() {
    return (
      <div>
        put your answers here
      </div>
    )
  }
}

export default QAnswer;
