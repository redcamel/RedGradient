/*
 *
 *  * RedGL - MIT License
 *  * Copyright (c) 2021~ By RedCamel(webseon@gmail.com)
 *  * https://github.com/redcamel/RedGradient
 *
 */
import React from "react";
import RedNumber from "../../../../core/RedNumber.jsx";
import getUUID from "../../../../getUUID.js";

class RedCanvasFilterContrast extends React.Component {
  constructor(props) {
    super(props);
  }

  getCss(filterData) {
    return RedCanvasFilterContrast.getCss(filterData)
  }

  render() {
    const rootComponent = this.props.rootComponent;
    const filterData = this.props.filterData
    return <div>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        amount <RedNumber
        step={0.001}
        value={filterData['values']['amount'] || 0}
        HD_onInput={e => {
          filterData['values']['amount'] = +e.target.value;
          filterData['css'] = this.getCss(filterData)
          rootComponent.updateRootState({});
        }}/>
      </div>
    </div>;
  }
}

RedCanvasFilterContrast.getCss = filterData => {
  return `contrast(${filterData['values']['amount']})`
}
RedCanvasFilterContrast.getNewDataValues = () => {
  return {
    amount: 0.5
  }
}
export default RedCanvasFilterContrast;
