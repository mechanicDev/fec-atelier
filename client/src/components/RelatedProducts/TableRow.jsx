import React from 'react';

let TableRow = props => {
  return (
    <div>
        <span>{props.values[0] || 'No Value'}</span>
        <span>{props.featureName}</span>
        <span>{props.values[1] || 'No Value'}</span>
    </div>
  )}

export default TableRow