/*
 *
 *  * RedGL - MIT License
 *  * Copyright (c) 2021~ By RedCamel(webseon@gmail.com)
 *  * https://github.com/redcamel/RedGradient
 *
 */
import React from "react";
import GRADIENT_TYPE from "../../const/GRADIENT_TYPE";
import RedRadio from "../../core/RedRadio";

class RedPropertyTypeEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const rootComponent = this.props.rootComponent;
    const rootComponentState = rootComponent.state;
    const activeSubData = rootComponentState.activeSubData;
    const canvasInfo = rootComponentState.canvasInfo;
    return <div>
      <div className={'ui_subTitle'}>Gradient Type</div>
      <div style={{lineHeight: 1.6}}>
        <RedRadio
          value={activeSubData['type']}
          options={Object.entries(GRADIENT_TYPE)}
          HD_change={e => {
            if (e.target.value === GRADIENT_TYPE.CONIC || e.target.value === GRADIENT_TYPE.REPEAT_CONIC) {
              activeSubData.colorList.map(colorData => {
                let tUnit = 'deg';
                if (colorData['rangeUnit'] !== tUnit) {
                  if (colorData['rangeUnit'] === 'px') {
                    if (tUnit === '%') colorData['range'] = colorData['range'] / canvasInfo['width'] * 100;
                    else if (tUnit === 'deg') colorData['range'] = 360 * colorData['range'] / canvasInfo['width'];
                  } else if (colorData['rangeUnit'] === '%') {
                    if (tUnit === 'px') colorData['range'] = canvasInfo['width'] * colorData['range'] / 100;
                    else if (tUnit === 'deg') colorData['range'] = 360 * colorData['range'] / 100;
                  } else if (colorData['rangeUnit'] === 'deg') {
                    if (tUnit === 'px') colorData['range'] = canvasInfo['width'] * colorData['range'] / 360;
                    else if (tUnit === '%') colorData['range'] = colorData['range'] / 360 * 100;
                  }
                }
                colorData['rangeUnit'] = tUnit;
              });
            } else {
              activeSubData.colorList.map(colorData => {
                let tUnit = '%';
                if (colorData['rangeUnit'] === 'deg') colorData['range'] = colorData['range'] / 360 * 100;
                colorData['rangeUnit'] = tUnit;
              });
            }
            activeSubData['type'] = e.target.value;
            rootComponent.updateRootState({});
          }} />
      </div>
    </div>;
  }
}

export default RedPropertyTypeEdit;
