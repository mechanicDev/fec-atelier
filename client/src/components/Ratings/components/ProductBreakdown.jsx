import React from 'react';
import ProductBreakdownItem from './ProductBreakdownItem.jsx';

const ProductBreakdowns = (props) => {

    let product_breakdowns = props.characteristics_list.map((characteristic) => {
      return (
          <ProductBreakdownItem key={characteristic.id} char_count={characteristic.value} characteristic={characteristic.inner_characteristic}></ProductBreakdownItem>
      )
    });

    return(
      <div>
        <ul className="product_breakdown">{product_breakdowns}</ul>
      </div>
    )

}

export default ProductBreakdowns;
