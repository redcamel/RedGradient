/*
 *
 *  * RedGL - MIT License
 *  * Copyright (c) 2021~ By RedCamel(webseon@gmail.com)
 *  * https://github.com/redcamel/RedGradient
 *
 */
import React from "react";
import RedNumber from "../../../../core/RedNumber.jsx";

class RedCanvasFilterInvert extends React.Component {
  constructor(props) {
    super(props);
  }

  getCss(filterData) {
    return RedCanvasFilterInvert.getCss(filterData)
  }

  render() {
    const rootComponent = this.props.rootComponent;
    const filterData = this.props.filterData
    return <div>
      <div style={{display: 'flex', justifyContent: 'space-between',alignItems: 'center'}}>
        amount <RedNumber
          step={0.1}
          value={filterData['values']['amount'] || 0}
          HD_onInput={e => {
            filterData['values']['amount'] = e.target.value;
            filterData['css'] = this.getCss(filterData)
            rootComponent.setState({});
          }}/>
      </div>
    </div>;
  }
}

RedCanvasFilterInvert.getCss = filterData => {
  return `invert(${filterData['values']['amount']})`
}
RedCanvasFilterInvert.getNewDataValues = () => {
  return {
    amount: 1
  }
}
export default RedCanvasFilterInvert;
