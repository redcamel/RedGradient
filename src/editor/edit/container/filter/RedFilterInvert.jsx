/*
 *
 *  * RedGL - MIT License
 *  * Copyright (c) 2021~ By RedCamel(webseon@gmail.com)
 *  * https://github.com/redcamel/RedGradient
 *
 */
import React from "react";
import RedNumber from "../../../../core/RedNumber.jsx";

class RedFilterInvert extends React.Component {
  static getCss;


  getCss(filterData) {
    return RedFilterInvert.getCss(filterData);
  }

  render() {
    const rootComponent = this.props.rootComponent;
    const filterData = this.props.filterData;
    return <div>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        amount <RedNumber
        step={0.005}
        value={filterData['values']['amount'] || 0}
        HD_onInput={e => {
          filterData['values']['amount'] = +e.target.value;
          filterData['css'] = this.getCss(filterData);
          rootComponent.updateRootState({});
        }} />
      </div>
    </div>;
  }
}

RedFilterInvert.getCss = filterData => {
  return `invert(${filterData['values']['amount']})`;
};
RedFilterInvert.getNewDataValues = () => {
  return {
    amount: 1
  };
};
export default RedFilterInvert;