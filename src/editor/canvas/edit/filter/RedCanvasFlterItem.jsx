/*
 *
 *  * RedGL - MIT License
 *  * Copyright (c) 2021~ By RedCamel(webseon@gmail.com)
 *  * https://github.com/redcamel/RedGradient
 *
 */

import React from "react";
import RedSelect from "../../../../core/RedSelect.jsx";
import RedCanvasFilterBlur from "./RedCanvasFilterBlur.jsx";
import RedCanvasFilterGrayScale from "./RedCanvasFilterGrayScale.jsx";
import RedCanvasFilterNormal from "./RedCanvasFilterNormal.jsx";
import RedCanvasFilterBrightness from "./RedCanvasFilterBrightness.jsx";
import RedCanvasFilterContrast from "./RedCanvasFilterContrast.jsx";
import RedCanvasFilterInvert from "./RedCanvasFilterInvert.jsx";
import RedCanvasFilterSaturate from "./RedCanvasFilterSaturate.jsx";
import RedCanvasFilterSepia from "./RedCanvasFilterSepia.jsx";

const filterList = [
  'normal', 'blur', 'brightness', 'contrast', 'grayScale', 'invert', 'saturate', 'sepia'
];
const filterComponent = {
  normal: RedCanvasFilterNormal,
  blur: RedCanvasFilterBlur,
  brightness: RedCanvasFilterBrightness,
  contrast: RedCanvasFilterContrast,
  grayScale: RedCanvasFilterGrayScale,
  invert: RedCanvasFilterInvert,
  saturate: RedCanvasFilterSaturate,
  sepia: RedCanvasFilterSepia
}

class RedCanvasFilter extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const rootComponent = this.props.rootComponent;
    const filterData = this.props.filterData
    const TargetFilterComponent = filterComponent[filterData['type']]
    return <div>
      <div style={style.container}>
        type
        <RedSelect value={filterData['type']} options={filterList} HD_change={e => {
          filterData['type'] = e.target.value;
          filterData['values'] = filterComponent[filterData['type']].getNewDataValues()
          rootComponent.setState({});
        }}/>
      </div>
      {TargetFilterComponent ? <TargetFilterComponent rootComponent={rootComponent} filterData={filterData}/> : ''}
      <div style={style.divide}/>
    </div>;
  }
}

export default RedCanvasFilter;
RedCanvasFilter.FILTER_COMPONENT_MAP = filterComponent
const style = {
  container: {
    display: 'flex',
    alignItems: 'center'
  },
  divide: {
    margin: '5px 0px',
    height: '2px',
    background: '#4e4e4e',
    borderTop: '1px solid #000'
  }
};
