/*
 *
 *  * RedGL - MIT License
 *  * Copyright (c) 2021~ By RedCamel(webseon@gmail.com)
 *  * https://github.com/redcamel/RedGradient
 *
 */
import React from "react";
import RedSelect from "../../../core/RedSelect.jsx";
import RedCanvasFilterBlur from "./RedCanvasFilterBlur.jsx";
import RedCanvasFilterGrayScale from "./RedCanvasFilterGrayScale.jsx";
import RedCanvasFilterNormal from "./RedCanvasFilterNormal.jsx";
import RedCanvasFilterBrightness from "./RedCanvasFilterBrightness.jsx";
import RedCanvasFilterContrast from "./RedCanvasFilterContrast.jsx";
import RedCanvasFilterInvert from "./RedCanvasFilterInvert.jsx";
import RedCanvasFilterSaturate from "./RedCanvasFilterSaturate.jsx";
import RedCanvasFilterSepia from "./RedCanvasFilterSepia.jsx";
import RedCanvasFilterDropShadow from "./RedCanvasFilterDropShadow.jsx";
import RedCanvasFilterHueRotate from "./RedCanvasFilterHueRotate.jsx";

const filterList = [
  'normal', 'blur', 'brightness', 'contrast', 'dropShadow', 'grayScale', 'hueRotate', 'invert', 'saturate', 'sepia'
];
const filterComponent = {
  normal: RedCanvasFilterNormal,
  blur: RedCanvasFilterBlur,
  brightness: RedCanvasFilterBrightness,
  contrast: RedCanvasFilterContrast,
  dropShadow: RedCanvasFilterDropShadow,
  grayScale: RedCanvasFilterGrayScale,
  hueRotate: RedCanvasFilterHueRotate,
  invert: RedCanvasFilterInvert,
  saturate: RedCanvasFilterSaturate,
  sepia: RedCanvasFilterSepia
};

class RedCanvasFilter extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const rootComponent = this.props.rootComponent;
    const filterData = this.props.filterData;
    const TargetFilterComponent = filterComponent[filterData['type']];
    return <div>
      <div style={style.container}>
        type
        <RedSelect value={filterData['type']} options={filterList} HD_change={e => {
          filterData['type'] = e.target.value;
          filterData['values'] = filterComponent[filterData['type']].getNewDataValues();
          rootComponent.updateRootState({});
        }} />
        <button
          style={style.buttonIcon}
          onClick={() => {
            const filterList = rootComponent.state.canvasInfo.filterList;
            filterList.splice(filterList.indexOf(filterData), 1);
            rootComponent.updateRootState({});
          }}
        >Del
        </button>
        <button
          style={style.buttonIcon}
          onClick={() => {
            const filterList = rootComponent.state.canvasInfo.filterList;
            filterList.splice(filterList.indexOf(filterData), 0, JSON.parse(JSON.stringify(filterData)));
            rootComponent.updateRootState({});
          }}
        >Copy
        </button>
      </div>
      {TargetFilterComponent ? <TargetFilterComponent rootComponent={rootComponent} filterData={filterData} /> : ''}

      <div style={style.divide} />
    </div>;
  }
}

export default RedCanvasFilter;
RedCanvasFilter.FILTER_COMPONENT_MAP = filterComponent;
const style = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  divide: {
    margin: '5px 0px',
    height: '2px',
    background: '#4e4e4e',
    borderTop: '1px solid #000'
  },
  buttonIcon: {
    cursor: 'pointer',
    margin: '1px',
    borderRadius: '6px',
    whiteSpace: 'nowrap',
    padding: '6px 4px',
    border: '1px solid rgb(31, 31, 31)',
    boxShadow: 'rgb(0 0 0 / 25%) 1px 1px 1px',
    background: 'linear-gradient(rgb(84, 84, 84), rgb(64, 63, 63))',
    color: '#fff'
  }
};
