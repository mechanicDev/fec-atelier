import React from 'react';
import IndividualInputProductBreakdown from './IndividualInputProductBreakdown.jsx';

const InputProductBreakdowns = (props) => {

  //console.log('props in input: ', props);

  if (props.characteristics) {

    const outerCharacteristics = props.characteristics;
    let characteristicsList = [];
    let characteristicsObj = {};

    for (const key in outerCharacteristics) {
      characteristicsList.push(outerCharacteristics[key].inner_characteristic);
      characteristicsObj[key] = outerCharacteristics[key].id;
    }

    //console.log('characteristics object: ', characteristicsObj);

    let listItems = characteristicsList.map((characteristic) => {
        return (
          <IndividualInputProductBreakdown key={characteristic} characteristic={characteristic} 
          characteristics_obj={characteristicsObj} update_characteristics={props.update_characteristics}/>
        )
      });

      return (
        <ul className="list">
          {listItems}
        </ul>
      );
  }
}

export default InputProductBreakdowns;
