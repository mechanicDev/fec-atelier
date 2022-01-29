import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';



let TableRow = props => {
  if (props.values[0] && !props.values[1]) {
    let checkMark = '<div></div>'
  } else if (!props.values[0] && props.values[1]) {
    let checkMark = '<div></div>'
  }
  return (
    <div>
        <span
          style={{
            marginLeft:'20px'
          }}>
        {props.values[0] ||
          <FontAwesomeIcon
            className="checkMark"
            icon={faCheck}
          >
          </FontAwesomeIcon>}
      </span>

      <span
          style={{
            marginLeft:'20px'
          }}>
        {props.featureName ||
          <FontAwesomeIcon
            className="checkMark"
            icon={faCheck}
          >
          </FontAwesomeIcon>}
      </span>

      <span
          style={{
            marginLeft:'20px'
          }}>
        {props.values[1] ||
          <FontAwesomeIcon
            className="checkMark"
            icon={faCheck}
          >
          </FontAwesomeIcon>}
      </span>


    </div>
  )}

export default TableRow