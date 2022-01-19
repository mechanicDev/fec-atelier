import React from 'react';

let TableRow = (item1, catergory, item2) => {
  (<tr>
    <th>Value for item1: {item1}</th>
    <th>Has Thing?: {catergory}</th>
    <th>Value for item2: {item2}</th>
  </tr>)
}

export default TableRow