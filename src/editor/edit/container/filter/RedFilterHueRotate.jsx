/*
 *
 *  * RedGL - MIT License
 *  * Copyright (c) 2021~ By RedCamel(webseon@gmail.com)
 *  * https://github.com/redcamel/RedGradient
 *
 */
import React from "react";
import RedNumber from "../../../../core/RedNumber.jsx";

class RedFilterHueRotate extends React.Component {
  static getCss;


  getCss(filterData) {
    return RedFilterHueRotate.getCss(filterData);
  }

  render() {
    const rootComponent = this.props.rootComponent;
    const filterData = this.props.filterData;
    return <div>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        deg <RedNumber
        step={0.1}
        value={filterData['values']['deg'] || 0}
        HD_onInput={e => {
          filterData['values']['deg'] = +e.target.value;
          filterData['css'] = this.getCss(filterData);
          rootComponent.updateRootState({});
        }} />
      </div>
    </div>;
  }
}

RedFilterHueRotate.getCss = filterData => {
  return `hue-rotate(${filterData['values']['deg']}deg)`;
};
RedFilterHueRotate.getNewDataValues = () => {
  return {
    deg: 0
  };
};
export default RedFilterHueRotate;