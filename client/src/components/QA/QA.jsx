import React from 'react';
import $ from 'jquery';

import QASearch from './components/QASearch.jsx';
import QAView from './components/QAView.jsx';

class QA extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      searchText: ''
    };
  }

  searchHandler (e) {
    e.preventDefault();

    // update state with search text
    let text = e.target.value;
    this.setState({
      questions: this.state.questions,
      //questions to be changed, should update on text change
      searchText: text
    })
  }

  componentDidMount() {
    $.ajax({
      url: '/qa/questions/'.concat(this.props.itemid),
      method: 'GET',
      success: (data) => {
        // console.log('Server GET Success ', data);
        this.setState({
          questions: data.results,
          searchText: this.state.searchText
        })
      }
    })
  }

  render() {
    return (
      <div>
        <h4>Questions and Answers</h4>
        <QASearch searchHandler={this.searchHandler.bind(this)}/>
        <QAView questions={this.state.questions} />
      </div>
    )
  }
}

export default QA;
