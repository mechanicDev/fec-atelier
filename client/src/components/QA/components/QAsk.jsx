import React from 'react';

class QAsk extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: '',
      nickname: '',
      email: ''
    };
  }

  render() {
    return (
      <div>
        put your question here
      </div>
    )
  }
}

export default QAsk;
