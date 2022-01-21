import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSearch} from '@fortawesome/free-solid-svg-icons'

let SearchQuestion = (props) => {
  return <div data-testid="search-question" className="qa-search">
    <input type="text" placeholder="HAVE A QUESTION? SEARCH FOR ANSWERS..." className="qa-search-bar"
      onChange={props.searchQuestions} onClick={props.render}>
    </input>
    <FontAwesomeIcon className="q-search-icon" icon={faSearch}></FontAwesomeIcon>
  </div>;
}

export default SearchQuestion;
