import React from 'react';

let QASearch = (props) => {
  return <div className="qa-search-bar">
    <input type="text" onChange={props.searchHandler}></input>
  </div>;
}

export default QASearch;
